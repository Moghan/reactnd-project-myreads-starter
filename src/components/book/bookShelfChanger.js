import React from 'react'

const BookShelfChanger = ({ shelf, handleOnChange }) => {
  return (
    <div className="book-shelf-changer">
      <select onChange={ (e) => handleOnChange(e.target.value) } value={ shelf }>
        <option value="unknown" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

export default BookShelfChanger