import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Book'


class Search extends Component{
  state={
    query:'',
    SearchedBooks:[],
    currentlyReading:[],
    wantToRead:[],
    Read:[],
    Books:[],
  } 
   componentDidMount() {
    BooksAPI.getAll()
      .then((Books) => {
       const currentlyReading = Books.filter(book=>book.shelf==='currentlyReading')
       const wantToRead = Books.filter(book=>book.shelf==='wantToRead')
       const Read = Books.filter(book=>book.shelf==='read')
      
        this.setState(() => ({
          Books,
          currentlyReading,
          wantToRead,
          Read
        }))
      })
     
  } 

    handleChange= async e=>{
      try{
      const query =e.target.value
       this.setState({query})
      if(query.trim()) {
      const resultOfSearch = await BooksAPI.search(query);
      resultOfSearch.error ? this.setState({SearchedBooks:[]}):this.setState({SearchedBooks:resultOfSearch})
      }else{
      this.setState({SearchedBooks:[]})
      }
      }catch(e){
      console.log(e)
      }
    }
  
render(){
return(
<div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" >Close </Link>
  
              <div className="search-books-input-wrapper">
                
                <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={this.state.query}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
             { this.state.SearchedBooks.length > 0 &&  
              this.state.SearchedBooks.map(book => {
              const findOldBooksShelf = this.state.Books.find( searchedBooksShelf => searchedBooksShelf.id === book.id )
                 findOldBooksShelf ? book.shelf = findOldBooksShelf.shelf : book.shelf = 'none'
                return(
                      <Books 
                      {...book} 
                      key={book.id}
                      transferBook={this.props.transferBook}
                      />
                  )
              })}{this.state.SearchedBooks.length ===0 && <p style={{textAlign:'Center',fontSize:'18px'}}> <span style={{color:'Red',fontStyle:'bold'}}>Please Search in one of this Books</span>  'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'</p>}
              </ol>
            </div>
          </div>
)
}
}
export default Search