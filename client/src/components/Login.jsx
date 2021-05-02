import React, { useState } from 'react';
import styled from 'styled-components';
import popUpLogo from '../popup/popUpLogo.jpg';

const LoginButton = styled.button`
  background: lightgray;
  border-radius: 20px;
  border-width: 6px;
  border-color: #ffd1dc;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  display: block;
`
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const H1 = styled.h1`
  font-family: 'Londrina Solid', cursive;
  text-align: center;
  color: #ffd1dc;
`;

const Login = ({}) => {
  return (
    <div 
    style={{
      backgroundColor: 'darkgrey',
    }}
    >
    <Wrap>
        <img src={popUpLogo} ></img>
        <H1>A handy app for finding pop-ups in your area, or any area!</H1>
        <LoginButton ><a href="/google"> Login </a></LoginButton>
    </Wrap>
  </div>
  )
};

export default Login;

