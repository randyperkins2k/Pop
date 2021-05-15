import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Button = styled.button`
  background: white;
  border-radius: 10px;
  border-width: 1px;
  border-color: lightgray;
  margin: 0.5em 1em;
  font-family: 'Ubuntu';
  padding: 6px 16px;
  width: 9em;
  display: block;
`;

const SidebarDiv = styled.nav`
  opacity: .9;
  overflow: auto;
  z-index: 99;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: white;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 199px;
  left: -126px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  width: 28%;
  box-shadow:4px 0px 10px;
`;

const SidebarUl = styled.ul`
  display: block;
  color: white;
  padding: 16px;
  text-decoration: none;
  
`;

const SideBar = ({ open, setSideBarDisplay, setOpen }) => {
  const {t} = useTranslation();
  return (
    <SidebarDiv open={open}>
      <SidebarUl>
       
     
        <br/>
          <Link to='/yourprofile'>
            <Button><a onClick={() => {
              setSideBarDisplay(false)
              setOpen(false)

              }}>{t('yourProfileBtn')}</a></Button>
          </Link>
        <br/>
          <Link to='/yourpopups'>
            <Button><a onClick={() => {
              setSideBarDisplay(false)
              setOpen(false);
            }}>{t('yourPopUpsBtn')}</a></Button>
          </Link>
        <br/>
          <Link to='/settings'>
            <Button><a onClick={() => {
              setSideBarDisplay(false)
              setOpen(false);
            }}>{t('settingsBtn')}</a></Button>
          </Link>
        <br/>
          <Button><a href="/logout" onClick={() => {
            setSideBarDisplay(false)
            setOpen(false);
            }}>{t('logoutBtn')}</a></Button>
      </SidebarUl>
    </SidebarDiv>
  )
}

export default SideBar;