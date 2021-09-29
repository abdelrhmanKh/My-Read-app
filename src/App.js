import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import HomePage from './HomePage'
import SearchPage from './searchPage'


class BooksApp extends React.Component {
 

  render() {
    return (
      <div className="app">
         <Route exact path='/' render={() => (
        	 <HomePage/>
         )} />

		<Route path='/Search' render={({ history }) => (          
        	 <SearchPage/>
      	)} />
      </div>
    )
  }
}

export default BooksApp
