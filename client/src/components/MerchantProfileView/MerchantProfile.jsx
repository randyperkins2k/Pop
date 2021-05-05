import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../ToggleSwitch.jsx'
import { Link } from 'react-router-dom';
import axios from 'axios';
import PictureFeed from './PictureFeed.jsx';

import styled, { css } from 'styled-components'

const MerchantProWrap = styled.div`
text-align: center;
`


const ViewMenuBtn = styled.button`
  text-align: center;
  color: black;
  font-family: 'Ubuntu';
  padding: 5px 16px;
  background-color: white;
  font-size: 11px;
  border-radius: 6px;
  border-width: 1px;
  border-color: lightgray;
  transition: ease 0.01s all;
  ${props => props.viewMenuPrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 11.25px;
`}
`
const LocateBtn = styled.button`
  text-align: center;
  color: black;
  font-family: 'Ubuntu';
  padding: 5px 16px;
  background-color: white;
  font-size: 11px;
  border-radius: 6px;
  border-width: 1px;
  border-color: lightgray;
  transition: ease 0.01s all;
  ${props => props.locatePrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 11.25px;
`}
`
const H2 = styled.div`
font-family: 'Ubuntu';
text-align: center;
`
const P = styled.div`
font-family: 'Ubuntu';
text-align: center;
margin-top: 30px;
`


const MerchantProfile = ({ merchant, user, userSubs, setUserSubs, merchData, setMerchData, openOrClosed, setOpenOrClosed, userData, setUserData }) => {
  const [ locatePrimary, setLocatePrimary ] = useState(false);
  const [ viewMenuPrimary, setViewMenuPrimary ] = useState(false);
  const [ reviews, setReviews ] = useState([]);
  const [ pictureFeedView, setPictureFeedView ] = useState(true);
  const [ reviewView, setReviewView ] = useState(false)
  //const [reviews, setReviews] = useState(merchant.Reviews);
  const findReviews = () => {
    if (merchant.Reviews) {
      setReviews(merchant.Reviews);
    }
  };
  //useEffect(() => logged(), []);
  useEffect(() =>findReviews(), []);
  const [reviewText, setReviewText] = useState('');

  const submitReview = () => {
    console.log(reviewText);
    /**
     * //add new review
       app.post('/api/reviews/addreview/', (req, res) => {
       const { UserId, merchantId, rating, message } = req.body;
       .then(data => res.send(data))
        .catch(err => res.send(err));
});
     */
    axios.post('/api/reviews/addReview', {
      UserId: user.id,
      MerchantId: merchant.id,
      rating: 5,
      message: reviewText
    })
    .then((results) => {
      const newReview = results.data;
      newReview.User = {};
      newReview.User.name = user.name;
      console.log(newReview);
      setReviews([newReview, ...reviews]);
      const merchantsCopy = merchData.slice();
      merchantsCopy.forEach(merch => {
        if (merch.id === merchant.id) {
          merch.Reviews = [newReview, ...merch.Reviews];
        }
      });
      setMerchData(merchantsCopy);
      const subsCopy = userSubs.slice();
      subsCopy.forEach(merch => {
        if (merch.id === merchant.id) {
          merch.Reviews = [newReview, ...merch.Reviews];
        }
      });
      setUserData(subsCopy);
    })
    .catch(e => console.log(e));
  };

  return (

    <MerchantProWrap>
      <div>
        <h2>{merchant.name} {openOrClosed}</h2>
        <img/>
        <H2>Info</H2>
        <p>
          {merchant.info}
        </p>
      </div>
      <LocateBtn
      locatePrimary={locatePrimary}
      onClick={() => {
        setLocatePrimary(!locatePrimary)
        setViewMenuPrimary(false)
      }}>Locate</LocateBtn><br/>
      <Link to="/menu">
        <ViewMenuBtn
          viewMenuPrimary={viewMenuPrimary}
          onClick={() => {
            setViewMenuPrimary(!viewMenuPrimary)
            setLocatePrimary(false)
            console.log('hey there', merchant.id, userSubs)
          }}>View Menu
        </ViewMenuBtn>
      </Link>
      <ViewMenuBtn
      viewMenuPrimary={viewMenuPrimary}
      onClick={() => {
        // setViewMenuPrimary(!viewMenuPrimary)
        // setLocatePrimary(false)
        // console.log('hey there', merchant.id, userSubs)
        setReviewView(false);
        setPictureFeedView(false);
       }}>View Menu</ViewMenuBtn>
       <ViewMenuBtn
        onClick={() => {
          setPictureFeedView(false);
          setReviewView(true);
        }}
       >Reviews</ViewMenuBtn>
     {
       pictureFeedView && !reviewView ?
       <div>
        {
          pictureFeedView ?
          <PictureFeed
            merchant={merchant}
          />
          :
          ''
        }
      </div> :
      reviewView && !pictureFeedView ?
      <div>
      <div>
      <h5>Leave a review:</h5>
        <form onSubmit={(e) => {
          e.preventDefault();

        }}>
          <input type="text" value={reviewText} onChange={(e)=>setReviewText(e.target.value)} maxlength="255"></input>
          <button onClick={submitReview}>Submit</button>
        </form>
      </div>
      <div>
        <h5>Reviews:</h5>
        {reviews.map(review => <p><b>{review.User.name}</b>: {review.message}</p>)}
      </div>
    </div>
      :
    <div>
      <h5>This is the menu view!!!</h5>
    </div>
      }
    </MerchantProWrap>
  )
};

export default MerchantProfile;