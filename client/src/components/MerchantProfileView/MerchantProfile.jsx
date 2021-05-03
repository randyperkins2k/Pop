import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../ToggleSwitch.jsx'
import { Link } from 'react-router-dom';
import axios from 'axios';

const MerchantProfile = ({ merchant, user, userSubs, setUserSubs, merchData, setMerchData }) => {
  const [reviews, setReviews] = useState([]);
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

    <div>
      <div>
        <h5>{merchant.name}</h5>
        <img/>
        <h2>Info</h2>
        <p>
          {merchant.info}
        </p>
      </div>
      <button onClick={() => console.log(merchant.id, userSubs)}>View Menu</button>
      <button>Locate</button>
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
  )
};

export default MerchantProfile;