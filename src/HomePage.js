import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchGate from './SearchGate'


class HomePage extends Component {
    state = {
        Books: [],
        currentlyReading: [],
        wantToRead: [],
        Read: [],
      
        rearrangeBooks: newBooks => {

            const currentlyReading = newBooks.filter(book => book.shelf === 'currentlyReading')
            const wantToRead = newBooks.filter(book => book.shelf === 'wantToRead')
            const Read = newBooks.filter(book => book.shelf === 'read')

            this.setState(() => ({
                Books: newBooks,
                currentlyReading,
                wantToRead,
                Read
            }))
        },
        transferBook: (book, BookShelf, newPlaces) => {
         let newArrangeOfBooks;
         if (BookShelf==='none'){
         newArrangeOfBooks =  this.state.Books.filter(newBook=>{
        	return !(newBook.id === book.id)
         })
         }else{
            newArrangeOfBooks  = this.state.Books.map(allBooks => {
                      
                          const BookID = newPlaces[BookShelf].find(bookId => bookId === allBooks.id)
                          console.log(BookID)
                          if (BookID) { allBooks.shelf = BookShelf }
                      
                       
                          return allBooks
                      });
                   
         }
          console.log(newArrangeOfBooks)
          this.state.rearrangeBooks(newArrangeOfBooks)
           
        },

    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((Books) => {
                const currentlyReading = Books.filter(book => book.shelf === 'currentlyReading')
                const wantToRead = Books.filter(book => book.shelf === 'wantToRead')
                const Read = Books.filter(book => book.shelf === 'read')
                this.setState(() => ({
                    Books,
                    currentlyReading,
                    wantToRead,
                    Read
                }))
            })

    }


    render() {

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf 
                      bookState='Current Reading' 
                      Books={this.state.currentlyReading} 
                      transferBook={this.state.transferBook} />
  
                    <BookShelf 
                      bookState='Want to Read' 
                      Books={this.state.wantToRead}          
                      transferBook={this.state.transferBook} />
  
                    <BookShelf 
                      bookState='Read'
                      Books={this.state.Read}                   
                      transferBook={this.state.transferBook} />
  
                </div>
                <SearchGate  transferBook={this.state.transferBook}/>
            </div>
        )
    }
}
export default HomePage