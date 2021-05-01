import React, { useState } from 'react'
import styled, { css } from 'styled-components'


const LearnReact = styled.a`
	color:white;
	font-size: 36px;
	color:${props => props.color ? props.color: 
	'white'};
	${props => props.primary && css`
	font-size: 48px;
	color: pink;

	`}

`

const Body = styled.div`
text-align: center;

`

const Stylingsomething = () => {
const [color, setColor] = useState('blue')
	return(

	<Body>
		<LearnReact primary src='https://dev.to/danicodes01/array-methods-5cnb'>LearnReact</LearnReact>
	</Body>
	)
}
export default Stylingsomething