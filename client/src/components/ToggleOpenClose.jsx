import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from 'axios';
import { useTranslation } from 'react-i18next'

const InputWrapper = styled.label`
	position: relative;

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

	&:focus + span {
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0, 0.1);
	}

	&:focus:checked + span {
		box-shadow: 0 0 0 2px whitesmoke;
	}
`;

const Slider = styled.span`
	display: flex;
	cursor: pointer;
	margin-left: 156px;
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

const ToggleOpenClose = ({ merchant, setOpenOrClosed,
		openOrClosed, merchData,
		setMerchData, selectMerchant,
		center, user,
		setSubs, setYourPopups
	}) => {
	const [toggled, setToggled] = useState(false);
	const { t } = useTranslation()

	const initiate = () => {
		merchant.isOpen ? setToggled(true) : setToggled(false);
	};

	const closeBusiness = () => {
		console.log('merchant: ');
		console.log(merchant);
    axios.put(`/api/merchants/closemerchant/${merchant.id}`)
      .then(() => {
        axios.get('/api/merchants')
				.then(response => {
					response.data.forEach(merch => merch.id === merchant.id ? selectMerchant(merch) : null)
					setMerchData(response.data)
				})
				.then(() => {
					axios.get(`/api/users/id/${user.id}`)
						.then((response => {
							setSubs(response.data.Subs.map(Sub => Sub.Merchant));
							setYourPopups(response.data.Admins.map(Sub => Sub.Merchant));
						}))
				})
      })
      .catch(err => console.log('closing merchant error', err));
  }

  const openBusiness = () => {
		console.log('merchant: ');
		console.log(merchant);
		axios.put(`/api/merchants/merchcoords/${merchant.id}`, {lat: center.lat, lng: center.lng})
			.then(() => {
				axios.put(`/api/merchants/openmerchant/${merchant.id}`)
					.then(() => {
						setOpenOrClosed( 'is open')
						axios.get('/api/merchants')
							.then(response => {
								response.data.forEach(merch => merch.id === merchant.id ? selectMerchant(merch) : null)
		       			setMerchData(response.data)
							})
							.then(() => {
								axios.get(`/api/users/id/${user.id}`)
									.then((response => {
										setSubs(response.data.Subs.map(Sub => Sub.Merchant));
										setYourPopups(response.data.Admins.map(Sub => Sub.Merchant));
									}))
							})
					})
			})
			.catch(err => {
				console.log('opening merchant error', err);
				alert('please choose valid location');
			});
  }

	useEffect(() => initiate(), []);

	return (
		<InputWrapper>
			<Input
			type="checkbox"
			checked={toggled}
			onChange={(event) => {
				if(toggled) {
					closeBusiness();
					setToggled(!toggled)
				} else {
					openBusiness()
					setToggled(!toggled)
				}
			}}
			/>
			<Slider />
			<p style={{fontFamily: 'Ubuntu', fontSize: '11px', marginTop: '3px'}}>{toggled ? `${t("openTxt")}` : `${t("closedTxt")}`}</p>
		</InputWrapper>

	)
}

export default ToggleOpenClose