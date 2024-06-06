import { Link } from "react-router-dom"
import './Navbar.css'
import { useState } from "react"
function Navbar() {
  const [ isOpen , setIsOpen ] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  return (
    <div className="site-header container" >
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
        <span  onClick={ ()=> handleClick() } >Pages 🔽</span>
        {
          isOpen &&
           <div className="hidden-links"> 
           <Link to={'/service'} onClick={handleLinkClick}>Service</Link>
              <Link to={'/portfolio'} onClick={handleLinkClick}>Portfolio</Link>
              <Link to={'/team'} onClick={handleLinkClick}>Team</Link>
           </div>
        }
      </li>
      <li className="header-item">
        <Link to="shop">Shop</Link>
      </li>
      <li className="header-item">
        <Link to="news">News</Link>
      </li>
    </ul>


    <div className="user">
      <button>User</button>
    </div>
    </div>
  )
}

export default Navbar