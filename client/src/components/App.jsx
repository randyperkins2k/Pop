import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


import CreatePop from './YourPopups/CreatePop.jsx';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Map from './MapView/mapView.jsx';
import UserProfile from './UserProfileView/UserProfile.jsx';
import SettingsView from './SettingsView/SettingsView.jsx';
import SideBar from './SideBarView/SideBar.jsx';
import ListView from './ListView/ListView.jsx'
import EditPopupProfile from './YourPopups/EditPopUp/EditPopupProfile.jsx';
import MerchantProfile from './MerchantProfileView/MerchantProfile.jsx';
import EditMenu from './YourPopups/EditPopUp/EditMenu.jsx';
import Menu from './MerchantProfileView/Menu.jsx';
import EditInfo from './YourPopups/EditPopUp/EditInfo.jsx';
// import * as butt from './openMerch.json';
// const merchData = butt.merchants;
import ToggleSwitch from '../components/ToggleSwitch.jsx';
import YourPopUps from './YourPopups/YourPopUps.jsx';
import Login from './Login.jsx';
import OpenPopupMap from './YourPopups/EditPopUp/OpenPopMap.jsx';
import {
  HashRouter as Well,
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'
import SearchBar from './searchbar/SearchBar.jsx'

// const MapView = withScriptjs(withGoogleMap(Map));
const ButtonWrapper = styled.div`
text-align: center;

`
const Div = styled.div`
text-align: center;

`

const ListViewButton = styled.button`
display: "flex";
align-items: 'center';
color: black;
font-family: 'Ubuntu';
padding: 6px 16px;
background-color: white;
font-size: 14px;
border-radius: 6px;
border-width: 1px;
border-color: lightgray;
transition: ease 0.01s all;
${props => props.lVPrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 14.25px;
`}


