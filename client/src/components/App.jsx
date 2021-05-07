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
import { useTranslation } from 'react-i18next'

// Styling Components
import styled, { css, ThemeProvider } from 'styled-components'
import darkTheme from '../components/Themes/darkMode.js';


// const MapView = withScriptjs(withGoogleMap(Map));
const ButtonWrapper = styled.div`
  text-align: center;
`;

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
  ${props => props.darklV && css`
    opacity: .5;
    color: white;
    background-color: darkgrey;
    font-size: 14px;
  `}
  ${props => props.darklVPrimary && css`
    opacity: .5;
    color: white;
    background-color: #ffd1dc;
    font-size: 14.25px;
  `}
`;

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
  ${props => props.darkmL && css`
      opacity: .5;
      color: white;
      background-color: darkgrey;
      font-size: 14px;
    `}
  ${props => props.darkmLPrimary && css`
    opacity: .5;
    color: white;
    background-color: green;
    font-size: 14.25px;
  `}
`;

const Welcome = styled.h1`
  margin-top: 60px;
  font-family: 'Londrina Solid', cursive;
  color: #ffd1dc;
  text-align: center;
  margin-bottom: 2.6rem;
  ${props => props.dh1 && css`
      opacity: .5;
      color: white;
      background-color: darkgrey;
      font-size: 14.25px;
    `}
`;

const Moon = styled.svg`
  height: auto;
  width: 2.5rem;
  transition: all 0.7s linear;
`;

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
  const [lVPrimary, setLVPrimary] = useState(false);
  const [darklVPrimary, setDarkLVPrimary] = useState(false);
  const [mLPrimary, setMLPrimary] = useState(true);
  const [darkmLPrimary, setDarkmLPrimary] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(stored === 'true' ? true : false);

  // Storage for dark mode setting.
  const stored = localStorage.getItem('isDarkMode');

  // Fetches merchant data from database.
  const getPops = () => {
    axios.get('/merchants')
      .then(response => {
        console.log('merchants', response.data)
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
          console.log('this is add user', addUser);
          let subs;
          let yourPops;
          addUser.data.Subs ? setUserSubs(addUser.data.Subs.map(Sub => Sub.Merchant)) : setUserSubs([]);
          console.log('subscriptions:', addUser.data.Subs);
          addUser.data.Admins ? setYourPopups(addUser.data.Admins.map(Admin => Admin.Merchant)) : setYourPopups([]);
            setUser({
              name: displayName,
              email: email,
              picture: picture,
              id: addUser.data.id,
            });
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
            darklVPrimary={darklVPrimary}
            setDarkLVPrimary={setDarkLVPrimary}
            mLPrimary={mLPrimary}
            setMLPrimary={setMLPrimary}
            darkmLPrimary={darkmLPrimary}
            setDarkmLPrimary={setDarkmLPrimary}

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
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
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
  darklVPrimary, setDarkLVPrimary,
  mLPrimary, setMLPrimary,
  darkmLPrimary, setDarkmLPrimary,
  isDarkMode, setIsDarkMode
}) => {
  const { t, i18n } = useTranslation();
  const [darklV, setDarklV] = useState(false);
  const [darkmL, setDarkmL] = useState(false);
    return (
      <Well>
        <div>
          {/* <LogOutBtn href="/logout"> Logout </LogOutBtn> */}
            <div className='sidebar-view'>
              {/* <ThemeProvider theme={darkTheme}> */}
              <button
                mLPrimary={mLPrimary}
                darkmLPrimary={darkmLPrimary}
                onClick={() => {
                  // If 'mapView' is selected (pink), change to 'darkmLPrimary' (pink w/ white letters),
                  // and 'listView' to 'darklV'(darkgrey with white letters). Turn other modes to false.
                  // If 'listView' is selected (pink), change to 'darkLVPrimary' (pink w/ white letters),
                  // and 'mapView' to 'darkmV' (dark grey with white letters). Turn other modes to false.
                  if (mLPrimary) {
                    alert('hi')
                    setDarkmLPrimary(!darkmLPrimary);
                    setMLPrimary(false);
                    setLVPrimary(true);
                  }
                  // mlPrimary ? setDarkmL(!darkmL); setMLPrimary(false); setDarkmLPrimary(false); setDarkLVPrimary(!darklVPrimary); setDarklV(false); setLVPrimary(false)
                  //: setDarkmL(!darkmL); setMLPrimary(false); setDarkmLPrimary(false); setDarkLVPrimary(!darklVPrimary); setDarklV(false); setLVPrimary(false)
                  setIsDarkMode(!isDarkMode);
                  console.log(isDarkMode);
                  // Is this stateful or persistent?
                  localStorage.setItem('isDarkMode', !isDarkMode);
                }}
              ><Moon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path style={{ fill: "#F6C358" }} d="M10.719 2.082c-2.572 2.028-4.719 5.212-4.719 9.918 0 4.569 1.938 7.798 4.548 9.895-4.829-.705-8.548-4.874-8.548-9.895 0-5.08 3.808-9.288 8.719-9.918zm1.281-2.082c-6.617 0-12 5.383-12 12s5.383 12 12 12c1.894 0 3.87-.333 5.37-1.179-3.453-.613-9.37-3.367-9.37-10.821 0-7.555 6.422-10.317 9.37-10.821-1.74-.682-3.476-1.179-5.37-1.179zm0 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001z" /></Moon></button>
              {/* </ThemeProvider> */}
                <Welcome onClick={() => setSideBarDisplay(!sideBarDisplay)}>Pop^</Welcome>
                {/* <ToggleSwitch /> */}
                {
                  !sideBarDisplay ?
                  ''
                  :
                  <Route
                    path='/'
                    render={(props) => {
                      return (
                        <SideBar
                          lVPrimary={lVPrimary}
                          setLVPrimary={setLVPrimary}
                          mLPrimary={mLPrimary}
                          setMLPrimary={setMLPrimary}
                          close={setSideBarDisplay}
                        />
                      )
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
                      isDarkMode={isDarkMode}
                      mLPrimary={mLPrimary}
                      darklV={darklV}
                      onClick={() => {
                        isDarkMode ? (setDarkLVPrimary(false), setDarklV(!darklv)) // add darkmLPrimary option
                          : setMLPrimary(!mLPrimary); setLVPrimary(false)
                      }}
                    >{t('mapViewBtn')}</MapViewButton>
                  </Link>
                  <Link to='/listview'>
                    <ListViewButton
                      isDarkMode={isDarkMode}
                      lVPrimary={lVPrimary}
                      darklV={darklV}
                      darklVPrimary={darklVPrimary}
                      onClick={() => {
                        isDarkMode ? (setDarkLVPrimary(!darklVPrimary), console.log('hi'))
                          : setLVPrimary(!lVPrimary); setMLPrimary(false)
                      }}
                    >{t('listViewBtn')}</ListViewButton>
                  </Link>
                </ButtonWrapper>
                  <Switch>
                    <Route
                      path='/'
                      exact
                      render={(props) => {
                        return (
                        <Map
                          loadingElement={<div style={{height: '100%' }}/>}
                          containerElement={<div style={{height: '100%' }}/>}
                          mapElement={<div style={{height: '100%' }}/>}
                          merchData={merchData}
                          selectMerchant={setSelectedMerchant}
                          currentLocMarker={currentLocMarker}
                          setCurrentLocMarker={setCurrentLocMarker}
                          setMLPrimary={setMLPrimary}
                        />
                        )
                      }}
                    />
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
        </div>
      </Well>
  )
}

export default App;
