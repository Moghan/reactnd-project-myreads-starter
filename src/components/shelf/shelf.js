import React from 'react'
import Book from '../book'
import { withRouter } from 'react-router-dom'

const SearchButton = withRouter(({ history }) => (
  <div className="open-search">
    <a onClick={() => { history.push('/search') }}>Add a book</a>
  </div>
))

const Shelf = ({ booklist = [], handleShelfChange }) => {
  const shelfList = [
    {
      name: "currentlyReading",
      description: "Currently Reading"
    },
    {
      name: "wantToRead",
      description: "Want to Read"
    },
    {
      name: "read",
      description: "Read"
    }
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
        { shelfList.map(( shelf, index ) => (
          <div key={index} className="bookshelf">
            <h2 className="bookshelf-title">{shelf.description}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              { booklist.filter((b) => b.shelf === shelf.name).map((book, index) => (
                <li key={index}>
                  <Book book={book} handleShelfChange={handleShelfChange} />
                </li>
              ))}
              </ol>
            </div>
          </div>  
        ))}
        </div>
      </div>
      <SearchButton />
    </div>
  )
}

export default Shelf;