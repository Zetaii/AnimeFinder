// SearchBar.js
import React, { useState, useEffect, useRef } from "react"
import "./SearchBar.css"

const SearchBar = ({ onAddToWatchlist }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [timeoutId, setTimeoutId] = useState(null)
  const inputRef = useRef(null)

  const handleInputChange = (e) => {
    const input = e.target.value
    setSearchTerm(input)
  }

  useEffect(() => {
    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // Set a new timeout for 500 milliseconds
    const newTimeoutId = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${searchTerm}`
        )
        const data = await response.json()

        // Assuming the data structure has a property like `data` containing the search results
        const animeResults = data?.data || []

        // Display only the first 5 suggestions
        setSuggestions(animeResults.slice(0, 5))
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }, 500)

    // Save the timeout ID for cleanup in the next effect
    setTimeoutId(newTimeoutId)

    // Cleanup: Clear the timeout on component unmount
    return () => clearTimeout(newTimeoutId)
  }, [searchTerm])

  const handleAddToWatchlist = (anime) => {
    // Ensure onAddToWatchlist is a function before calling it
    if (typeof onAddToWatchlist === "function") {
      console.log("Adding anime to watchlist:", anime)
      onAddToWatchlist(anime)
      setSearchTerm("")
      setSuggestions([])
    } else {
      console.error("onAddToWatchlist is not a function")
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title)
    setSuggestions([])
  }

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      // Clicked outside the input, hide suggestions
      setSuggestions([])
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <div className="search-bar" ref={inputRef}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        list="animeSuggestions"
      />

      {suggestions?.length > 0 && (
        <ul>
          {suggestions.map((anime) => (
            <li key={anime.mal_id} onClick={() => handleSuggestionClick(anime)}>
              {anime.titles?.find((title) => title.type === "Default")?.title ||
                "Untitled"}
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleAddToWatchlist(anime)
                }}
              >
                Add to Watchlist
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
