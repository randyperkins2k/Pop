import React , { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next'

const Create = styled.button`
  margin-left: -1px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`

const Confirmation = ({ text, yesContext, noContext }) => {
const {t} = useTranslation()
  return (
    <div>
      <h2>{text}</h2>
      <Create
        onClick={() => {
          yesContext();
        }}
      >{t('yesTxt')}</Create>
      <Create
        onClick={() => {
          noContext();
        }}
      >No</Create>
    </div>
  )
}

export default Confirmation;