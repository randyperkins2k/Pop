import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled, { css, ThemeProvider, createGlobalStyle} from 'styled-components'
import App from  '../App.jsx'
import axios from 'axios';





const EnglishBtn = styled.button`
  background-color: white;
  border-width: 1px;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 14px;
  ${props => props.englishPrimary && css`
  opacity: .5;
  color: black;
  background-color: #ffd1dc;
  font-size: 14.25px;
`}
`
const SpanishBtn = styled.button`
  background-color: white;
  border-width: 1px;
  border-radius: 6px;
  padding: 6px 16px;
  font-size: 14px;
  ${props => props.spanishPrimary && css`
  opacity: .5;
  color: black;
  background-color: #ffd1dc;
  font-size: 14.25px;
`}
`

const Settings = ({ user, setUser }) => {
  const [englishPrimary, setEnglishPrimary] = useState(false)
  const [spanishPrimary, setSpanishPrimary] = useState(false)
  const { t, i18n } = useTranslation();

  function getLang(lang) {
    i18n.changeLanguage(lang);
  }
  return (


    <div>
      <br/>
      <h5>Settings</h5>
      <hr/>
      <br/>
      <br/>
      <br/>

      <EnglishBtn
      englishPrimary={englishPrimary}
      onClick={()=>{
        getLang('en')
        setEnglishPrimary(!englishPrimary)
        setSpanishPrimary(false)
        console.log(user);
        axios.put('/api/users/english', {
          id: user.id
        })
      }}>
        {t('englishBtn')}
        </EnglishBtn>
      <SpanishBtn
      spanishPrimary={spanishPrimary}
      onClick={()=>{
        setSpanishPrimary(!spanishPrimary)
        setEnglishPrimary(false)
        getLang('sp')
        console.log(user);
        axios.put('/api/users/spanish', {
          id: user.id
        })
      }}>
          {t('spanishBtn')}
          </SpanishBtn>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
    </div>

  )
};

export default Settings;