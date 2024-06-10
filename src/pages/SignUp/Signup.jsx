import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from '../../firebase/auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const showErrors = (err) => {
    setError(err);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

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
      showErrors('Password must be at least 6 characters long and contain at least one uppercase letter.');
      return;
    }

    try {
      await doCreateUserWithEmailAndPassword(email, password, name);
      navigate('/'); // Redirect to home page or any other page after successful signup
    } catch (error) {
      if (error.message.includes('already-in-use')) {
        showErrors("Bu email avval ro'yxatdan o'tgan");
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await doSignInWithGoogle();
      console.log('User signed up with Google');
      navigate('/'); // Redirect to home page or any other page after successful Google signup
    } catch (error) {
      showErrors('Error while signing in with Google. Please try again!');
    }
  };

  return (
    <div>
      <div className="signup-content">
      <Link to={'/'}> <img src="./public/logo.svg" alt="site logo" /> </Link>
        <h2>Sign up to use cool features !</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" value={name} onChange={handleName} required />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" value={email} onChange={handleEmailChange} required />
          </div>
          <div className="form-group password-wrapper">
            <label htmlFor="password">Password:</label>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <FontAwesomeIcon
              icon={isPasswordVisible ? faEyeSlash : faEye}
              className="eye-icon"
              onClick={togglePasswordVisibility}
            />
            <ul className="pas-suggest">
              <li>At least 1 uppercase</li>
              <li>At least 1 number</li>
              <li>At least 6 characters</li>
            </ul>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <Link className='to-signin' to='/signin'>Already have an account ? Sign in here. </Link>
        <p className="sug">or use your account in:</p>
        <button className="google-signup" onClick={handleGoogleSignUp}>
          <FontAwesomeIcon icon={faGoogle}  />
        </button>
      </div>
    </div>
  );
}

export default Signup;