`
const MapViewButton = styled.button`
color: black;
font-family: 'Ubuntu';
padding: 6px 16px;
background-color: white;
font-size: 14px;
border-radius: 6px;
border-width: 1px;
border-color: lightgray;
transition: ease 0.01s all;
${props => props.mLPrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 14.25px;
`}

`
const Welcome = styled.h1`
margin-top: 60px;
margin-left: 11px;
font-family: 'Londrina Solid', cursive;
color: #ffd1dc;
text-align: center;
margin-bottom: 2.6rem;
`

import axios from 'axios';

const App = () => {
  const [myPops, setMyPops] = useState([]);
  const [user, setUser] = useState();
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [selectedMerchant, setSelectedMerchant ] = useState([null]);
  const [ merchData, setMerchData] = useState([{name: '3', info: '2'}]);
  const [ userSubs, setUserSubs] = useState([]);
  const [yourPopups, setYourPopups] = useState([]);
  const [ currentLocMarker, setCurrentLocMarker ] = useState(null);
  const [lVPrimary, setLVPrimary] = useState(false)
  const [mLPrimary, setMLPrimary] = useState(true)
  //grab from database
  const getPops = () => {
    axios.get('/merchants')
      .then(response => {
        //console.log('merchants', response.data)
        setMerchData(response.data)
      })
  }


  //check log in
  const logged = () => {
    axios.get('/testing')
    .then(results => {
      //console.log(results.data);
      if (results.data.displayName) {
        const { displayName, email, picture } = results.data;
        setIsLogged(true);
        //console.log('before post', displayName, email, picture);
        //i removed picture from the endpoint because the http was messing everything up
        axios.post(`/adduser/${displayName}/${email}/`)
        .then(addUser => {
          //console.log('this is add user', addUser);
          let subs;
          let yourPops;
          addUser.data.Subs ? setUserSubs(addUser.data.Subs.map(Sub => Sub.Merchant)) : setUserSubs([]);
          //console.log('subscriptions:', addUser.data.Subs);
          addUser.data.Admins ? setYourPopups(addUser.data.Admins.map(Admin => Admin.Merchant)) : setYourPopups([]);
            setUser({
              name: displayName,
              email: email,
              picture: picture,
              id: addUser.data.id,
            })
            console.log('hello!', addUser.data.id, requestFirebaseNotifPermission())
          })
            
      }
      else {
        setIsLogged(false);
        setUser({});
      }
    });
}

  useEffect(() => logged(), []);
  useEffect(() => getPops(), []);
  // useEffect((requestFirebaseNotifPermission) => requestFirebaseNotifPermission()
  // .then((firebaseToken) => {
  //   // eslint-disable-next-line no-console
  //   console.log('FRIRERERIER', firebaseToken);
  // })
  // .catch((err) => {
  //   console.log('FIREBASE ERROR!', err);
  // }), [])
  // requestFirebaseNotifPermission()
  // .then((firebaseToken) => {
  //   // eslint-disable-next-line no-console
  //   console.log('this is the fb token', firebaseToken);
  // })
  // .catch((err) => {
  //   return err;
  // })

  

  return (

    <Router>
      {isLogged === true
        ? (<Redirect to="/" />)
        : (<Redirect to="/login" />)
      }
      <Switch>
      <Route
        exact path="/"
        render={props => {
          return <Home
            lVPrimary={lVPrimary}
            setLVPrimary={setLVPrimary}
            mLPrimary={mLPrimary}
            setMLPrimary={setMLPrimary}
            myPops={myPops}
            setMyProps={setMyPops}
            user={user}
            setUser={setUser}
            sideBarDisplay={sideBarDisplay}
            setSideBarDisplay={setSideBarDisplay}
            isLogged={isLogged}
            setIsLogged={setIsLogged}
            selectedMerchant={selectedMerchant}
            setSelectedMerchant={setSelectedMerchant}
            merchData={merchData}
            setMerchData={setMerchData}
            userSubs={userSubs}
            setUserSubs={setUserSubs}
            yourPopups={yourPopups}
            setYourPopups={setYourPopups}
            currentLocMarker={currentLocMarker}
            setCurrentLocMarker={setCurrentLocMarker}
           />}}/>
      <Route
        path="/login"
        render={props => <Login />}/>
      </Switch>
    </Router>
  )
};

const Home = ({
  myPops, setMyPops,
  user, setUser,
  sideBarDisplay, setSideBarDisplay,
  isLogged, setIsLogged,
  selectedMerchant, setSelectedMerchant,
  merchData, setMerchData,
  userSubs, setUserSubs, yourPopups, setYourPopups,
  currentLocMarker, setCurrentLocMarker,
  lVPrimary, setLVPrimary,
  mLPrimary, setMLPrimary

}) => {
  const { t, i18n } = useTranslation();


    return(
    <Well>
    <Div>
      {/* <LogOutBtn href="/logout"> Logout </LogOutBtn> */}

        <div className='sidebar-view'>
            <Welcome onClick={() => {
               setSideBarDisplay(!sideBarDisplay)
              //console.log(requestFirebaseNotifPermission)
            }
            }>Pop^</Welcome>
            {/* <ToggleSwitch /> */}
            {
              !sideBarDisplay ?
              ''
              :
              <Route
                path='/'
                render={(props) => {
                  return <SideBar
                  close={setSideBarDisplay}/>
                }}
              />
            }
          </div>
          <div
            onClick={() => setSideBarDisplay(false)}
            className='main'
            >
              <ButtonWrapper>
            <Link to='/'>
              <MapViewButton  
              mLPrimary={mLPrimary} 
              onClick={() => {
                    setMLPrimary(!mLPrimary)
                    setLVPrimary(false)
                  }}
                    >{t('mapViewBtn')}</MapViewButton>
            </Link>
            <Link to='/listview'>
              <ListViewButton 
              lVPrimary={lVPrimary}
              onClick={() => {
                    setLVPrimary(!lVPrimary)
                    setMLPrimary(false)
                  }}>
                    {t('listViewBtn')}</ListViewButton>
                    <SearchBar 
                    merchData={merchData}
                    />
            </Link>
                    </ButtonWrapper>
              <Switch>
                <Route
                path='/'
                exact
                render={(props) => {
                  return <Map
                    loadingElement={<div style={{height: '100%' }}/>}
                    containerElement={<div style={{height: '100%' }}/>}
                    mapElement={<div style={{height: '100%' }}/>}
                    merchData={merchData}
                    selectMerchant={setSelectedMerchant}
                    currentLocMarker={currentLocMarker}
                    setCurrentLocMarker={setCurrentLocMarker}
                    setMLPrimary={setMLPrimary}
                    />
                }}/>
                <Route
                  path='/listview'
                  render={(props) => {
                    return <ListView
                      merchData={merchData}
                      selectMerchant={setSelectedMerchant}
                      userSubs={userSubs}
                      setUserSubs={setUserSubs}
                    />
                  }}
                />
                <Route
                  path='/yourprofile'
                  render={(props) => {
                    return <UserProfile user={user}/>
                  }}
                />
                <Route
                  path='/yourpopups'
                  render={(props) => {
                    return <YourPopUps
                      merchData={merchData}
                      setMerchData={setMerchData}
                      merchant={selectedMerchant}
                      selectMerch={setSelectedMerchant}
                      yourPopups={yourPopups}
                      setYourPopups={setYourPopups}
                      userSubs={userSubs}
                      setUserSubs={setUserSubs}
                      />
                  }}
                />
                <Route
                  path='/settings'
                  render={(props) => {
                    return <SettingsView/>
                  }}
                />
                <Route
                  path='/edit'
                  render={(props) => <EditPopupProfile
                    merchant={selectedMerchant}
                    selectMerchant={setSelectedMerchant}
                    merchData={merchData}
                    setMerchData={setMerchData}
                  />}
                />
                <Route
                  path="/profile"
                  render={(props => {
                    return (
                      <div>
                        <ToggleSwitch
                          style={{marginLeft: '75px'}}
                          merchant={selectedMerchant}
                          user={user}
                          userSubs={userSubs}
                          setUserSubs={setUserSubs}
                        />
                        <MerchantProfile
                          merchant={selectedMerchant}
                          user={user}
                          userSubs={userSubs}
                          setUserSubs={setUserSubs}
                          merchData={merchData}
                          setMerchData={setMerchData}
                        />
                      </div>
                    )
                  }
                  )}
                />
                <Route
                  path='/create'
                  render={(props) => {
                    return <CreatePop
                      user={user}
                      setUser={setUser}
                      yourPopups={yourPopups}
                      setYourPopups={setYourPopups}
                      currentLocMarker={currentLocMarker}
                      setCurrentLocMarker={setCurrentLocMarker}
                      merchData={merchData}
                      setMerchData={setMerchData}
                    />
                  }}
                />
                <Route
                  path='/openpopmap'
                  render={() => {
                    return <OpenPopupMap
                      merchant={selectedMerchant}
                      selectMerchant={setSelectedMerchant}
                      merchData={merchData}
                      setMerchData={setMerchData}
                      setSubs={setUserSubs}
                      setYourPopups={setYourPopups}
                      user={user}
                    />
                  }}
                />
                <Route
                  path="/editmenu"
                  render={() => {
                    return <EditMenu
                      merchant={selectedMerchant}
                      selectMerchant={setSelectedMerchant}
                    />
                  }}
                />
                 <Route
                  path="/menu"
                  render={() => {
                    return <Menu
                      merchant={selectedMerchant}
                      selectMerchant={setSelectedMerchant}
                    />
                  }}/>
                  <Route
                  path="/editinfo"
                  render={() => {
                    return <EditInfo
                      merchant={selectedMerchant}
                      selectMerchant={setSelectedMerchant}
                      yourPopups={yourPopups}
                      setYourPopups={setYourPopups}
                      userSubs={userSubs}
                      setUserSubs={setUserSubs}
                      merchData={merchData}
                      setMerchData={setMerchData}
                    />
                  }}
                />
              </Switch>
            </div>
      </Div>
      </Well>
  )
}

export default App;