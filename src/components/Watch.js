import React, { useState, useEffect } from "react"
import "./Watch.css"
import SearchBar from "./SearchBar"

const Watch = () => {
  const [animePopupStates, setAnimePopupStates] = useState({})
  const [planToWatchlist, setPlanToWatchlist] = useState(
    JSON.parse(localStorage.getItem("planToWatchlist")) || []
  )

  const onAddToPlanToWatch = (anime) => {
    setPlanToWatchlist((prevList) => {
      const newList = [...prevList, { ...anime, currentEpisode: 1 }]
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

  useEffect(() => {
    localStorage.setItem("planToWatchlist", JSON.stringify(planToWatchlist))
  }, [planToWatchlist])

  const openAnimePopup = (animeId) => {
    setAnimePopupStates((prevStates) => ({
      ...prevStates,
      [animeId]: true,
    }))
  }

  const closeAnimePopup = (animeId) => {
    setAnimePopupStates((prevStates) => ({
      ...prevStates,
      [animeId]: false,
    }))
  }

  function CalculatePercentage(currentEpisode, totalEpisodes) {
    if (
      typeof currentEpisode !== "number" ||
      typeof totalEpisodes !== "number"
    ) {
      return "Invalid episode numbers"
    }

    const percentage = (currentEpisode / totalEpisodes) * 100

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
                    alt={`Cover for ${anime.title}`}
                  ></img>
                </div>
                <div className="anime-info">
                  <div className="anime-title">{anime.title}</div>
                  <div className="Totalepisode">
                    Total Episodes: {anime.episodes}
                  </div>
                  <div className="CurrentEpisode">
                    Current Episode:{" "}
                    <input
                      className="CurrentEpisodeInput"
                      type="number"
                      value={anime.currentEpisode}
                      onChange={(e) =>
                        setPlanToWatchlist((prevList) =>
                          prevList.map((item) =>
                            item.mal_id === anime.mal_id
                              ? {
                                  ...item,
                                  currentEpisode: Number(e.target.value),
                                }
                              : item
                          )
                        )
                      }
                    />
                  </div>
                  <div>
                    {" "}
                    Percent Complete:{" "}
                    {CalculatePercentage(anime.currentEpisode, anime.episodes)}
                  </div>
                  <button
                    className="removeFromWatch"
                    onClick={() => onRemoveFromWatchlist(anime)}
                  >
                    Remove from Watchlist
                  </button>
                  <div>
                    <button
                      onClick={() => openAnimePopup(anime.mal_id)}
                      className="edit"
                    >
                      Edit
                    </button>

                    {animePopupStates[anime.mal_id] && (
                      <div className="PopUp" id="popup">
                        <h3 className="PopUpEpisode">
                          Current Episode: {anime.currentEpisode}
                        </h3>
                        <button onClick={() => closeAnimePopup(anime.mal_id)}>
                          Close Popup
                        </button>
                      </div>
                    )}
                  </div>
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
