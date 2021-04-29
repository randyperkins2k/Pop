import React, { useState, useEffect } from 'react';
import MerchList from './MerchList.jsx';

const ListView= ({ merchData, selectMerchant }) => {

  return (
    <div>
      <button>Open Currently</button>
      <button>Your Favorites</button>
      <ul>
        {
          merchData.merchants.map(merch => {
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