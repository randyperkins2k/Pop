import React, { useState } from 'react'
import styled, { css } from 'styled-components'


const Body = styled.div`
text-align: center;

`
const Heythere = styled.button`
	color: #ffd1dc;
	font-family: 'Ubuntu';
	padding: 6px 30px;
	background-color: white;
	font-size: 36px;
	border-radius: 6px;
	transition: ease 0.30s all;
	${props => props.primary && css`
	font-size: 38px;
	opacity: .50;
	`}
	:hover {
		font-size: 38px;
		opacity: 0.5;
	}
`
const Heyagain = styled(Heythere)`
font size: 18px;
color: white;
`


const Stylingsomething = () => {
// const [color, setColor] = useState('blue')
const [primary, setPrimary] = useState(false)
	return(

	<Body>
		<div>
		{/* <Heyagain>clickme</Heyagain> */}
		<Heythere primary={primary} onClick={() => {
			setPrimary(!primary)
		}}
		>
			🧟‍♂️❤️</Heythere>

		</div>
	</Body>
	)
}
export default Stylingsomething