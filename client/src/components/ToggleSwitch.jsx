import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';


const InputWrapper = styled.label`
	position: relative;

`

const Input = styled.input`
	position: absolute;
	left: -9999px;
	top: -9999px;

	&:checked + span {
		background-color: #009900;

		&:before {
			left: calc(100% - 2px);
			transform: translateX(-100%);
		}
	}

	$: focus + span {
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0, 0.1);
	}

	&:focus:checked + span {
		box-shadow: 0 0 0 2px whitesmoke;
	}
`;

const Slider = styled.span`
	display: flex;
	cursor: pointer;
	width: 50px;
	height: 25px;
	border-radius: 100px;
	background-color: #ff6961;
	position: relative;
	transition: background-color 0.2s, box-shadow 0.2s;

	&:before {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 21px;
		height: 21px;
		border-radius: 45px;
		transition: 0.2s;
		background: #fff;
		box-shadow: 0 2px 4px 0 rgba(0, 35, 11, 0.2);
	}

	&:active:before {
		width: 28px;
	}
`
// if toggled change follow to true


const ToggleSwitch = ({ merchant, user, setUserSubs, userSubs }) => {
	const [toggled, setToggled] = useState(false);
	const [subs, setSubs] = useState([]);
	//console.log('subs', subs)


	const getSubs = async () => {
		try {
			const res = await axios.get('/api/subs')
			const { data } = res;
			console.log('subs data in call', data)
			setSubs(data)
		} catch (e) {
			console.log('error in catch', e)
		}
	}

	const subscribe = () => {
		let isSubscribed = false;
		userSubs.forEach(sub => {
			if (sub.id === merchant.id) {
				isSubscribed = true;
				//setUserSubs(userSubs.filter(sub => sub.id !== merchant.id));
				axios.delete(`/api/deletesub/${user.id}/${merchant.id}`)
				  .then((response) => {
						setUserSubs(userSubs.filter(sub => sub.id !== merchant.id));
						console.log(response);
					})
			}
		})
		if (!isSubscribed) {
			// try {
			// 	const sub = await axios.post('/api/addsub', {
			// 		userid : user.id,
			// 		merchantid : merchant.id
			// 	})
			// 	console.log(sub.data.Subs);
			// 	setUserSubs(sub.data.Subs.map(Sub => Sub.Merchant));
			// } catch (e) {
			// 	console.log(e);
			// }
			axios.post('/api/addsub', {
				userid : user.id,
				merchantid : merchant.id
			})
			.then(response => {
				console.log(response);
			});
		}
	};
	//
	// logic for if the button is toggled on or off
	const createSub = async () => {
		const res = axios.post('/subs', {
			toggled: true
		})
	}
	const initiate = () => {
		console.log('hello initiate');
		console.log(userSubs);
		console.log(merchant);
		userSubs.forEach(sub => {
			if (sub.id === merchant.id) {
				setToggled(true);
			}
		})
	};
	useEffect(() => initiate(), []);


	return (
		<InputWrapper>
			<Input
			type="checkbox"
			onClick={() => subscribe()}
			checked={toggled}
			onChange={(event) => setToggled(!toggled)}
			/>
			<Slider />
			<p style={{fontFamily: 'Ubuntu', fontSize: '11px', marginTop: '3px'}}>{toggled ? 'unfollow' : 'follow'}</p>
		</InputWrapper>

	)
}


export default ToggleSwitch