import React, { useState, useEffect, useRef } from "react"
import "./SearchBar.css"

const SearchBar = ({ onAddToPlanToWatch }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [timeoutId, setTimeoutId] = useState(null)
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${searchTerm}`
        )
        const data = await response.json()
        const animeResults = data?.data || []
        setSuggestions(animeResults.slice(0, 5))
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    if (searchTerm.trim() !== "") {
      const newTimeoutId = setTimeout(fetchData, 500)
      setTimeoutId(newTimeoutId)

      return () => clearTimeout(newTimeoutId)
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title)
    setSuggestions([])
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleAddToPlanToWatch = (anime) => {
    if (typeof onAddToPlanToWatch === "function") {
      onAddToPlanToWatch(anime)
      setSearchTerm("")
      setSuggestions([])
    } else {
      console.error("onAddToPlanToWatch is not a function")
    }
  }

  return (
    <div className="search-bar" ref={inputRef}>
      <input
        type="text"
        placeholder="Search for an anime..."
        value={searchTerm}
        onChange={handleInputChange}
        list="animeSuggestions"
      />

      {suggestions?.length > 0 && (
        <ul className="searchBarListContainer">
          {suggestions.map((anime) => (
            <li
              className="searchBarList"
              key={anime.mal_id}
              onClick={() => handleSuggestionClick(anime)}
            >
              <div className="listTitle">
                {anime.titles?.find((title) => title.type === "Default")
                  ?.title || "Untitled"}
              </div>
              <button
                className="addToWatch"
                onClick={(e) => {
                  e.preventDefault()
                  handleAddToPlanToWatch(anime)
                }}
              >
                Add to Plan to Watch
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
