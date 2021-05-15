import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../ToggleSwitch.jsx'
import { Link } from 'react-router-dom';
import axios from 'axios';
import PictureFeed from './PictureFeed.jsx';
import Menu from './Menu.jsx';
import { Image } from 'cloudinary-react'
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
const ReviewsBtn = styled.button`
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
${props => props.reviewBtnPrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 11.25px;
`}

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
font-family: 'Ubuntu';
`
const Review = styled.h5`
font-family: 'Ubuntu';
margin-top: 50px;
font-color: green;

`

const BigPic = styled.div`
  width: 90%;
  height: 90vw;
  align-self: center;
  position: absolute;
  z-index: 10;
  margin-left: 5%;
`
const ProfilePic = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`
const close = styled.span`
`
const Imagee = styled.img`
  display: block;
  height: 100%;
  width:100%;

`
const Imager = styled.img`
  display: block;
  height: 100%;
  width:100%;
`

const MerchantProfile = ({
   merchant, user, 
   userSubs, setUserSubs, 
   merchData, setMerchData, 
   openOrClosed, setOpenOrClosed, 
   userData, setUserData,
   uploadPicWindow }) => {
  const [ locatePrimary, setLocatePrimary ] = useState(false);
  const [ viewMenuPrimary, setViewMenuPrimary ] = useState(false);
  const [ reviews, setReviews ] = useState([]);
  const [ pictureFeedView, setPictureFeedView ] = useState(true);
  const [ reviewView, setReviewView ] = useState(false);
  const {t} = useTranslation();
  const [ reviewBtnPrimary, setReviewBtnPrimary ] = useState(false);
  const [ bigPic, setBigPic ] = useState(false);
  const [ selectedImage, setSelectedImage ] = useState('');
  const [ profilePic, setProfilePic ] = useState(merchant.picture)
  //const [reviews, setReviews] = useState(merchant.Reviews);
  const findReviews = () => {
    if (merchant.Reviews) {
      setReviews(merchant.Reviews);
      console.log('reviews: ')
      console.log(merchant.Reviews);
    }
  };
  //useEffect(() => logged(), []);
  useEffect(() =>findReviews(), []);
  const [reviewText, setReviewText] = useState('');

  const submitReview = () => {
    console.log(reviewText);

    axios.post('/api/reviews/addReview', {
      UserId: user.id,
      MerchantId: merchant.id,
      rating: 5,
      message: reviewText
    })
    .then((results) => {
      setReviewText('');
      const newReview = results.data;
      newReview.User = {};
      newReview.User.name = user.name;
      newReview.User.id = user.id;
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

  const deleteReview = (review) => {
    console.log('hello from deleteReview');
    console.log(review);
    const { id } = review;
    console.log(id);
    axios.delete(`/api/reviews/deletereview/${id}`)
      .then(response => {
        console.log(response.data);
        const updatedReviews = reviews.slice();
        setReviews(updatedReviews.filter(oldReview => oldReview.id !== id));
      })
      .catch(err => console.log(err));
  }

  return (

    <MerchantProWrap>
      <div>
        {
          bigPic ? 
          
          <BigPic>
            <a onClick={() => setBigPic(false)}>X</a>
            <Imagee src={selectedImage}></Imagee>
          </BigPic>
          :
          ''
        }
        <h2>{merchant.name} {openOrClosed}</h2>
        <ProfilePic>
          <Imager src={profilePic}></Imager>
        </ProfilePic>
        
        {/* <Image
            cloudName="opsparkpopup"
            publicId={image.image}
            width="300"
            crop="scale"
          /> */}
        <H2>{t("infoTxt")}</H2>
        <p>
          {merchant.info}
        </p>
      </div>
      <Link to="/locate">
        <LocateBtn
          locatePrimary={locatePrimary}
          onClick={() => {
          setLocatePrimary(!locatePrimary)
          setViewMenuPrimary(false)
          setReviewBtnPrimary(false)
          setReviewView(false)
          }}>{t("locateBtn")}
        </LocateBtn>
      </Link>
        <ViewMenuBtn
          viewMenuPrimary={viewMenuPrimary}
          onClick={() => {
            setPictureFeedView(true)
            setReviewView(false)
          }}>{t("pictureFeedTxt")}
        </ViewMenuBtn>
      <ViewMenuBtn
      viewMenuPrimary={viewMenuPrimary}
      onClick={() => {
        // setViewMenuPrimary(!viewMenuPrimary)
        // setLocatePrimary(false)
        // console.log('hey there', merchant.id, userSubs)
        setReviewView(false);
        setPictureFeedView(false);
       }}>{t("viewMenuBtn")}</ViewMenuBtn>
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
            uploadPicWindow={uploadPicWindow}
            setSelectedImage={setSelectedImage}
            selectedImage={selectedImage}
            setBigPic={setBigPic}
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
        <Review>{t("reviewsTxt")}:</Review>
        {reviews.map(review => <div key={review.id}>
          <p>
            <b>{review.User.name}</b>: {review.message}
            {
              review.User.id === user.id
              ? (<button onClick={() => deleteReview(review)}><small>x</small></button>)
              : null
            }

          </p>
        </div>)}
      </div>
    </div>
      :
    <div>
      <Menu
        merchant={merchant}
      />
    </div>
      }
    </MerchantProWrap>
  )
};

export default MerchantProfile;