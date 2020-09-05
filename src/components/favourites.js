import React from 'react';
import MovieDiv from "./movie"
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import { Switch, Route, Link } from 'react-router-dom'
import Header from "./header"

class FavouritesDiv extends React.Component{
    constructor(){
        super()
        this.state ={
            favourites: []
        }
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            console.log(user)
            if (user){
            firebase.firestore().collection("users").doc(user.uid).get().then(res => {
                if (res.data().favourites !== null){
                    res.data().favourites.forEach((a)=>{
                        fetch(`https://www.omdbapi.com/?t=${a}&apikey=thewdb`).then(res => res.json()).then(data =>{
                            if(data.Poster !== "N/A"){
                                this.setState({
                                    favourites: [...this.state.favourites, <MovieDiv divClass="MovieDiv yellow" starClass="fas fa-star yellow" imgURL={data.Poster} title={data.Title} to={"/favourites"} click={this.props.toggleFav}/>]
                                })
                            }
                            
                
                        })
                    })
                }

                else{
                    console.log("no favs")
                }
            })
            

        }

        else{
            this.setState({
                favourites: []
            }, ()=> console.log(this.state.favourites))
        }
        })
    }


    render(){
        let header;
        if(this.props.currentUser !== null){
           header=<Header change={this.props.inputChange} value={this.props.input} h1={`Welcome To ${this.props.user}'s Favourites Section`} link={(<div>
            <Link to="/">HOME<i class="fas fa-home"></i></Link>
            <Link to="/favourites" className="yellow" >Favourites<i class="fas fa-star"></i></Link>
            <Link to="/SignInOrUp" onClick={this.props.signOut}>SIGN OUT</Link>
           </div>)}/>}
  
          else{
            header=<Header change={this.props.inputChange} value={this.props.input} h1="Welcome To Your Favourite Movies" link={(<div>
            <Link to="/">HOME<i class="fas fa-home"></i></Link>
            <Link to="/SignInOrUp" className="yellow">Favourites<i class="fas fa-star"></i></Link>
            <Link to="/SignInOrUp">SIGN IN/UP</Link>
            </div>)}/>
          }

        return(<div>
            {header}
        <div className="container">
            {this.state.favourites}
            </div>
            </div>
        )
    }
}

export default FavouritesDiv