import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Shelf from './components/shelf'
import Search from './components/search'
import './App.css'
import * as BooksAPI from './BooksAPI'

/*
const book2 = {
  title: "1776",
  authors: "David McCullough",
  shelf: 'read',
  imageLinks: {
    smallThumbnail: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
  }
}

const book4 = {
  title: "1776",
  authors: "David McCullough",
  shelf: 'currentlyReading',
  imageLinks: {
    smallThumbnail: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
  }
}

const book3 = {
  title: "The Hobbit",
  authors: "J.R.R. Tolkien",
  shelf: 'wantToRead',
  imageLinks: {
    smallThumbnail: "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api"
  }
}
*/


class BooksApp extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      myBookList: [],
      searchResults: []
    }
  }

  searchMyBooklist (book) {
    //console.log(book.title);
    for (const b of this.state.myBookList) {
      //console.log('--' + b.title);      
      if (b.id === book.id) {
        console.log("match");
        //console.log(b.title);
        return b;
      }
    }
    return book;
  }

 /* handleSearch = (query) => {
    if(query === "") {
      this.setState((prev) => ({ searchResults: [] }));
    }
    else {
      BooksAPI.search(query).then((books) => {
        this.setState({searchResults: !books.error ? books : [] })
      });
    }
  }// this.setState({searchResults: !books.error ? books : [] })
  */

  handleSearch = (query) => {
    if(query === "") {
      this.setState((prev) => ({ searchResults: [] }));
    }
    else {
      BooksAPI.search(query).then((books) => {
        //console.log("xxxxxx");
        //console.log(books);
        //console.log("oooooo");
        let combinedList = false;
        if(!books.error) {
          combinedList = books.map((book) => this.searchMyBooklist(book));

        }
        //console.log("combinedList");
        //console.log(combinedList);

        this.setState({searchResults: combinedList ? combinedList : [] })
      });
    }
  }


  updateList(list, book) {
    return (
      list.map((b) => {
        if(b.id !== book.id) return b;
        else {
          return book;
        }
      })
    );
  }


  handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf);
    const newBook = { ...book, shelf: shelf }
    this.setState((prevState, props) => {
      let newBookList = prevState.myBookList.filter((b) => b.id !== book.id );
      if(shelf !== "none") {
        //const newBook = { ...book, shelf: shelf }
        newBookList = [...newBookList, newBook]
      }
      console.log("prevState");
      console.log(prevState);
      return {
        myBookList: [...newBookList],
        searchResults: prevState.searchResults ? this.updateList(prevState.searchResults, newBook) : []
      };
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({myBookList: !books.error ? books : [] });
    }); 
  }

  render() {
    //console.log(`render booklist ${this.state.myBookList}`)
    return (
      <BrowserRouter>
        <div className="app">
          <Route exact path="/search" render={ () => (
            <Search booklist={this.state.searchResults} handleSearch={this.handleSearch} handleShelfChange={this.handleShelfChange} />
          ) } />
          <Route exact path="/" render={() => (
            <Shelf booklist={this.state.myBookList} handleShelfChange={this.handleShelfChange}/>
          )} />
        </div>
      </BrowserRouter>
    )
  }
}

export default BooksApp
