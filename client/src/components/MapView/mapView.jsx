import React, { useEffect, useState } from 'react';
import mapStyles from './mapstyles';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import Window from '../MapView/Window.jsx'
import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'

const Div = styled.div`

margin: 30px 0 6px ;
`

const mapContainerStyle = {
    width: '100vw',
    height: '100vw',
    position: 'sticky',
  }

const libraries = ["places"];

const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  gestureHandling: 'greedy'
}
const Map = ({ merchData, merchant, selectMerchant, currentLocMarker, setCurrentLocMarker, center, setCenter, isLocater, zoomLevel}) => {
  const [ selectedPopUp, setSelectedPopUp ] = useState(null);
  const [ yourLocBool, setYourLocBool] = useState(false);
  const { t, i18n } = useTranslation();
  //const [ currentLocMarker, setCurrentLocMarker ] = useState(null);

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries
  })
  const mapMarkerClick = React.useCallback(()=>{
    setSelectedPopUp(merch)
  } , []);
  const geoLocTest = async (result) => {
    try {
      await result;
      console.log('geoLocTest', {
        lat: result.coords.latitude,
        lng: result.coords.longitude
      })
      setCenter({
        lat: result.coords.latitude,
        lng: result.coords.longitude
      })
      if (!isLocater) {
        setYourLocBool(true)
      }
    } catch (err) {
      console.log(err)
    }
  }
  const failed = () => {
    console.log('location test failed');
  }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(geoLocTest, failed);
    },[])
    if (loadError) {
      return "error loading map"
    }
    if (!isLoaded) {
      return "loading maps"
    }

  const assignIcon = (merch) => {
    if (merch.category === 'foodpopup') {
      return '/assets/foodmarker.svg'
    } else if (merch.category === 'foodtruck') {
      return '/assets/foodTruck.svg'
    } else if (merch.category === 'performer') {
      return '/assets/showgirl.svg'
    } else if (merch.category === 'produce') {
      return '/assets/potatoes.svg'
    } else if (merch.category === 'arts') {
      return '/assets/easel2.svg'
    }
  }

// console.log(t("touch"))
  return (
    <div>
      {isLocater ? null : <Div>{t("touchMap")}</Div>}
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={zoomLevel}
      center={center}
      options={options}
      onClick={(event) =>{ {
        if (!isLocater) {
          setCenter({
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date()
          })
          alert('location moved!');
        }
      }
        //console.log(currentLocMarker);
        //console.log(currentLocMarker);
        //why even bother with state right here?
        //why not just call an end point with event.latLng.lat() and event.latLng.lng()?
      }}
    >{
      yourLocBool ?
      <Marker
        position={
          center
        }
        icon={{
          url: '/assets/default.svg',
          scaledSize: new google.maps.Size(60, 60)
        }}
      /> :
      ''
    }
     {merchData.map(merch => {
        if (merch.isOpen) {
          return <Marker
            key={merch.id}
            position={{
              lat: +merch.lat,
              lng: +merch.lon
            }}
            // icon={{
            //   url: './foodmarker.png',
            //   scaledSize: new window.google.maps.Size(30, 30),
            //   origin: new window.google.maps.Point(0, 0),
            //   anchor: new window.google.maps.Point(15, 0)
            // }}
             onClick={()=>{
              setSelectedPopUp(merch)
            }}
            icon={{
              url: assignIcon(merch),
              scaledSize: new google.maps.Size(40, 40)
            }}
          />
        }
      })}
      {
        selectedPopUp && (
          <InfoWindow
          position={{
            lat: +selectedPopUp.lat,
            lng: +selectedPopUp.lon
          }}
          onCloseClick={()=>{
            setSelectedPopUp(null);
          }}
          >
           <Window
              merchant={selectedPopUp}
              selectMerchant={selectMerchant}

              />
          </InfoWindow>
        )
      }
    </GoogleMap>
    </div>
  );
};
export default Map;