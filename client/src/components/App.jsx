
import React, { useState, useEffect } from 'react';
import CreatePop from './YourPopups/CreatePop.jsx';
import Burger from './SideBarView/Burger.js';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
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
import EditOwner from './YourPopups/EditPopUp/EditOwner.jsx';
import ToggleSwitch from '../components/ToggleSwitch.jsx';
import YourPopUps from './YourPopups/YourPopUps.jsx';
import Login from './Login.jsx';
import axios from 'axios';
import OpenPopupMap from './YourPopups/EditPopUp/OpenPopMap.jsx';
import { HashRouter as Well, BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styled, { css, ThemeProvider, createGlobalStyle } from 'styled-components';
import { ReactComponent as MoonPic } from '../popup/moonArt.svg'
import Picture from './MerchantProfileView/Picture.jsx';
//import { ThemeProvider } from 'styled-components'
import GlobalStyles from './styles/globalStyles.js'
//import { overlap } from 'sequelize/types/lib/operators';


// import * as butt from './openMerch.json';
// const merchData = butt.merchants;
// const MapView = withScriptjs(withGoogleMap(Map));
/*=============================== (End Imports) ===================================*/

/*=============================== Styled Components ===============================*/



const H1 = styled.h1`
font-size: 2.5rem;
margin: 60px;
`


/*============================ (End Styled Components) ==============================*/

/*================================= App Component ===================================*/
const App = () => {
  const [myPops, setMyPops] = useState([]);
  const [user, setUser] = useState();
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState([null]);
  const [merchData, setMerchData] = useState([{name: '3', info: '2'}]);
  const [userSubs, setUserSubs] = useState([]);
  const [yourPopups, setYourPopups] = useState([]);
  const [currentLocMarker, setCurrentLocMarker] = useState(null);
  const { t, i18n } = useTranslation();
  const [ center, setCenter ] = useState({lat: 29.956124, lng: -90.090509});
  const [theme, setTheme] = useState({ mode: 'light' })
  const [open, setOpen] = useState(false);
  

  // Function which fetches merchant data from database.
  const getPops = () => {
    axios.get('/api/merchants')
      .then(response => {
        // console.log('merchants', response.data);
        setMerchData(response.data);
        setInterval(function() {
          axios.get('/api/merchants')
            .then(response => {
              setMerchData(response.data);
              console.log('merchants updated');
              console.log(response.data);
            });
        }, 10000);
      })
      .catch(err => console.log(err));
  };

  // Function checks if user is logged in.
  const logged = () => {
    axios.get('/testing')
      .then(results => {
        // console.log(results.data);
        if (results.data.displayName) {
          const { displayName, email, picture } = results.data;
          setIsLogged(true);
          // console.log('before post', displayName, email, picture);
          // Picture removed from endpoint due to HTTP issue.
          axios.post(`/api/users/adduser/${displayName}/${email}`)
            .then(addUser => {
              // console.log('this is add user', addUser);
              let subs, yourPops;
              addUser.data.Subs ? setUserSubs(addUser.data.Subs.map(Sub => Sub.Merchant)) : setUserSubs([]);
              // console.log('subscriptions:', addUser.data.Subs);
              addUser.data.Admins ? setYourPopups(addUser.data.Admins.map(Admin => Admin.Merchant)) : setYourPopups([]);
                setUser({
                  name: displayName,
                  email: email,
                  picture: picture,
                  id: addUser.data.id,
                  spanish: addUser.data.spanish,
                  dark: addUser.data.dark
                });
            })
        } else {
          setIsLogged(false);
          setUser({});
        }
      });
  }

  useEffect(() => logged(), []);
  useEffect(() => getPops(), []);

  return (
    <ThemeProvider
    theme={theme}
    >
      <GlobalStyles
      />
      
      <Router>
        {isLogged === true ? <Redirect to="/" /> : <Redirect to="/login" />}
        <Switch>

          <Route
            exact path="/"
            render={props => {
              return (
                  <Home
        
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
                    center={center}
                    setCenter={setCenter}
                    open={open}
                    setOpen={setOpen}
                    theme={theme}
                    setTheme={setTheme}
                  />
              )
            }}
          />
          <Route
            path="/login"
            render={props => <Login />}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  )
};
/*================================ (End App Component) ==================================*/

/*=================================== Home Component ====================================*/
const Home = ({
  myPops, setMyPops,
  user, setUser,
  sideBarDisplay, setSideBarDisplay,
  isLogged, setIsLogged,
  selectedMerchant, setSelectedMerchant,
  merchData, setMerchData,
  userSubs, setUserSubs, yourPopups, setYourPopups,
  currentLocMarker, setCurrentLocMarker,
  open, setOpen,
  center, setCenter, theme, setTheme
}) => {
  const [ zindex, setZindex ] = useState(-1)
  const { t, i18n } = useTranslation();



  function setLanguage() {
    if (user.spanish) {
      i18n.changeLanguage('sp');
    }
    else {
      i18n.changeLanguage('en');
    }
  }

  useEffect(async () =>  user ? setLanguage() : null, [user]);

  function setLightOrDark() {
    if (user.dark) {
      setTheme({mode: 'dark'});
    } else {
      setTheme({mode: 'light'});
    }
  }

  useEffect(async () =>  user ? setLightOrDark() : null, [user]);

  const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100vw;
    z-index: ${zindex};
    background-color: transparent;
    opacity: .5;
  `
useEffect(() => {
  if(sideBarDisplay) {
    setZindex(98)
  } else if(!sideBarDisplay) {
    setZindex(-1)
  }
},[sideBarDisplay])
    return (

      <Well>
          {/* <LogOutBtn href="/logout"> Logout </LogOutBtn> */}
            <div className='sidebar-view'>
            <Burger
              open={open}
              setOpen={setOpen}
              sideBarDisplay={sideBarDisplay}
              setSideBarDisplay={setSideBarDisplay}
              // onClick={() => {
              //   setSideBarDisplay(!sideBarDisplay)
              //   }}
            />

                <H1>Pop^</H1>
                {/* <ToggleSwitch /> */}
                {
                  !sideBarDisplay ?
                  ''
                  :

                      <SideBar
                      setSideBarDisplay={setSideBarDisplay}
                      open={open}
                      setOpen={setOpen}
                      />



                }

            </div>
            <Overlay></Overlay>
              <div
                onClick={() => setSideBarDisplay(false)}
                className='main'
                >
                  <Link to='/'>
                    <button 
                    >{t('mapViewBtn')}</button>
                  </Link>
                  <Link to='/listview'>
                    <button
                      onClick={() => {
                      
                      }}
                    >{t('listViewBtn')}</button>
                  </Link>

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
                            merchant={selectedMerchant}
                            selectMerchant={setSelectedMerchant}
                            currentLocMarker={currentLocMarker}
                            setCurrentLocMarker={setCurrentLocMarker}
                            center={center}
                            setCenter={setCenter}
                            isLocater={false}
                            zoomLevel={12}
                          />
                        )
                      }}
                    />
                    <Route
                      path='/locate'
                      exact
                      render={(props) => {
                        return (
                          <div>
                          <Map
                            loadingElement={<div style={{height: '100%' }}/>}
                            containerElement={<div style={{height: '100%' }}/>}
                            mapElement={<div style={{height: '100%' }}/>}
                            merchData={merchData}
                            merchant={selectedMerchant}
                            selectMerchant={setSelectedMerchant}
                            center={{lat: +selectedMerchant.lat, lng: +selectedMerchant.lon}}
                            setCenter={()=>{}}
                            currentLocMarker={currentLocMarker}
                            setCurrentLocMarker={setCurrentLocMarker}
                            isLocater={true}
                            zoomLevel={18}
                          />
                          </div>
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
                        return <SettingsView
                        user={user}
                        setUser={setUser}
                        theme={theme}
                        setTheme={setTheme}
                      />
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
                      }}
                    />
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
                    <Route
                  path="/editowner"
                  render={() => {
                    return <EditOwner
                      merchant={selectedMerchant}
                      selectMerchant={setSelectedMerchant}
                      user={user}
                      setUser={setUser}
                      />
                  }}
                />
                  </Switch>
                </div>

      </Well>
  )
}
/*=================================== (End Home Component) ====================================*/

export default App;
