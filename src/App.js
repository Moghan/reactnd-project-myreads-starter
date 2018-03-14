import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Shelf from './components/shelf'
import Search from './components/search'
import './App.css'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {  
  constructor(props) {
    super(props);

    this.state = {
      myBookList: [],
      searchResults: []
    }
  }


  searchMyBooklist (book) {
    for (const b of this.state.myBookList) {
      if (b.id === book.id) {
        return b;
      }
    }
    return book;
  }

  handleSearch = (query) => {
    if(query === "") {
      this.setState((prev) => ({ searchResults: [] }));
    }
    else {
      BooksAPI.search(query).then((books) => {
        let combinedList = false;
        if(!books.error) {
          combinedList = books.map((book) => this.searchMyBooklist(book));

        }

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
        newBookList = [...newBookList, newBook]
      }
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