import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Shelf from './components/shelf'
import Search from './components/search'
import * as BooksAPI from './BooksAPI'
import './App.css'

const book = {
  title: "To Kill a Mockingbird",
  authors: "Harper Lee",
  status: 'currentlyReading',
  coverUrl: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'
}

const book2 = {
  title: "1776",
  authors: "David McCullough",
  status: 'read',
  coverUrl: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")'
}

const book3 = {
  title: "The Hobbit",
  authors: "J.R.R. Tolkien",
  status: 'wantToRead',
  coverUrl: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")'
}

class BooksApp extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      myBookList: [book, book2, book3]
    }
  }

  addBook = (book) => {
    console.log(book);
    this.setState((prevState, props) => {
      return {
        myBookList: [...prevState.myBookList, book]
      };
    })
  }

  componentDidUpdate() {
    console.log(this.state.myBookList);
  }
  

  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/search" render={ Search } />
          <Route exact path="/" render={() => (
            <Shelf book={book} booklist={this.state.myBookList} addBook={this.addBook}/>
          )} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
