// Navbar.js
import React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

const Navbar = ({ onAddToPlanToWatch, onRemoveFromWatchlist }) => {
  return (
    <nav className="nav nav-black">
      <div className="nav-contents">
        <img
          className="nav-logo"
          src="https://miro.medium.com/v2/resize:fit:512/1*rVsARPbW6bxYI7o82rtPWQ.png"
          alt="Logo"
        />

        <div className="nav-links">
          <Link to="/" className="watchlist">
            Home
          </Link>
          <Link to="/watchlist" className="watchlist">
            Watchlist
          </Link>
          <Link to="/watched" className="watchlist">
            Finished
          </Link>
          <Link to="/contact" className="watchlist">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
