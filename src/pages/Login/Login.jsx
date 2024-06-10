import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/index";
import { useState } from "react";
import {
  doSignInUserWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../firebase/auth";
function Login() {
  const userLoggedIn = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submitEmail = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInUserWithEmailAndPassword(email, password);
      setIsSigningIn(false);
    }
  };
  const googleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      await doSignInWithGoogle();
      setIsSigningIn(false);
    }
  };
  return (
    <div>
    <Link to={'/'}> <img src="./public/logo.svg" alt="site logo" /> </Link>
    <div className="login-greet">Welcome back mate !</div>
      {userLoggedIn.userLoggedIn && <Navigate to={"/"} replace={true} />}
      <form onSubmit={(e) => submitEmail(e)}>

        <input
          type="email"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Sign in</button>
      </form>

      <form onSubmit={(e) => googleSignIn(e)}>
        <button>Sign in with google</button>
      </form>
    </div>
  );
}

export default Login;
