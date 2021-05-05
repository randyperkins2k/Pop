import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Button = styled.button`
color: black;
font-family: 'Ubuntu';
padding: 5px 16px;
background-color: white;
font-size: 11px;
border-radius: 6px;
border-width: 1px;
border-color: lightgray;
`

const Window = ({ merchant, selectMerchant, setMLPrimary }) => {
  const { t } = useTranslation()
console.log('hey whats up', setMLPrimary)
  return (
    <div>
      <span></span>
      <h2>{merchant.name}</h2>
      <h2>{merchant.website}</h2>
      <Link to='/profile'>
        <Button onClick={() => {
          selectMerchant(merchant)
          setMLPrimary(false)
        }}>{t("profileBtn")}</Button>
      </Link>
    </div>
  )
}

export default Window;