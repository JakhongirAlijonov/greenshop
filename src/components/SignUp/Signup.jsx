import  { useState } from 'react';
import PropTypes from 'prop-types';
import { auth, googleProvider } from '../../firebase/Config';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import './Signup.css';

function Signup({ setIsSignUpOpen, isSignUpOpen }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClose = () => {
    setIsSignUpOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up with email:', email);
    } catch (error) {
      console.error('Error signing up with email:', error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('User signed up with Google');
    } catch (error) {
      console.error('Error signing up with Google:', error);
    }
  };

  return (
    <div className={`signup-modal ${isSignUpOpen ? 'open' : ''}`}>
      <div className="signup-content">
        <span className="close" onClick={handleClose}>X</span>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <button className="google-signup" onClick={handleGoogleSignUp}>
          Sign Up with Google
        </button>
      </div>
    </div>
  );
}

Signup.propTypes = {
  setIsSignUpOpen: PropTypes.func.isRequired,
  isSignUpOpen: PropTypes.bool.isRequired,
};

export default Signup;
