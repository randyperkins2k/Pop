import React, { useState, useEffect } from 'react';
import MerchList from './MerchList.jsx';
import styled, { css } from 'styled-components';

const Open = styled.button`
  margin-top: 21px;
  margin-left: 36px;
  margin-bottom: 2rem;
  color: black;
  font-family: 'Ubuntu';
  padding: 5px 16px;
  background-color: white;
  font-size: 11px;
  border-radius: 6px;
  border-width: 1px;
  border-color: lightgray;
  transition: ease 0.01s all;
${props => props.openPrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 11.25px;
`}
`
const Favs = styled.button`
  margin-left: 6px;
  color: black;
  font-family: 'Ubuntu';
  padding: 5px 16px;
  background-color: white;
  font-size: 11px;
  border-radius: 6px;
  border-width: 1px;
  border-color: lightgray;
  transition: ease 0.01s all;
  ${props => props.favPrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 11.25px;
`}
`

const Search = styled.button`
  margin-left: 6px;
  color: black;
  font-family: 'Ubuntu';
  padding: 5px 16px;
  background-color: white;
  font-size: 11px;
  border-radius: 6px;
  border-width: 1px;
  border-color: lightgray;
  transition: ease 0.01s all;
  ${props => props.sPUPrimary && css`
  opacity: .5;
  color: black;
  background-color: #ffd1dc;
  font-size: 11.25px;
  `}
`
const ListView= ({ merchData, selectMerchant, userSubs, setUserSubs }) => {
  const [ openPopsView, setOpenPopsView ] = useState(true);
  const [ yourSubsView, setYourSubsView ] = useState(false);
  const [ searchPopsView, setSearchPopsView ] = useState(false);
  const [ openPrimary, setOpenPrimary ] = useState(true);
  const [ sPUPrimary, setSPUPrimary ] = useState(false);
  const [ favPrimary, setFavPrimary ] = useState(false);

  return (
    <div>
      <Open
      openPrimary={openPrimary}
      onClick={() => {
        setOpenPopsView(true)
        setOpenPrimary(!openPrimary)
        setSPUPrimary(false)
        setFavPrimary(false)
        }}>Open Now</Open>
      <Search sPUPrimary={sPUPrimary} onClick={() => {
        setSPUPrimary(!sPUPrimary)
        setOpenPrimary(false)
        setFavPrimary(false)
      }}>Search PopUps</Search>
      <Favs
      favPrimary={favPrimary}
      onClick={() => {
        setOpenPopsView(false)
        setFavPrimary(!favPrimary)
        setSPUPrimary(false)
        setOpenPrimary(false)
        }}
        >
          Favorites</Favs>
      <ul>
        { openPopsView ?
          merchData.map(merch => {
            if (merch.isOpen) {
              return <MerchList
              key={merch.id}
              merchant={merch}
              selectMerchant={selectMerchant}/>
            }
          })
          :
          userSubs.map(merch => <MerchList
            key={merch.id}
            merchant={merch}
            selectMerchant={selectMerchant}
          />)
        }
      </ul>
    </div>
  );
}

export default ListView;