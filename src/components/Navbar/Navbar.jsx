import { Link } from "react-router-dom";
import './Navbar.css';
import { useState } from "react";
import { useAuth } from "../../contexts/authContext/index"; // Adjust the import path as necessary
import { faChevronDown , faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Navbar() {
  const { currentUser, userLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
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
          <span onClick={handleClick}>Pages <FontAwesomeIcon icon={faChevronDown} /> </span>
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
         <Link to={'/profile'} className="prof-link" > 

          { currentUser.photoURL ? <img src={currentUser.photoURL} alt="user photo" className="nav-user-img" /> : <FontAwesomeIcon icon={faUser} />  }

         {currentUser.displayName || currentUser.email}</Link>
         
         </div>
        ) : (
          <>
            <Link to={'/signin'} className="signin">Sign in</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
