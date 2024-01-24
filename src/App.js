// App.js
import React from "react"
import "./App.css"
import HomeScreen from "./components/HomeScreen"
import Watch from "./components/Watch"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  const [planToWatchlist, setPlanToWatchlist] = React.useState([])

  const addToPlanToWatch = (anime) => {
    setPlanToWatchlist((prevList) => {
      const newList = [...prevList, anime]
      console.log("Plan to Watchlist after adding:", newList)
      return newList
    })
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route
          path="/watchlist"
          element={<Watch planToWatchlist={planToWatchlist} />}
        />
      </Routes>
      <Navbar onAddToPlanToWatch={addToPlanToWatch} />
    </Router>
  )
}

export default App
