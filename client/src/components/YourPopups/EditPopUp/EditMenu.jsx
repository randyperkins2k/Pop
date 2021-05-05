import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMenu = ({ merchant, selectMerchant }) => {
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
    <div>
      <div>
        <h3>{`${merchant.name}'s`} products: </h3>
        {products.map(product =>
          <p>&emsp; &#8226; &nbsp;<b>{product.name}</b><small>(<i>${parseFloat(product.price).toFixed(2)}</i></small>)
          <button onClick={
            ()=>{deleteProduct(product)}
          }><small>x</small></button></p>
        )}
      </div>
      <div>
        <form>
          <h4>add new product:</h4>
          <label><b>name:</b></label>
          <input type="text" value={nameText} onChange={(e) => setNameText(e.target.value)}></input><br></br>
          <label><b>price:</b></label>
          <input type="number" value={priceNum} onChange={(e) => setPriceNum(e.target.value)}></input><br></br>
        </form>
        <button onClick={() => {addProduct()}}>add product</button><br></br>
      </div>
    </div>
  )

}

export default EditMenu;