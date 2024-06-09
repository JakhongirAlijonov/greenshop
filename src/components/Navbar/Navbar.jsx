import { Link, useNavigate } from "react-router-dom";
import './Navbar.css';
import { useState } from "react";
import { useAuth } from "../../contexts/authContext/index"; // Adjust the import path as necessary
import { doSignOut } from "../../firebase/auth";

function Navbar() {
  const { currentUser, userLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
const navigate  = useNavigate()
  const handleClick = () => {
    setIsOpen(true);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="site-header container">
      <Link to={'/'}>
        <img src="./public/logo.svg" alt="site logo" />
      </Link>
      <ul className="header-list">
        <li className="header-item">
          <Link to="/">Home</Link>
        </li>
        <li className="header-item">
          <Link to="about">About</Link>
        </li>
        <li className="header-item page-show">
          <span onClick={handleClick}>Pages 🔽</span>
          {isOpen && (
            <div className="hidden-links">
              <Link to={'/service'} onClick={handleLinkClick}>Service</Link>
              <Link to={'/portfolio'} onClick={handleLinkClick}>Portfolio</Link>
              <Link to={'/team'} onClick={handleLinkClick}>Team</Link>
            </div>
          )}
        </li>
        <li className="header-item">
          <Link to="shop">Shop</Link>
        </li>
        <li className="header-item">
          <Link to="news">News</Link>
        </li>
      </ul>

      <div className="user">
        {userLoggedIn ? (
         <div>
         <span>Welcome, {currentUser.displayName || currentUser.email}</span>
         <button onClick={()=> doSignOut().then(()=> {navigate('/') }) } >Log out</button>
         </div>
        ) : (
          <>
            <Link to={'/signup'}>Sign up</Link>
            <Link to={'/signin'}>Sign in</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
