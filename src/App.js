// App.js
import React from "react"
import "./App.css"
import HomeScreen from "./components/HomeScreen"
import Watch from "./components/Watch"
import Navbar from "./components/Navbar" // Correct import path
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/watchlist" element={<Watch />} />
      </Routes>
      <Navbar /> {/* Render the Navbar component */}
    </Router>
  )
}

export default App
