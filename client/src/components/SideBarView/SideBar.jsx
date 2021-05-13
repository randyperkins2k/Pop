import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
const Button = styled.button`
  background: lightgrey;
  border-radius: 10px;
  border-width: 4px;
  border-color: #ffd1dc;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  width: 9em;
  display: block;
`;

const SidebarDiv = styled.nav`
  overflow: auto;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #004d80;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
`;

const SidebarUl = styled.ul`
  display: block;
  color: white;
  padding: 16px;
  text-decoration: none;
`;

const SideBar = ({ open, close, setMLPrimary, setLVPrimary }) => {
  const {t} = useTranslation();
  return (
    <SidebarDiv open={open}>
      <SidebarUl>
        <br/>
          <Link to='/'>
            <Button><a onClick={() => {
              close(false)
              setLVPrimary(false)
              setMLPrimary(false)
              }}>{t("popUpsBtn")}</a></Button> 
          </Link>
        <br/>
          <Link to='/yourprofile'>
            <Button><a onClick={() => {
              close(false)
              setLVPrimary(false)
              setMLPrimary(false)
              }}>{t('yourProfileBtn')}</a></Button>
          </Link>
        <br/>
          <Link to='/yourpopups'>
            <Button><a onClick={() => {
              close(false)
              setLVPrimary(false)
              setMLPrimary(false)
            }}>{t('yourPopUpsBtn')}</a></Button>
          </Link>
        <br/>
          <Link to='/settings'>
            <Button><a onClick={() => {
              close(false)
              setLVPrimary(false)
              setMLPrimary(false)
            }}>{t('settingsBtn')}</a></Button>
          </Link>
        <br/>
          <Button><a href="/logout" onClick={() => {
            close(false)
            setLVPrimary(false)
            setMLPrimary(false)
            }}>{t('logoutBtn')}</a></Button>
      </SidebarUl>
    </SidebarDiv>
  )
}

export default SideBar;