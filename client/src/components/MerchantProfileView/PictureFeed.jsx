import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components'


// const PictureFeedTxt = styled.div`
// font-family: 'Ubuntu';
// text-align: center;
// `

const PictureFeed = ({ merchant }) => {
  const [ imageIds, setImageIds ] = useState();
  const { t } = useTranslation()

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
      <div>{t("pictureFeedTxt")}</div>
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