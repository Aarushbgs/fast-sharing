import React, { useState } from 'react';
import { storage } from '../Firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import './upload.css'; 

const Upload = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [downloadURL, setDownloadURL] = useState('');
  const [progress, setProgress] = useState(0);

  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileRef = ref(storage, `file/${fileUpload.name}`);
    const uploadTask = uploadBytesResumable(fileRef, fileUpload);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.error('Error uploading file:', error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          console.log('Download URL:', url);
        }).catch((error) => {
          console.error('Error getting download URL:', error);
        });
      }
    );
  };

  return (
    <div className='App'>
      <p className='heading'>Share big files blazing fast 🎉</p>
      <input 
        type="file"
        id="file-upload"
        onChange={(event) => { setFileUpload(event.target.files[0]); }}
      />
      <label htmlFor="file-upload" className="label">Choose File</label>
      <button onClick={uploadFile} className="button">Upload File</button>
      {progress > 0 && progress < 100 && (
        <div className="progress-container">
          <p>Upload progress: {Math.round(progress)}%</p>
          <progress value={progress} max="100" />
        </div>
      )}
      {downloadURL && (
        <div>
          <p>File uploaded successfully. Download URL:</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer" className="download-link">{downloadURL}</a>
        </div>
      )}
    </div>
  );
}

export default Upload;
