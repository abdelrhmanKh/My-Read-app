import React,{Component} from 'react'
import { Link } from 'react-router-dom'

class SearchGate extends Component{
render(){
return(
              <div className="open-search">
                   <Link to='/Search'>Add a book</Link>
              </div>
 )
}
}
export default SearchGate