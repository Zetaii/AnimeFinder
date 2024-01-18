// Row.js
import React from "react"
import useRowFunctions from "./RowFunctions"
import "./Row.css"

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const {
    firstAnime,
    secondAnime,
    animeList,
    handleAddToWatchList,
    handleRemoveFromWatchList,
  } = useRowFunctions()

  const firstImageUrl = firstAnime.images?.jpg?.image_url
  const secondImageUrl = secondAnime.images?.jpg?.image_url

  return (
    <>
      <div className="row">
        <div className="firstEntry">
          <h1 className="firstTitle">{firstAnime.title}</h1>
          {firstImageUrl && (
            <img
              className="row-image"
              src={firstImageUrl}
              alt={firstAnime.title}
            />
          )}
          <button onClick={() => handleAddToWatchList(firstAnime)}>
            Want to Watch
          </button>
          <p className="synopsis">{firstAnime.synopsis}</p>
        </div>
        <div className="secondEntry">
          <h1 className="secondTitle">{secondAnime.title}</h1>
          {secondImageUrl && (
            <img
              className="row-image"
              src={secondImageUrl}
              alt={secondAnime.title}
            />
          )}
          <button onClick={() => handleAddToWatchList(secondAnime)}>
            Want to Watch
          </button>
          <p className="synopsis">{secondAnime.synopsis}</p>
        </div>
      </div>

      <div className="row-posters" id="rowPosters">
        {animeList.map((anime) => (
          <div key={anime.mal_id} className="row-poster">
            <img
              className="poster-image"
              src={anime.images.webp.image_url}
              alt={anime.name}
            />
            <button className="add" onClick={() => handleAddToWatchList(anime)}>
              Add to List
            </button>
            <button
              className="remove"
              onClick={() => handleRemoveFromWatchList(anime)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default Row
