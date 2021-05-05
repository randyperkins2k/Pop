import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const EditProfile = ({ close }) => {
  const {t} = useTranslation()
  return (
    <div>
      <h3>{t("editYourProfileBtn")}</h3>
      <a onClick={() => close(false)}>X</a>
      <input placeholder={t('phoneNumberInput')}></input>
      <input placeholder={t('emailInput')}></input>
      <input placeholder={t('favoriteColorInput')}></input>
    </div>
  )
};

export default EditProfile;