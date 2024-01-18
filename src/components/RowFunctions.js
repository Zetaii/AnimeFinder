// RowFunctions.js
import { useEffect, useState } from "react"
import axios from "./axios"
import requests from "./requests"

const useRowFunctions = () => {
  const [firstAnime, setFirstAnime] = useState({})
  const [secondAnime, setSecondAnime] = useState({})
  const [animeList, setAnimeList] = useState([])
  const [toWatchList, setToWatchList] = useState(() => {
    const storedList = localStorage.getItem("toWatchList")
    return storedList ? JSON.parse(storedList) : []
  })

  useEffect(() => {
    const rowPosters = document.getElementById("rowPosters")

    let isMouseDown = false
    let startX
    let scrollLeft

    const handleMouseDown = (e) => {
      isMouseDown = true
      startX = e.pageX - rowPosters.offsetLeft
      scrollLeft = rowPosters.scrollLeft
    }

    const handleMouseLeave = () => {
      isMouseDown = false
    }

    const handleMouseUp = () => {
      isMouseDown = false
    }

    const handleMouseMove = (e) => {
      if (!isMouseDown) return
      e.preventDefault()

      const x = e.pageX - rowPosters.offsetLeft
      const walk = (x - startX) * 2

      rowPosters.scrollLeft = scrollLeft - walk
    }

    rowPosters.addEventListener("mousedown", handleMouseDown)
    rowPosters.addEventListener("mouseleave", handleMouseLeave)
    rowPosters.addEventListener("mouseup", handleMouseUp)
    rowPosters.addEventListener("mousemove", handleMouseMove)

    return () => {
      rowPosters.removeEventListener("mousedown", handleMouseDown)
      rowPosters.removeEventListener("mouseleave", handleMouseLeave)
      rowPosters.removeEventListener("mouseup", handleMouseUp)
      rowPosters.removeEventListener("mousemove", handleMouseMove)
    }
  }, []) // Empty dependency array ensures the effect runs once during component mount

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requests.fetchTrending)

        if (response.data.data && response.data.data.length > 1) {
          const firstRandomIndex = Math.floor(
            Math.random() * response.data.data.length
          )
          let secondRandomIndex

          do {
            secondRandomIndex = Math.floor(
              Math.random() * response.data.data.length
            )
          } while (secondRandomIndex === firstRandomIndex)

          setFirstAnime(response.data.data[firstRandomIndex])
          setSecondAnime(response.data.data[secondRandomIndex])
          setAnimeList(response.data.data)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, []) // Empty dependency array ensures the effect runs once during component mount

  const handleAddToWatchList = (anime) => {
    if (!toWatchList.some((item) => item.mal_id === anime.mal_id)) {
      setToWatchList((prevList) => {
        const newList = [...prevList, anime]
        localStorage.setItem("toWatchList", JSON.stringify(newList))
        return newList
      })
    }
  }

  const handleRemoveFromWatchList = (anime) => {
    setToWatchList((prevList) => {
      const newList = prevList.filter((item) => item.mal_id !== anime.mal_id)
      localStorage.setItem("toWatchList", JSON.stringify(newList))
      return newList
    })
  }

  return {
    firstAnime,
    secondAnime,
    animeList,
    toWatchList,
    handleAddToWatchList,
    handleRemoveFromWatchList,
  }
}

export default useRowFunctions
