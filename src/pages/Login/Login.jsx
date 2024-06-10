import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/index";
import { useState } from "react";
import {
  doSignInUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
import './Login.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
function Login() {
  const userLoggedIn = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState(null);
  const showErrors = (err) => {

    setError(err);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  const submitEmail = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try{
        await doSignInUserWithEmailAndPassword(email, password);
        setIsSigningIn(false);
      } catch (error){
        if(error.message.includes('invalid-credential')){
          showErrors("Login yoki parol xato!")
        }else if( error.message.includes("missing-password") ){

          showErrors("Password does not provided !")
          }
        showErrors("Login yoki parol xato!")
      setIsSigningIn(false);

      
      }
    }
  };
  const googleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
      setIsSigningIn(false);
      } catch (error) {
        setError("Error occured while logging with google. Please try again.")
      }
    }
  };
  return (
    <div className="login-wrapper">
    <Link to={'/'}> <img src="./public/logo.svg" alt="site logo" /> </Link>
    <div className="login-greet">Welcome back mate !</div>
      {userLoggedIn.userLoggedIn && <Navigate to={"/"} replace={true} />}
      <form onSubmit={(e) => submitEmail(e)}>

        <input
          type="email"
          placeholder="Email..."
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error"> {error} </p>}
        <button>Sign in</button>
      </form>
      <Link className='to-signin' to='/signup'>Don&apos;t have an account ? Sign up here. </Link>
        <p className="sug">or use your account in:</p>
        <button className="google-signup" onClick={(e) => googleSignIn(e)}>
          <FontAwesomeIcon icon={faGoogle}  />
        </button>

      
    </div>
  );
}

export default Login;
