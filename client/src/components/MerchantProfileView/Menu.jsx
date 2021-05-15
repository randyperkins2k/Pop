import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const Menu = ({ merchant, selectMerchant }) => {
  const [products, setProducts] = useState([]);
  const { t, i18n } = useTranslation();

  const getProducts = () => {
    axios.get(`/api/products/menu/${merchant.id}`)
      .then(result => {
        setProducts(result.data);
      })
  };

  useEffect(() => getProducts(), []);

  return (
    <div>
        <h3>{`${t("productsTxt")}:`} </h3>
        {products.map(product =>
          <p>&emsp; &#8226; &nbsp;<b>{product.name}</b><small>(<i>${parseFloat(product.price).toFixed(2)}</i></small>)</p>
        )}
    </div>
  );
};
export default Menu;