import React,{Component} from 'react'
import Books from './Book'

class BookShelf extends Component{
render(){
return(
              <div className="bookshelf">
                      <h2 className="bookshelf-title">{this.props.bookState}</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
  
        		    {this.props.Books && this.props.Books.map(book => <Books {...book} key={book.id} transferBook={this.props.transferBook}/>) }
  
                        </ol>
                      </div>
                    </div>)
  
}
}
export default BookShelf