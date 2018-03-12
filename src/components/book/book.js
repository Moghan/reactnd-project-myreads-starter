import React from 'react'

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.book.status
    }
  }

  handleOnChange = () => {
    console.log(this.state.status);
  }

  render() {
    const { add, book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: book.coverUrl }}></div>
          <div className="book-shelf-changer">
            <select onChange={ this.handleOnChange } value={this.state.value}>
              <option value="none" disabled>Move to...</option>
              <option className="selected" value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
        <div onClick={ () => add(book) }>Add book</div>
      </div>
    )
  }
};