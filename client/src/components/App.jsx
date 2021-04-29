import React, { useState, useEffect } from 'react';

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
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';
// const MapView = withScriptjs(withGoogleMap(Map));


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
  //check log in
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
          ? (<a href="/logout"> Logout </a>)
          : (<a href="/google"> Login </a>)
        }
        <div className='sidebar-view'>
            <h1 onClick={() => setSideBarDisplay(!sideBarDisplay)}>Welcome to Pop^</h1>
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
              <button >Map view</button>
            </Link>
            <Link to='/listview'>
              <button>List view</button>
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