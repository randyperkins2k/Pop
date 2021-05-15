import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'


const Window = ({ merchant, selectMerchant }) => {
  const { t } = useTranslation()

  return (
    <div>
      <span></span>
      <h2>{merchant.name}</h2>
      <Link to='/profile'>
        <button onClick={() => {
          selectMerchant(merchant)
        }}>{t("profileBtn")}</button>
      </Link>
    </div>
  )
}

export default Window;