import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";

function Profile() {
    const navigate  = useNavigate()
    const { currentUser } = useAuth();
  return (
    <div>
    <h2>Name: {currentUser.displayName} </h2>
    <p>Email: {currentUser.email} </p>

    <button onClick={()=> doSignOut().then(()=> {navigate('/') }) } >Log out</button>
    </div>
  )
}

export default Profile