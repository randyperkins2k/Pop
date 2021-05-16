import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { useTranslation } from 'react-i18next'
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Picture from './Picture.jsx';
import Confirmation from '.././Confirmation.jsx'
//import { Container, Row, Col } from 'react-bootstrap'


// const PictureFeedTxt = styled.div`
// font-family: 'Ubuntu';
// text-align: center;
// `
const PictureFeedTxt = styled.div`
font-family: 'Ubuntu';
text-align: center;
`
const Feed = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: auto;
`

const Imagee = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`

const Pic = styled.div`
  display: block;
  //position: relative;
  width: 33%;
  color: #fff;
  cursor: pointer;
  padding-block: 1px;
  padding-top: 1px;
  padding-left: 1px;
  height: 33vw;
  &:hover {
    /* display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); */
  }
`


const PictureFeed = ({ merchant, setSelectedImage, setBigPic, uploadPicWindow, selectedImage }) => {
  const [ imageIds, setImageIds ] = useState();
  const [ pictureUp, setPictureUp ] = useState(false);
  const [ deletePicBool, setDeletePicBool ] = useState(false);
  const { t } = useTranslation()

  const picDelete = async (image) => {
    try {
      await axios.delete(`/api/images/delete`, { data: {url: image}})
      //await loadImages();
    } catch(err) {
      console.log('front pic delete error', err)
    }
  }

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
      {
        ( uploadPicWindow && deletePicBool ) ?
          <Confirmation
            text={'do you want to delete this picture?'}
            yesContext={() => picDelete(selectedImage)}
            noContext={() =>setDeletePicBool(false)}
          /> :
          ''
      }
      <Feed>
      {
        imageIds ?
        imageIds.map((image, index) => {
          return (
            <Pic>
              {
                uploadPicWindow && !deletePicBool ?
                <button
                  style={{
                    right:'-39px',
                    top: '35px',
                    position: 'relative',
                  }}
                  onClick={() => {
                    setDeletePicBool(true)
                    setSelectedImage(image.image)
                  }}
                >X</button> :
                ''
              }
              <Imagee onClick={() => {
                setSelectedImage(image.image)
                setBigPic(true)
                }} src={image.image} ></Imagee>
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