import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios';
import { useTranslation } from 'react-i18next'

const InputWrapper = styled.label`
	position: relative;
	margin-left: 10px;
	margin-top: 30px;

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
	margin-top: 21px;
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
	const { t } = useTranslation()
	//console.log('subs', subs)




	const subscribe = () => {
		let isSubscribed = false;
		userSubs.forEach(sub => {
			if (sub.id === merchant.id) {
				isSubscribed = true;
				//setUserSubs(userSubs.filter(sub => sub.id !== merchant.id));
				axios.delete(`/api/subs/deletesub/${user.id}/${merchant.id}`)
				  .then((response) => {
						console.log(response.data)
						setUserSubs(userSubs.filter(sub => sub.id !== merchant.id));
						console.log(response);
					})
			}
		})
		if (!isSubscribed) {
			axios.post('/api/subs/addsub', {
				userid : user.id,
				merchantid : merchant.id
			})
			.then(sub => {
				//console.log(response.data)
				console.log(sub);
				setUserSubs(sub.data.Subs.map(Sub => Sub.Merchant));
			});
		}
	};
	//


	const initiate = () => {
		// console.log('hello initiate');
		// console.log(userSubs);
		// console.log(merchant);
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
			<p style={{fontFamily: 'Ubuntu', fontSize: '11px', marginTop: '3px'}}>{toggled ? `${t("unfollowBtn")}` : `${t("followBtn")}`}</p>
		</InputWrapper>

	)
}


export default ToggleSwitch