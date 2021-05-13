import React, { useState } from 'react';
import styled from 'styled-components';
import popghostletters from '../popup/popghostletters.png';
import popUpLogo from '../popup/popUpLogo.jpg';

// const LoginButton = styled.button`
//   background: #4d4d4d;
//   border-radius: 20px;
//   border-width: 6px;
//   border-color: tomato;
//   margin: 0.5em 1em;
//   padding: 0.25em 1em;
//   display: block;
// `
// const Wrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-items: center;
//   align-items: center;
// `;

// const H1 = styled.h1`
//   font-family: 'Londrina Solid', cursive;
//   text-align: center;
//   color: white;
// `;

const Login = ({}) => {
  return (
    <div 
      style={{
      backgroundColor: '#ffd1dc',
      height: '100vh'
      }}
    >
   
          <img src={popUpLogo} ></img>
          <div>A handy app for finding pop-ups in your area, or any area!</div>
          <button ><a color="white" href="/google"> Login </a></button>
     
    </div>
  )
};

export default Login;

