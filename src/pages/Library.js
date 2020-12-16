import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BookShelf from "../components/BookShelf"

class Library extends Component {

    componentDidMount() {
        this.props.onLoad();
    }

    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf onChangeFunction={this.props.updateBookShelf} books={this.props.books.filter(book => book.shelf === "currentlyReading")} title="Currently Reading" />
                    <BookShelf onChangeFunction={this.props.updateBookShelf} books={this.props.books.filter(book => book.shelf === "wantToRead")} title="Want to Read" />
                    <BookShelf onChangeFunction={this.props.updateBookShelf} books={this.props.books.filter(book => book.shelf === "read")} title="Read" />
                </div>
                <div className="open-search">
                    <Link to="/search">
                        <button>Add a book</button>
                    </Link >
                </div>
            </div>
        );
    }
}

export default Library;