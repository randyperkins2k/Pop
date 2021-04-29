import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import CreatePop from './CreatePop.jsx';
import MyPops from './MyPops.jsx';
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
import * as merchData from './openMerch.json';
import YourPopUps from './YourPopups/YourPopUps.jsx';
//import ToggleSwitch from './ToggleSwitch.jsx';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
import styled from 'styled-components'

// const MapView = withScriptjs(withGoogleMap(Map));

const ListViewButton = styled.button`
  margin-left: -1px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;

`
const MapViewButton = styled.button`
  margin-left: 98px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`
const Welcome = styled.h1`
font-family: 'Londrina Solid', cursive;
text-align: center;
color: #ffd1dc;
margin-bottom: 4.5rem;
`

const LogginOut = styled.a`
font-family: 'Londrina Outline', cursive;
color: black;
background-color: white;
`
import axios from 'axios';

const App = () => {
  const [myPops, setMyPops] = useState([]);
  const [user, setUser] = useState();
  const [sideBarDisplay, setSideBarDisplay] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [ selectedMerchant, setSelectedMerchant ] = useState();
  //grab from database
  const getPops = () => {
    axios.get('/merchants')
      .then(response => setMyPops(response.data))
  }

  const logged = () => {
    axios.get('/testing')
    .then(results => {
      //console.log(results.data);
      if (results.data.displayName) {
        setIsLogged(true);
        setUser({
          name: results.data.displayName,
          email: results.data.email,
          picture: results.data.picture
        });
      }
    });
}

  useEffect(() => logged(), []);
  useState(() => getPops(), []);

  return (
    <Router>
      <div>
        {isLogged === true
          ? (<LogginOut href="/logout"> Logout </LogginOut>)
          : (<LogginOut href="/google"> Login </LogginOut>)
        }
        <div className='sidebar-view'>
            <Welcome onClick={() => setSideBarDisplay(!sideBarDisplay)}>Pop^</Welcome>
            {/* <ToggleSwitch /> */}
            {
              !sideBarDisplay ?
              ''
              :
              <Route
                path='/'
                render={(props) => {
                  return <SideBar close={setSideBarDisplay}/>
                }}
              />
            }
          </div>
          <div
            onClick={() => setSideBarDisplay(false)}
            className='main'
            >
            <Link to='/'>
              <MapViewButton >Map view</MapViewButton>
            </Link>
            <Link to='/listview'>
              <ListViewButton>List view</ListViewButton>
            </Link>
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
                    />
                }}/>
                <Route
                  path='/listview'
                  render={(props) => {
                    return <ListView
                      merchData={merchData}
                      selectMerchant={setSelectedMerchant}
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
                      selectMerch={setSelectedMerchant}
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
                  render={(props) => <EditPopupProfile merchant={selectedMerchant}/>}
                />
                <Route
                  path="/profile"
                  render={(props => <MerchantProfile merchant={selectedMerchant}/>)}
                />
              </Switch>
            </div>
      </div>
    </Router>
  )
};

export default App;