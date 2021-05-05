import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Menu = ({ merchant, selectMerchant }) => {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    axios.get(`/api/product/menu/${merchant.id}`)
      .then(result => {
        setProducts(result.data);
      })
  };

  useEffect(() => getProducts(), []);

  return (
    <div>
        <h3>{`${merchant.name}'s`} products: </h3>
        {products.map(product =>
          <p>&emsp; &#8226; &nbsp;<b>{product.name}</b><small>(<i>${parseFloat(product.price).toFixed(2)}</i></small>)</p>
        )}
    </div>
  );
};
export default Menu;