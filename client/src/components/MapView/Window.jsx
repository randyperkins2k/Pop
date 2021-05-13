import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'


const Window = ({ merchant, selectMerchant, setMLPrimary }) => {
  const { t } = useTranslation()
console.log('hey whats up', setMLPrimary)
  return (
    <div>
      <span></span>
      <h2>{merchant.name}</h2>
      <h2>{merchant.website}</h2>
      <Link to='/profile'>
        <button onClick={() => {
          selectMerchant(merchant)
          setMLPrimary(false)
        }}>{t("profileBtn")}</button>
      </Link>
    </div>
  )
}

export default Window;