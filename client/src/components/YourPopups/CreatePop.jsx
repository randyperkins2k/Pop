import React, { useState } from 'react';
import styled from 'styled-components';
import Confirmation from '../../components/Confirmation.jsx';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Create = styled.button`
  margin-left: -1px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
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
        lat: currentLocMarker.lat,
        lon: currentLocMarker.lng
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
      <div>
        <h3>Business Name</h3>
        { nameTakenBool ? <h5 className='issue'>{`${businessName} is already taken!`}</h5> : ''}
        <input onChange={(e) => {
          setNameTakenBool(false);
          console.log(e.target.value);
          setBusinessName(e.target.value);
          }}></input>
        <h3>Category</h3>
        {
        pickCategoryBool ?
        <h5 className='issue'>{`You must pick a category!`}</h5>
        : ''}
        <select onChange={(e) => {
          setPickCategoryBool(false);
          setCategory(e.target.value);
          }}>
          <option value="" selected disabled hidden>Category</option>
          <option value={'foodpopup'}>Food Pop</option>
          <option value={'foodtruck'}>Food Truck</option>
          <option value={'performer'}>Performer</option>
          <option value={'arts'}>Arts/Craft</option>
          <option value={'produce'}>Market</option>
        </select>
        <h3>Info</h3>
        <form onSubmit={(e) => {
          e.preventDefault();

        }}>
          <input type="text" maxlength="255"></input>
        </form>
        <h3>Website</h3>
        <input onChange={(e) => setWebsite(e.target.value)}></input>
        <h3></h3>
        <h3></h3>
        {
          createConfirm ?
          <Confirmation
            text={`Create ${businessName}?`}
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
          >Create</Create>
          <Create
            onClick={() => {
              setCancelConfirm(true);
              setAddCreateButtons(false);
            }}
          >Cancel</Create>
          </div>
          :
          ''
        }

      </div>
  )
}

export default CreatePop;