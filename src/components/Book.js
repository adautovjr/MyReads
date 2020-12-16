import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {

    handleSelect = (e) => {
        let { details, onChangeFunction } = this.props;

        onChangeFunction(details, e.currentTarget.value);
    }

    render() {
        let { details } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${details.imageLinks !== undefined ? details.imageLinks["thumbnail"] : "https://via.placeholder.com/128x193"})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={e => this.handleSelect(e)} value={details.shelf ? details.shelf : "none"}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{details.title}</div>
                {
                    Array.isArray(details.authors) &&
                    <div className="book-authors">
                        {details.authors.map((author, i) => `${author}${(i + 1) === details.authors.length ? "" : ", "}`)}
                    </div>
                }
            </div>
        );
    }
}

Book.propTypes = {
    details: PropTypes.object.isRequired
};

export default Book;