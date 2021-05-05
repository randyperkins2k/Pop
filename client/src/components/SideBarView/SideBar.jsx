import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next'


const styles = {
  main:{'margin': 0,
    'padding': 0,
    'width': '210px',
    'backgroundColor': '#f1f1f1',
    'position': 'absolute',
    'height': '100vh',
    'overflow': 'auto',
    'zIndex': 99
  },
  links:{
    'display': 'block',
    'color': 'white',
    'padding': '16px',
    'textDecoration': 'none'
  }
}
const Button = styled.button`
  background: lightgrey;
  border-radius: 10px;
  border-width: 4px;
  border-color: #ffd1dc;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  width: 9em;
  display: block;
`

const SideBar = ({ close, setMLPrimary, setLVPrimary }) => {
const {t} = useTranslation();
  return (
    <div style={styles.main} className='sidebar'>
      <ul styles={styles.links}>
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
      </ul>
    </div>
  )
}

export default SideBar;