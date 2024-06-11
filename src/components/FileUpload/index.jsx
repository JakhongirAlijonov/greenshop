import { useEffect, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth } from '../../firebase/Config'; // adjust the import path as necessary
import { updateProfile } from 'firebase/auth';

function FileUploader() {
  const [imageUrl, setImageUrl] = useState('');
  const storage = getStorage();
  useEffect(() => {
    if (auth.currentUser && auth.currentUser.photoURL) {
      setImageUrl(auth.currentUser.photoURL);
    }
  }, []);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `user_images/${auth.currentUser.uid}/${file.name}`);
        await uploadBytes(storageRef, file);

        const url = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser, { photoURL: url });
        setImageUrl(url);

        console.log('File uploaded successfully:', url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div className="file-uploader">
      {imageUrl && <img src={imageUrl} alt="User" style={{ width: '250px', borderRadius: '50%' }} />}
      <input
        type="file"
        id="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="file" className="custom-file-upload">
        Change Photo
      </label>
    </div>
  );
}

export default FileUploader;
