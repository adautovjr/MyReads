import React, { Component } from 'react';
import './App.css';
import Library from './pages/Library';
import Search from './pages/Search';
import * as BooksAPI from "./BooksAPI";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

class BooksApp extends Component {
    state = {
        query: "",
        books: []
    }

    loadMyBooks = async () => {
        const books = await BooksAPI.getAll();
        this.setState({ books });
    }

    updateBookShelf = async (details, shelf) => {
        const shelves = await BooksAPI.update(details, shelf);
        let books = this.state.books;

        books.map(book => {
            if (shelves["currentlyReading"].includes(book.id)) {
                book.shelf = "currentlyReading";
            } else if (shelves["read"].includes(book.id)) {
                book.shelf = "read";
            } else if (shelves["wantToRead"].includes(book.id)) {
                book.shelf = "wantToRead";
            } else {
                book.shelf = "none";
            }
            return false;
        });
        this.setState({ books });
    }

    updateQuery = async (query) => {
        this.setState({
            query
        });
        if (query.trim().length > 0) {
            const books = await BooksAPI.search(query.trim())
            const myBooks = await BooksAPI.getAll()

            if (Array.isArray(books)) {
                books.map(book => {
                    const bookIn = myBooks.find(myBook => myBook.id === book.id);
                    if (bookIn !== undefined) {
                        book.shelf = bookIn.shelf;
                        return true;
                    }
                    return false;
                })
            }
            this.setState({
                books: Array.isArray(books) ? books : []
            });
        } else {
            this.setState({ books: [] });
        }
    }

    render() {
        return (
            <div className="app">
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/">
                                <Library books={this.state.books} updateBookShelf={this.updateBookShelf} onLoad={this.loadMyBooks} />
                            </Route>
                            <Route path="/search">
                                <Search books={this.state.books} query={this.state.query} updateBookShelf={this.updateBookShelf} updateQuery={this.updateQuery} />
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default BooksApp
