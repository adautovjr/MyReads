import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BookShelf from '../components/BookShelf';

class Search extends Component {
    render() {
        const { query, books, updateBookShelf, updateQuery } = this.props;
        const SHELVES = [
            {
                title: 'Currently Reading',
                id: 'currentlyReading'
            },
            {
                title: 'Want To Read',
                id: 'wantToRead'
            },
            {
                title: 'Read',
                id: 'read'
            }
        ];

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
                            {
                                SHELVES.map((shelf, id) => (
                                    <div key={id}>
                                        {books.some(book => book.shelf === shelf.id) &&
                                            <BookShelf onChangeFunction={updateBookShelf} books={books.filter(book => book.shelf === shelf.id)} title={shelf.title} />
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Search;