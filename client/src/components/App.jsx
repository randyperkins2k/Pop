import React, { useState } from 'react';

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
    const [sideBarDisplay, setSideBarDisplay] = useState(false);
    //grab from database
    const getPops = () => {
      axios.get('/merchants')
        .then(response => setMyPops(response.data))
    }

    useState(() => getPops());
    
    return (
      <Router>
        <div>
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
                <Route 
                path='/'
                exact
                render={(props) => {
                  return <Map
                    loadingElement={<div style={{height: '80%' }}/>}
                    containerElement={<div style={{height: '80%' }}/>}
                    mapElement={<div style={{height: '80%' }}/>}
                    merchData={merchData}
                    />
                }}/>
                <Route
                  path='/listview'
                  render={(props) => {
                    return <ListView
                      merchData={merchData}
                    />
                  }}
                />
                <Route
                  path='/yourprofile'
                  render={(props) => {
                    return <UserProfile/>
                  }}
                />
                <Route
                  path='/yourpopups'
                  render={(props) => {
                    return <YourPopUps/>
                  }}
                />
                <Route
                  path='/settings'
                  render={(props) => {
                    return <SettingsView/>
                  }}
                />
              </div>
        </div>
      </Router>
    )
};

export default App;