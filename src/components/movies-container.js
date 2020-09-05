import React from "react"
import { Switch, Route, Link } from 'react-router-dom'
import Header from "./header"



class Container extends React.Component{


    render(){
        let header;
        if(this.props.currentUser !== null){
           header=<Header change={this.props.inputChange} value={this.props.input} h1="Welcome To Henock's React Movie Library" link={(<div>
            <Link to="/" className="yellow" >HOME<i class="fas fa-home"></i></Link>
            <Link to="/favourites">Favourites<i class="fas fa-star"></i></Link>
            <Link to="/SignInOrUp" onClick={this.props.signOut}>SIGN OUT</Link>
           </div>)}/>}
  
          else{
            header=<Header change={this.props.inputChange} value={this.props.input} h1="Welcome To Henock's React Movie Library" link={(<div>
            <Link to="/" className="yellow" >HOME<i class="fas fa-home"></i></Link>
            <Link to="/SignInOrUp">Favourites<i class="fas fa-star"></i></Link>
            <Link to="/SignInOrUp">SIGN IN/UP</Link>
            </div>)}/>
          }
  
        return (
            <div>
            {header}
            
            <div className="container">
                {this.props.movies}
            </div>
            </div>
        )
    }
}

export default Container