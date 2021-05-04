import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';

const PictureFeed = ({ merchant }) => {
  const [ imageIds, setImageIds ] = useState();

  const loadImages = async () => {
    try {
      const res = await axios.get(`/api/images/getimages/${merchant.id}`);
      const data = await res.data;
      setImageIds(data);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadImages();
  }, [])

  return (
    <div>
      <h3>Picture Feed</h3>
      {
        imageIds ? 
        imageIds.map((image, index) => {
          return <Image
            key={index}
            cloudName="opsparkpopup"
            publicId={image.image}
            width="300"
            crop="scale"
          />
        })
        :
        ''
      }
    </div>
  )
}

export default PictureFeed;