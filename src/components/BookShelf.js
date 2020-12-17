import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';


const BookShelf = ({ books, title, onChangeFunction }) => (
    <div className="bookshelf">
        {
            books.length > 0 &&
            <div>
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {Array.isArray(books) && books.map(details => (
                            <Book onChangeFunction={onChangeFunction} details={details} key={details.id} />
                        ))}
                    </ol>
                </div>
            </div>
        }
        {
            books.length === 0 &&
            <div>
                <div className="bookshelf-books">
                    <h2 style={{ textAlign: "center" }}>Whoops! No books on this shelf...</h2>
                </div>
            </div>
        }
    </div>
);

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeFunction: PropTypes.func.isRequired
};

export default BookShelf;