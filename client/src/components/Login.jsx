import React, { useState } from 'react';
import styled from 'styled-components';
import popghostletters from '../popup/popghostletters.png';
import popUpLogo from '../popup/popUpLogo.jpg';
import { useTranslation } from 'react-i18next'


const Login = ({}) => {
  const { t } = useTranslation()
  return (
    <div
      style={{
      backgroundColor: '#f5abc9',
      height: '100vh'
      }}
    >

          <img src={popUpLogo} ></img>
          <div>A handy app for finding pop-ups in your area, or any area!</div>
          <button ><a color="white" href="/google"> {t("loginBtn")} </a></button>

    </div>
  )
};

export default Login;

