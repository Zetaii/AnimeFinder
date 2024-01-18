// Navbar.js
import React from "react"
import SearchBar from "./SearchBar" // Update the import path
import "./Navbar.css" // Correct import path
import { Link } from "react-router-dom"
import Watch from "./Watch" // Correct import path
import HomeScreen from "./HomeScreen" // Correct import path

const Navbar = ({ onAddToWatchlist }) => {
  return (
    <nav className="nav nav-black">
      <div className="nav-contents">
        <img
          className="nav-logo"
          src="https://miro.medium.com/v2/resize:fit:512/1*rVsARPbW6bxYI7o82rtPWQ.png"
          alt="Logo"
        />
        <SearchBar onAddToWatchlist={onAddToWatchlist} /> {/* Pass the prop */}
        <div className="nav-links">
          <Link to="/" className="watchlist">
            Home
          </Link>
          <Link to="/watchlist" className="watchlist">
            Watchlist
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
