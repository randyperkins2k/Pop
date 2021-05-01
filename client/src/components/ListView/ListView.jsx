import React, { useState, useEffect } from 'react';
import MerchList from './MerchList.jsx';
import styled from 'styled-components';

const Open = styled.button`
  margin-left: 56px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`
const Favs = styled.button`
  margin-left: -1px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`

const Search = styled.button`
  margin-left: -1px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`
const ListView= ({ merchData, selectMerchant, userSubs, setUserSubs }) => {
  const [ openPopsView, setOpenPopsView ] = useState(true);
  const [ yourSubsView, setYourSubsView ] = useState(false);
  const [ searchPopsView, setSearchPopsView ] = useState(false);

  return (
    <div>
      <Open onClick={() => setOpenPopsView(true)}>Open Currently</Open>
      <Favs onClick={() => setOpenPopsView(false)}>Your Favorites</Favs>
      <Search>Look up Pop up</Search>
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