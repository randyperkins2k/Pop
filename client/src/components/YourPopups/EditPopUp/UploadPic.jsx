import axios from 'axios';
import React, { useState } from 'react';

const UploadPic = ({ merchant }) => {
  const [ fileInputState, setFileInputState ] = useState('');
  const [ selectedFile, setSelectedFile ] = useState('');
  const [ previewSource, setPreviewSource ] = useState('');
  
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result)
    }
  }

  const handleSubmitFile = (e) => {
    console.log('submitting')
    e.preventDefault();
    if (!previewSource) {
      return
    }
    // const reader = new FileReader();
    // reader.readAsDataURL(selectedFile);
    uploadImage(previewSource);
  }

  const uploadImage = async (base64EncodedImage) => {
    try {
      const response = await axios.post(`/api/images/upload/${merchant.id}`, {image: base64EncodedImage})
      console.log(response.data)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmitFile}>
        <input
          type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="form-input"
        ></input>
        <button className="btn" type="submit">Upload</button>
      </form>
      {
        previewSource ?
        <div>
          <h3>image should preview</h3>
          <img src={previewSource} alt="chosen" style={{ height: "300px"}}/>
        </div>
        :
        ''  
      }
    </div>
  )
}

export default UploadPic;