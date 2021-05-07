import React, { useState, useEffect } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Div = styled.div`
text-align: center;
font-family: 'Ubuntu';
  p {
    font-size: 11px;
  },
  button {
    color: black;
    font-family: 'Ubuntu';
    padding: 5px 16px;
    background-color: white;
    font-size: 11px;
    border-radius: 6px;
    border-width: 1px;
    border-color: lightgray;
  },

`
const Input = styled.div`
  box-sizing:border-box;
  margin-top: 4px;
  margin-left: 31px;
  margin-bottom: 8px;
  background-color: #fafafa;
  width:80%;
  resize: vertical;
  padding:21px;
  border-radius:15px;
  border:0;
  box-shadow:4px 4px 10px;

`

const EditMenu = ({ merchant, selectMerchant }) => {
  const {t} = useTranslation()
  console.log('hello from edit menu');
  console.log(merchant);
  const [products, setProducts] = useState([]);
  const [nameText, setNameText] = useState('');
  const [priceNum, setPriceNum] = useState(null);
  const getProducts = () => {
    axios.get(`/api/product/menu/${merchant.id}`)
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

      axios.post('/api/product/addproduct', {
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
      axios.delete(`/api/product/deleteproduct/${product.id}`)
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
        <h5>{`${merchant.name}'s`} products: </h5>
        {products.map(product =>
          <p>&emsp; &#8226; &nbsp;<b>{product.name}</b><small>(<i>${parseFloat(product.price).toFixed(2)}</i></small>)
          <button onClick={
            ()=>{deleteProduct(product)}
          }><small>x</small></button></p>
        )}
      </div>
      <div>
        <form>
          <h5>add new product:</h5>
          <label><b>name:</b></label>
          <Input type="text" value={nameText} onChange={(e) => setNameText(e.target.value)}></Input><br></br>
          <label><b>price:</b></label>
          <Input type="number" value={priceNum} onChange={(e) => setPriceNum(e.target.value)}></Input><br></br>
        </form>
        <button onClick={() => {addProduct()}}>add product</button><br></br>
      </div>
      <div>
        <MerchantProfile merchant={merchant} style={{fontFamily: 'Ubuntu'}}/>
      </div>
    </Div>
  )

}

export default EditMenu;