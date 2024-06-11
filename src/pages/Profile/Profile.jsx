import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import './Profile.css'
import FileUploader from "../../components/FileUpload";

function Profile() {
    const navigate  = useNavigate()
    const { currentUser } = useAuth();
   

  console.log(currentUser);
  return (
    <div className="">
    <div className="profile-wrapper">
    <div className="file-uploader">
    <FileUploader/>
    </div>
   <div className="profile-details">
   <h2>Name: {currentUser.displayName || currentUser.email} </h2>
   <p>Email: {currentUser.email} </p>
   <button className="logout" onClick={()=> doSignOut().then(()=> {navigate('/') }) } >Log out</button>
   </div>

    </div>
    
    </div>
  )
}

export default Profile