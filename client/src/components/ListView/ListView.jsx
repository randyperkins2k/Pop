import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ListView= ({ merchData }) => {

  return (
    <div>
      <button>Open Currently</button>
      <button>Your Favorites</button>
      <ul>
        {
          merchData.merchants.map(merch => {
            if (merch.isOpen) {
              return <li>
                <h3>{merch.name}</h3>
                <h3>{merch.website}</h3>
              </li>
            }
          })
        }
      </ul>
    </div>
  );
}

export default ListView;