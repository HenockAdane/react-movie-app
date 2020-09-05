import React from "react"
import SignIn from "./sign-in"
import SignUp from "./sign-up"
import { Switch, Route, Link } from 'react-router-dom'
import Header from "./header"

class SignInOrUp extends React.Component{




    render(){
        let header;
        if(this.props.currentUser !== null){
           header=<Header change={this.props.inputChange} value={this.props.input} h1={`Welcome To ${this.props.user}'s Favourites Section`} link={(<div>
            <Link to="/">HOME<i class="fas fa-home"></i></Link>
            <Link to="/favourites">Favourites<i class="fas fa-star"></i></Link>
            <Link to="/SignInOrUp" className="yellow" onClick={this.props.signOut}>SIGN OUT</Link>
           </div>)}/>}
  
          else{
            header=<Header change={this.props.inputChange} value={this.props.input} h1="Sign In Or Sign Up" link={(<div>
            <Link to="/">HOME<i class="fas fa-home"></i></Link>
            <Link to="/SignInOrUp">Favourites<i class="fas fa-star"></i></Link>
            <Link to="/SignInOrUp" className="yellow">SIGN IN/UP</Link>
            </div>)}/>
          }
        return(
            <div>
                {header}
                <SignIn />
                <SignUp />
            </div>
        )
    }
}

export default SignInOrUp