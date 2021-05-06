import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../ToggleSwitch.jsx'
import { Link } from 'react-router-dom';
import axios from 'axios';
import PictureFeed from './PictureFeed.jsx';

import styled, { css } from 'styled-components'
import { useTranslation } from 'react-i18next'


const MerchantProWrap = styled.div`
text-align: center;
`
const SubmitBtn = styled.button`
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
  color: black;
  font-family: 'Ubuntu';
  padding: 5px 16px;
  background-color: white;
  font-size: 11px;
  border-radius: 6px;
  border-width: 1px;
  margin-top: 25px;
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
const Input = styled.input`
box-sizing:border-box;
margin:20px;
background-color: #fafafa;
width:80%;
resize: vertical;
padding:16px;
border-radius:15px;
border:0;
box-shadow:4px 4px 10px;
`
const LeaveAReview = styled.div`
margin-bottom: -17px;
margin-top: 30px;
font-famly: 'Ubuntu';
`


const MerchantProfile = ({ merchant, user, userSubs, setUserSubs, merchData, setMerchData, openOrClosed, setOpenOrClosed, userData, setUserData }) => {
  const [ locatePrimary, setLocatePrimary ] = useState(false);
  const [ viewMenuPrimary, setViewMenuPrimary ] = useState(false);
  const [ reviews, setReviews ] = useState([]);
  const [ pictureFeedView, setPictureFeedView ] = useState(true);
  const [ reviewView, setReviewView ] = useState(false)
  const {t} = useTranslation()
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
        <H2>{t("infoTxt")}</H2>
        <p>
          {merchant.info}
        </p>
      </div>
      <LocateBtn
      locatePrimary={locatePrimary}
      onClick={() => {
        setLocatePrimary(!locatePrimary)
        setViewMenuPrimary(false)
      }}>{t("locateBtn")}</LocateBtn>
      <Link to="/menu">
        <ViewMenuBtn
          viewMenuPrimary={viewMenuPrimary}
          onClick={() => {
            setViewMenuPrimary(!viewMenuPrimary)
            setLocatePrimary(false)
            console.log('hey there', merchant.id, userSubs)
          }}>{t("viewMenuBtn")}
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
       >{t("reviewsBtn")}</ViewMenuBtn>
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
      <LeaveAReview>{t("leaveAReviewTxt")}:</LeaveAReview>
        <form onSubmit={(e) => {
          e.preventDefault();

        }}>
          <Input type="text" value={reviewText} onChange={(e)=>setReviewText(e.target.value)} maxlength="255"></Input>
          <SubmitBtn onClick={submitReview}>{t("submitBtn")}</SubmitBtn>
        </form>
      </div>
      <div>
        <h5>{t("reviewsBtn")}:</h5>
        {reviews.map(review => <p><b>{review.User.name}</b>: {review.message}</p>)}
      </div>
    </div>
      :
    <div>
      <h5>{t("leaveAReviewTxt")}</h5>
    </div>
      }
    </MerchantProWrap>
  )
};

export default MerchantProfile;