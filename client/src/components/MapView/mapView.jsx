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
//import SearchBar from './../searchbar/SearchBar.jsx'
//import map from '../popup/foodmarker.png'
const libraries = ["places"];
const TouchMap = styled.div`
font-family: 'Ubuntu';
margin-top: 30px;
opacity: .5;
text-align: center;
`
const mapContainerStyle = {
  width: '100vw',
  height: '100vh'
}
const Nav = styled.nav`
position: absolute;
padding: '2rem 0';
text-align: center;
margin-top: -200px;
margin-left: 120px;
`
const EnglishBtn = styled.button`
  background-color: transparent;
  border-width: 1px;
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 10px;
  ${props => props.englishPrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 10.25px;
`}
`
const SpanishBtn = styled.button`
  background-color: transparent;
  border-width: 1px;
  border-radius: 6px;
  padding: 3px 10px;
  font-size: 10px;
  ${props => props.spanishPrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 10.25px;
`}
`



const options = {
  styles: mapStyles,
  disableDefaultUI: true,
}
const Map = ({ merchData, selectMerchant, currentLocMarker, setCurrentLocMarker, setMLPrimary }) => {
  const [ selectedPopUp, setSelectedPopUp ] = useState(null);
  const [ center, setCenter ] = useState({lat: 29.956124, lng: -90.090509});
  const [ yourLocBool, setYourLocBool] = useState(false);
  const [englishPrimary, setEnglishPrimary] = useState(false)
  const [spanishPrimary, setSpanishPrimary] = useState(false)
  //const [ currentLocMarker, setCurrentLocMarker ] = useState(null);
  const { t, i18n } = useTranslation();
  function getLang(lang) {
    i18n.changeLanguage(lang);
  }
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
      setYourLocBool(true)
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
// console.log(t("touch"))
  return (
    <div>
      <Nav>
      <EnglishBtn 
      englishPrimary={englishPrimary}
      onClick={()=>{
        getLang('en')
        setEnglishPrimary(!englishPrimary)
        setSpanishPrimary(false)
      }}>
        {t('englishBtn')}
        </EnglishBtn>
      <SpanishBtn 
      spanishPrimary={spanishPrimary}
      onClick={()=>{
        setSpanishPrimary(!spanishPrimary)
        setEnglishPrimary(false)
        getLang('sp')
        }}>
          {t('spanishBtn')}
          </SpanishBtn>
      </Nav>
      <TouchMap>{t("touchMap")}</TouchMap>
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={center}
      options={options}
      onClick={(event) =>{
        setCenter({
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
          time: new Date()
        })
        alert('location moved!');
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
              url: '/assets/foodmarker.svg',
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
              //setMLPrimary={setMLPrimary}
              />
          </InfoWindow>
        )
      }
    </GoogleMap>
    </div>
    // <GoogleMap
    //   defaultZoom={13.5}
    //   defaultCenter={{lat: 29.956124, lng: -90.090509}}
    // >
    //   {merchData.merchants.map(merch => {
    //     if (merch.isOpen) {
    //       return <Marker
    //         key={merch.id}
    //         position={{
    //           lat: merch.lat,
    //           lng: merch.lon
    //         }}
    //         onClick={()=>{
    //           setSelectedPopUp(merch)
    //         }}
    //       />
    //     }
    //   })}
    //   {
    //     selectedPopUp && (
    //       <InfoWindow
    //       position={{
    //         lat: selectedPopUp.lat,
    //         lng: selectedPopUp.lon
    //       }}
    //       onCloseClick={()=>{
    //         setSelectedPopUp(null);
    //       }}
    //       >
    //         <div>
    //           <div>{selectedPopUp.name}</div>
    //           <div>{selectedPopUp.website}</div>
    //         </div>
    //       </InfoWindow>
    //     )
    //   }
    // </GoogleMap>
  );
};
export default Map;