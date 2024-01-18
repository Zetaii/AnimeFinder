import React, { useEffect, useState } from "react"
import "./Banner.css"
import axios from "./axios"
import requests from "./requests"

const Banner = () => {
  const [anime, setAnime] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchTopRated)
        console.log("API Response:", request.data)

        // Ensure there are results before setting the state
        if (request.data.data && request.data.data.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * request.data.data.length
          )

          // Use a callback function with setAnime to ensure the correct state is captured
          setAnime((prevAnime) => {
            console.log("Previous anime state:", prevAnime)
            console.log("Setting anime state:", request.data.data[randomIndex])
            return request.data.data[randomIndex]
          })
        }

        return request
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    console.log("Updated anime state:", anime)
  }, [anime])

  return (
    <header className="banner">
      <div className="banner-contents">
        <h1 className="banner-title">{anime.title}</h1>
        <div className="banner-description-buttons">
          <div className="banner-buttons">
            <button className="banner-button">Play</button>
            <button className="banner-button">My List</button>
          </div>
          <h1 className="banner-description">{anime.synopsis}</h1>
        </div>
        <div
          className="banner-image"
          style={{
            backgroundSize: "cover",
            backgroundImage:
              anime.images && anime.images.jpg
                ? `url("${anime.images.jpg.image_url}")`
                : "", // Set a default value or an empty string if anime.images or anime.images.webp is undefined
            backgroundPosition: "center center",
          }}
        >
          {" "}
        </div>
      </div>
      <div className="banner-fadeBottom"></div>
    </header>
  )
}

export default Banner
