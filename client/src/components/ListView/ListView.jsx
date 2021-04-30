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
const ListView= ({ merchData, selectMerchant }) => {

  return (
    <div>
      <Open>Open Currently</Open>
      <Favs>Your Favorites</Favs>
      <ul>
        {
          merchData.map(merch => {
            if (merch.isOpen) {
              return <MerchList 
              key={merch.id} 
              merchant={merch}
              selectMerchant={selectMerchant}/>
            }
          })
        }
      </ul>
    </div>
  );
}

export default ListView;