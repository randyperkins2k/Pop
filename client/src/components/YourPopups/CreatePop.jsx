import React, { useState } from 'react';
import styled from 'styled-components';
import Confirmation from '../../components/Confirmation.jsx';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next'

const Create = styled.button`
  margin-left: -1px;
  color: black;
  font-family: 'Ubuntu';
  padding: 5px 16px;
  background-color: white;
  font-size: 11px;
  border-radius: 6px;
  border-width: 1px;
  border-color: lightgray;
  transition: ease 0.01s all;
`

const CreatePopUpWrap = styled.div`
margin-top: 30px;
text-align: center;
font-family: 'Ubuntu';
h6 {
  margin-top: 30px;
}

`

const CreatePop = ({ user, setUser, yourPopups, setYourPopups, currentLocMarker, setCurrentLocMarker, merchData, setMerchData }) => {
  const [ businessName, setBusinessName ] = useState('');
  const [ category, setCategory ] = useState();
  const [ info, setInfo ] = useState('');
  const [ website, setWebsite ] = useState('');
  const [ createConfirm, setCreateConfirm ] = useState(false);
  const [ cancelConfirm, setCancelConfirm ] = useState(false);
  const [ addCreateButtons, setAddCreateButtons ] = useState(true);
  const [ nameTakenBool, setNameTakenBool ] = useState(false);
  const [ pickCategoryBool, setPickCategoryBool ] = useState(false);
  const back = useHistory();
  const {t} = useTranslation();
  console.log(currentLocMarker);

  const finalizeCreation =  async () => {
    try {
      const merchNames = await axios.get('/merchants');
      !merchNames.data.filter(merch => businessName.toLowerCase() === merch.name.toLowerCase()).length ?
      console.log('there is no merchant with this name') :
      setNameTakenBool(true);

      !category ? setPickCategoryBool(true) : setPickCategoryBool(false);

      if (!nameTakenBool && !pickCategoryBool) {
      //app.post('/api/merchant/add', (req, res) => {
        //const { name, category, info, website, adminId } = req.body;
      const newPop = await axios.post('/api/merchant/add', {
        name: businessName,
        category: category,
        info: info,
        website: website,
        adminId: user.id,
        isOpen : false
      })
      setYourPopups([newPop.data, ...yourPopups]);
      setMerchData([newPop.data, ...merchData]);
      console.log('POP CREATED!')
      back.push('/yourpopups')
      } else {
        console.log('choose category');
      }

    } catch (e) {
      console.log(e);
    }
  }

    return (

      <CreatePopUpWrap>
        <h6>{t("businessNameTxt")}</h6>
        { nameTakenBool ? <h5 className='issue'>{`${businessName} is already taken!`}</h5> : ''}
        <input onChange={(e) => {
          setNameTakenBool(false);
          console.log(e.target.value);
          setBusinessName(e.target.value);
          }}></input>
        <h6>{t("categoryTxt")}</h6>
        {
        pickCategoryBool ?
        <h5 className='issue'>{`You must pick a category!`}</h5>
        : ''}
        <select onChange={(e) => {
          setPickCategoryBool(false);
          setCategory(e.target.value);
          }}>
          <option value="" selected disabled hidden>{t("categoryTxt")}</option>
          <option value={'foodpopup'}>Food Pop</option>
          <option value={'foodtruck'}>Food Truck</option>
          <option value={'performer'}>Performer</option>
          <option value={'arts'}>Arts/Craft</option>
          <option value={'produce'}>Market</option>
        </select>
        <h6>{t("infoTxt")}</h6>
        <form onSubmit={(e) => {
          e.preventDefault();

        }}>
          <input type="text" maxlength="255"></input>
        </form>
        <h6>{t("websiteTxt")}</h6>
        <input onChange={(e) => setWebsite(e.target.value)}></input>
        <h6></h6>
        <h6></h6>
        {
          createConfirm ?
          <Confirmation
            text={`${t("createBtn")} ${businessName}?`}
            yesContext={() => finalizeCreation()}
            noContext={() =>{
              setAddCreateButtons(true)
              setCreateConfirm(false)
            }}
          /> :
          ''
        }
        {
          cancelConfirm ?
          <Confirmation
            text={'Cancel?'}
            yesContext={() => {
              back.push('/yourpopups')
            }}
            noContext={() =>{
              setAddCreateButtons(true)
              setCancelConfirm(false)
            }}
          /> :
          ''
        }
        {
          addCreateButtons ?
        <div>
          <Create
            onClick={() => {
              setCreateConfirm(true);
              setAddCreateButtons(false);
            }}
          >{t("createBtn")}</Create>
          <Create
            onClick={() => {
              setCancelConfirm(true);
              setAddCreateButtons(false);
            }}
          >{t("cancelBtn")}</Create>
          </div>
          :
          ''
        }

      </CreatePopUpWrap>
  )
}

export default CreatePop;