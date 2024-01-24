import React, { useState, useEffect } from "react"
import "./Watch.css"
import SearchBar from "./SearchBar"

const Watch = () => {
  // Load the initial state from local storage or use an empty array

  const initialPlanToWatchlist =
    JSON.parse(localStorage.getItem("planToWatchlist")) || []
  const [planToWatchlist, setPlanToWatchlist] = useState(initialPlanToWatchlist)

  const onAddToPlanToWatch = (anime) => {
    setPlanToWatchlist((prevList) => {
      const newList = [...prevList, anime]
      console.log("Plan to Watchlist after adding:", newList)
      return newList
    })
  }

  const onRemoveFromWatchlist = (anime) => {
    setPlanToWatchlist((prevList) => {
      const newList = prevList.filter((item) => item.mal_id !== anime.mal_id)
      console.log("Plan to Watchlist after removing:", newList)
      return newList
    })
  }

  // Update local storage whenever planToWatchlist changes
  useEffect(() => {
    localStorage.setItem("planToWatchlist", JSON.stringify(planToWatchlist))
  }, [planToWatchlist])

  function CalculatePercentage(currentEpisode, totalEpisodes) {
    // Ensure that both currentEpisode and totalEpisodes are valid numbers
    if (
      typeof currentEpisode !== "number" ||
      typeof totalEpisodes !== "number"
    ) {
      return "Invalid episode numbers"
    }

    // Calculate the percentage completion
    const percentage = (currentEpisode / totalEpisodes) * 100

    // Round the percentage to two decimal places
    const roundedPercentage = Math.round(percentage * 100) / 100

    return roundedPercentage + "%"
  }

  return (
    <>
      <div className="watch-container">
        <div className="planToWatch">
          <h1 className="containerTitle">Plan to Watch</h1>
          <ul className="animeListContainer">
            {planToWatchlist.map((anime) => (
              <li className="animeList" key={anime.mal_id}>
                <div className="animeImageContainer">
                  <img
                    className="animeImage"
                    src={anime.images.webp.image_url}
                  ></img>
                </div>
                <div className="anime-info">
                  <div className="anime-title">{anime.title}</div>
                  <div className="Totalepisode">
                    Total Episodes: {anime.episodes}
                  </div>
                  <div className="currentEpisode">
                    Current Episode: <div className="episodeNumber">1</div>
                  </div>
                  <div>
                    {" "}
                    Percent Complete: {CalculatePercentage(1, anime.episodes)}
                  </div>
                  <button
                    className="removeFromWatch"
                    onClick={() => onRemoveFromWatchlist(anime)}
                  >
                    Remove from Watchlist
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="searchBar">
          <SearchBar onAddToPlanToWatch={onAddToPlanToWatch} />
        </div>
      </div>
    </>
  )
}

export default Watch
