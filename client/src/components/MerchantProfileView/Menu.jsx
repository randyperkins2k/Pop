import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components'

const H22 = styled.h1`

margin-top: 15px;
margin-bottom: 0px;
color:#f5abc9;
font-size: 1.5rem;

`

const H3 = styled.h3`
font-family: 'Londrina Solid',cursive;
margin-top: 3px;
color: ${props => props.theme.mode === 'dark' ? 'rgb(224, 217, 220)' : '#000'};

`

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
        <H22>{`${t("productsTxt")}:`} </H22>
        {products.map(product =>
          <H3>&emsp; &#8226; &nbsp;<b>{product.name}</b><small>(<i>${parseFloat(product.price).toFixed(2)}</i></small>)</H3>
        )}
    </div>
  );
};
export default Menu;