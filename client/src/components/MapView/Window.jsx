import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const H2 = styled.h2`
  color: #f5abc9;

`
const Div = styled.div`
background-color: lightgrey;
`
const Window = ({ merchant, selectMerchant }) => {
  const { t } = useTranslation()

  return (
    <div>
      <span></span>
      <H2>{merchant.name}</H2>
      <Link to='/profile'>
        <button onClick={() => {
          selectMerchant(merchant)
        }}>{t("profileBtn")}</button>
      </Link>
    </div>
  )
}

export default Window;