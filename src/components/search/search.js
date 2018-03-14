import React from 'react'
import { withRouter } from 'react-router-dom'

import Book from '../book'

const SearchBar = withRouter(({ history , handleSearch }) => {
  const handleCloseSearch = () => {
    handleSearch("");
    history.push('/');
  };

  return (
    <div className="search-books-bar">
      <a className="close-search" onClick={ handleCloseSearch }>Close</a>
      <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => { handleSearch(event.target.value) }}
            />
          </div>
    </div>
  )}
)

const Search = ({ booklist = [], handleSearch, handleShelfChange }) => {
  return (
    <div className="search-books">
      <SearchBar handleSearch={handleSearch} />
      <div className="search-books-results">
        <ol className="books-grid">
        { booklist.map((book, index) => (
          <Book key={index} book={book} handleShelfChange={handleShelfChange} />
        ))}
        </ol>
      </div>
    </div>
  )
}

export default Search;