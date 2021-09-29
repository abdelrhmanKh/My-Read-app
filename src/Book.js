import React, { Component } from 'react'
import * as BookAPI from './BooksAPI'

class Books extends Component {

    handleChange = async e => {

        const book = this.props;
        const BookShelf = e.target.value;
        const newPlaces = await BookAPI.update(book, BookShelf);
    console.log(newPlaces)
      
        this.props.transferBook(book, BookShelf, newPlaces)

    }
    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${ this.props.imageLinks ? this.props.imageLinks.thumbnail : ''})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.handleChange} value={this.props.shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.title}</div>
                    <div className="book-authors">{this.props.authors ? this.props.authors : 'No Authors'}</div>
                </div>
            </li>
        )
    }
}
export default Books