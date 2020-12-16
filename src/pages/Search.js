import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BookShelf from '../components/BookShelf';

class Search extends Component {
    render() {
        const { query, books, updateBookShelf, updateQuery } = this.props;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={query} onChange={(event) => updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf onChangeFunction={updateBookShelf} books={books.filter(book => (book.shelf === "none" || book.shelf === undefined))} title="Search results" />
                    {
                        query.length > 0 && 
                        <div>
                            {books.filter(book => book.shelf === "currentlyReading").length > 0 &&
                                <BookShelf onChangeFunction={updateBookShelf} books={books.filter(book => book.shelf === "currentlyReading")} title="Currently Reading" />
                            }
                            {books.filter(book => book.shelf === "wantToRead").length > 0 &&
                                <BookShelf onChangeFunction={updateBookShelf} books={books.filter(book => book.shelf === "wantToRead")} title="Want to Read" />
                            }
                            {books.filter(book => book.shelf === "read").length > 0 &&
                                <BookShelf onChangeFunction={updateBookShelf} books={books.filter(book => book.shelf === "read")} title="Read" />
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Search;