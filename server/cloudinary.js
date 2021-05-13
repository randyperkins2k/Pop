const express = require('express');
const images = express.Router();
const cloudinary = require('cloudinary').v2;
const { Pictures } = require('./db.js');
require('dotenv').config();
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudAPI = process.env.CLOUDINARY_API_KEY;
const cloudSecret = process.env.CLOUDINARY_API_SECRET;
cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudAPI,
  api_secret: cloudSecret
})

images.post('/upload/:id', async (req, res) => {
  //console.log(req.body.image);
  const { id } = req.params;
  try {
    const fileStr = req.body.image;
    const uploadedResponse = await cloudinary.uploader.upload( fileStr, {
      upload_preset: 'pop_up'
    })
    //console.log(uploadedResponse);
    await Pictures.create({
      MerchantId: id,
      image: uploadedResponse.public_id
    })
    res.status(201). send('picture uploaded!');
  } catch(err) {
    console.log('this data error', err);
  }
});

console.log({
  cloud_name: cloudName,
  api_key: cloudAPI,
  api_secret: cloudSecret
})

images.get('/getimages/:id', async (req, res) => {
  // const { resources } = await cloudinary.search.expression('folder:pop_up')
  //   .sort_by('public_id', 'desc')
  //   .max_results(30)
  //   .execute();
  //   const publicIds = resources.map(file => file.public_id);
  //   res.send(publicIds);
const { id } = req.params;

try {
  const picData = await Pictures.findAll({where:{MerchantId: id}}); 
  res.status(200).send(picData)
} catch(err) {
  console.log(err)
}
});

module.exports = {
  images
}