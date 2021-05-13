import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Picture from './Picture.jsx';
//import { Container, Row, Col } from 'react-bootstrap'


const PictureFeedTxt = styled.div`
font-family: 'Ubuntu';
text-align: center;
`
const Feed = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: auto;
`

const Pic = styled.div`
  display: block;
  //position: relative;
  width: 33%;
  color: #fff;
  cursor: pointer;
  padding-block: 1px;
` 


const PictureFeed = ({ merchant }) => {
  const [ imageIds, setImageIds ] = useState();
  const [ pictureUp, setPictureUp ] = useState(false);
  const { t } = useTranslation()

  const loadImages = async () => {
    try {
      const res = await axios.get(`/api/images/getimages/${merchant.id}`);
      const data = await res.data;
      setImageIds(data.reverse());
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    loadImages();
  }, [])

  return (
    <div>
      <Feed>
      {
        imageIds ? 
        imageIds.map((image, index) => {
          return (
            <Pic>
              <Image
                key={index}
                cloudName="opsparkpopup"
                publicId={image.image}
                width="117"
                crop="scale"
              >
                <Transformation height="90" width="90" crop="fill"/>
              </Image>
            </Pic> 
          )
        })
        :
        ''
      }
      </Feed>
    </div>
  )
}

export default PictureFeed;