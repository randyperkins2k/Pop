import React, { useState, useEffect } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Div = styled.div`
margin-top:30px;
`
const H2 = styled.div`
margin-top: 15px;
color:#f5abc9;
font-size: 1.5rem;
`
const EditMenu = ({ merchant, selectMerchant }) => {
  const {t} = useTranslation()
  console.log('hello from edit menu');
  console.log(merchant);
  const [products, setProducts] = useState([]);
  const [nameText, setNameText] = useState('');
  const [priceNum, setPriceNum] = useState(null);
  const getProducts = () => {
    axios.get(`/api/products/menu/${merchant.id}`)
      .then(results => {
        console.log(results.data);
        setProducts(results.data);
      })
  };

  useEffect(() => getProducts(), []);

  const addProduct = () => {
    let thePrice = 0;
    if (!nameText) {
      alert('please include name');
    } else {
      if (priceNum) {
        thePrice = priceNum;
      }

      axios.post('/api/products/addproduct', {
        name: nameText,
        merchant: merchant.id,
        price: thePrice,
      })
        .then(result => {
          console.log(result.data);
          let newProductList = [...products, result.data];
          setProducts(newProductList);
          setNameText('');
          setPriceNum('');
        })
        .catch(err => console.log(err));
    }
  };

  const deleteProduct = (product) => {
    if (confirm(`Do you want to delete ${product.name}?`) === true) {
      console.log('confirmed');
      axios.delete(`/api/products/deleteproduct/${product.id}`)
        .then(result => {
          let newProductList = products.slice();
          setProducts(newProductList.filter(prod => prod.id !== product.id));
        })
        .catch(err => console.log(err));
    } else {
      console.log('cancelled');
    }
  }

  return(
    <Div>
      <div>
        <h1>{`${merchant.name}'s ${t("products2Txt")}`} </h1>
        {products.map(product =>
          <p>&emsp; &#8226; &nbsp;<b>{product.name}</b><small>(<i>${parseFloat(product.price).toFixed(2)}</i></small>)
          <button onClick={
            ()=>{deleteProduct(product)}
          }><small>x</small></button></p>
        )}
      </div>
      <div>
        <form>
          <h5>{t("addaProductTxt")}:</h5>
          <br/>
          <label><b>{t("productNameTxt")}:</b></label>
          <input type="text" value={nameText} onChange={(e) => setNameText(e.target.value)}></input><br></br>
          <br/>
          <label><b>{t("priceTxt")}:</b></label><br/>
          <input type="number" value={priceNum} onChange={(e) => setPriceNum(e.target.value)}></input><br></br>
          <br/>
        </form>
        <button onClick={() => {addProduct()}}>{t("addProductBtn")}</button><br></br>
        <br/>
      </div>
      <div>
        <MerchantProfile merchant={merchant} style={{fontFamily: 'Ubuntu'}}/>
      </div>
    </Div>
  )

}

export default EditMenu;