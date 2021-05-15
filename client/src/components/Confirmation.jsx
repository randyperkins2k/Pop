import React , { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next'


const Confirmation = ({ text, yesContext, noContext }) => {
const {t} = useTranslation()
  return (
    <div>
      <h2>{text}</h2>
      <button
        onClick={() => {
          yesContext();
        }}
      >{t('yesTxt')}</button>
      <button
        onClick={() => {
          noContext();
        }}
      >No</button>
    </div>
  )
}

export default Confirmation;