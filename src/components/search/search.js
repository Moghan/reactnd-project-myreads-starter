import React from 'react'
import { withRouter } from 'react-router-dom'

import Book from '../book'

const book3 = {
  title: "The Hobbit",
  authors: "J.R.R. Tolkien",
  status: 'wantToRead',
  coverUrl: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")'
}

const SearchBar = withRouter(({ history , handleSearch }) => {
  const handleCloseSearch = () => {
    handleSearch("");
    history.push('/');
  };

  return (
    <div className="search-books-bar">
      <a className="close-search" onClick={ handleCloseSearch }>Close</a>
      <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(event) => { handleSearch(event.target.value) }} />

          </div>
    </div>
  )}
)

const Search = ({ booklist = [], handleSearch }) => {
  console.log("search");
  console.log(booklist);
  return (
    <div className="search-books">
      <SearchBar handleSearch={handleSearch} />
      <div className="search-books-results">
        <ol className="books-grid">
        { booklist.map((book, index) => (
          <Book key={index} book={book} />
        ))}
        </ol>
      </div>
    </div>
  )
}

export default Search;
/*
render={() => (
<div className="search-books-bar">
        <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
        <div className="search-books-input-wrapper">
          {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
          *//*}
          <input type="text" placeholder="Search by title or author"/>

        </div>
      </div>
      
  

          )}
*/