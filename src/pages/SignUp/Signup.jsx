import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 6 characters long and contain at least one uppercase letter.');
      return;
    }
  
    try {
      await doCreateUserWithEmailAndPassword(email, password, name);
      navigate("/"); // Redirect to home page or any other page after successful signup
    } catch (error) {
      setError('Error signing up with email: ' + error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await doSignInWithGoogle();
      console.log('User signed up with Google');
      navigate("/"); // Redirect to home page or any other page after successful Google signup
    } catch (error) {
      setError('Error signing up with Google: ' + error.message);
    }
  };

  return (
    <div>
      <Link to={'/'}> Site logo </Link>
      <div className="signup-content">
        <h2>Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor='name'>Name:</label>
            <input type='text' id='name' value={name} onChange={handleName} required />
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
            { error && <p> {error} </p> }
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
