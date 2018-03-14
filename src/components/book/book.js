import React from 'react'
import BookShelfChanger from './bookShelfChanger'

export default class Book extends React.Component {

  handleOnChange = (value) => {
    this.props.handleShelfChange(this.props.book, value);
  }

  render() {
    const { book } = this.props;
    const imageUrl = 'url("'+book.imageLinks.smallThumbnail+'")';
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: imageUrl }}></div>
          <BookShelfChanger handleOnChange={this.handleOnChange} shelf={ book.shelf || "none"}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
};