import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditMenu = ({ merchant, selectMerchant }) => {
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
      /**
       * //add new product
  app.post('/api/product/addproduct/', (req, res) => {
    const { name, merchant, price } = req.body;
    Products.create({ name, merchant, price })
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });
       */
      axios.post('/api/product/addproduct', {
        name: nameText,
        merchant: merchant.id,
        price: thePrice,
      })
        .then(result => {
          console.log(result.data);
          let newProductList = [result.data, ...products];
          setProducts(newProductList);
          setNameText('');
          setPriceNum('');
        })
        .catch(err => console.log(err));
    }
  };

  return(
    <div>
      <div>
        <h3>{`${merchant.name}'s`} products: </h3>
        {products.map(product =>
          <p>&emsp; &#8226; &nbsp;<b>{product.name}</b><small>(<i>${parseFloat(product.price).toFixed(2)}</i></small>)</p>
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