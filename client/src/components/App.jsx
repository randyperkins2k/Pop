import React, {useState, useEffect } from 'react';

import CreatePop from './CreatePop.jsx';
import MyPops from './MyPops.jsx';
import { 
  GoogleMap, 
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Map from './MapView/mapView.jsx';
import ListView from '../components/ListView/ListView.jsx'
import SideBar from './SideBarView/SideBar.jsx';
import * as merchData from './openMerch.json';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

// const MapView = withScriptjs(withGoogleMap(Map));


import axios from 'axios';

const App = () => {
    const [myPops, setMyPops] = useState([]);
    const [mapOrList, setMapOrList] = useState(false);
    //grab from database
    const getPops = () => {
      axios.get('/merchants')
        .then(response => setMyPops(response.data))
    }

    useEffect(() => getPops(), []);

    return (
    <Router>
      <div>
        <div>
        <h1>Welcome to Pop^</h1>
        {/* <CreatePop myPops={myPops} setMyPops={setMyPops}/>
        <MyPops myPops={myPops} setMyPops={setMyPops}/> */}
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
        </div>
      </div>
    </Router>
    )
};

export default App;