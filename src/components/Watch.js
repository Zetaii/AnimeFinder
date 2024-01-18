// Watch.js
import React, { useState } from "react"
import "./Watch.css"
import SearchBar from "./SearchBar"

const Watch = () => {
  const [planToWatchlist, setPlanToWatchlist] = useState([])

  const addToPlanToWatch = (anime) => {
    setPlanToWatchlist([...planToWatchlist, anime])
  }

  return (
    <>
      {/* Other components */}
      <SearchBar onAddToWatchlist={addToPlanToWatch} />
      {/* Render the existing Watch component */}
      <div className="watch-container">
        <div className="planToWatch">
          <h1>Plan to Watch</h1>
          {planToWatchlist.map((anime, index) => (
            <li key={`${anime.mal_id}-${index}`}>{anime.title}</li>
          ))}
        </div>
      </div>
    </>
  )
}

export default Watch
