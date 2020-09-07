import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Header from "./components/header"
import MovieDiv from "./components/movie"
import Container from "./components/movies-container"
import SignInOrUp from './components/sign-in-or-up.js';
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import {addUserToDB} from "./components/firebase"
import FavouritesDiv from "./components/favourites"
import MoreInfo from "./components/moreInfo"

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      userName: "",
      currentUser: null,
      currentMovie: "",
      favourites: [],
      movies: [],
      input: ""
      
    }

    this.inputChange = this.inputChange.bind(this)
    this.signOut = this.signOut.bind(this)
    this.toggleFav = this.toggleFav.bind(this)
    this.moreInfo= this.moreInfo.bind(this)
  }


  moreInfo(e){
    if(e.target.classList.contains("MovieDiv")){
      console.log(e.target.children[1].textContent)
      this.setState({
        currentMovie: e.target.children[1].textContent
      })
    }

    else if(e.target.classList.contains("img")){
      console.log(e.target.parentElement.children[1].textContent)
      this.setState({
        currentMovie: e.target.parentElement.children[1].textContent
      })
    }

    else{
      console.log(e.target.textContent)
      this.setState({
        currentMovie: e.target.textContent
      })
    }
    }

    // <MovieDiv moreInfo={this.moreInfo} divClass="MovieDiv yellow" starClass="fas fa-star yellow" imgURL={a.Poster} title={a.Title} to={"/"} click={this.toggleFav}/>



  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      addUserToDB(user)
      this.setState({
        currentUser: user,
      }, ()=> console.log(this.state.currentUser))


      firebase.firestore().collection("users").doc(user.uid).get().then(res =>{
        if(res.data().favourites !== null){
          this.setState({
            userName: res.data().displayName,
            favourites: res.data().favourites
          }, ()=> console.log(this.state.currentUser, this.state.favourites))
        }
        else{
          this.setState({
            userName: res.data().displayName,
            currentUser: user,
            favourites: []
          }, ()=> console.log(this.state.currentUser, this.state.favourites))
        }
      })

    })

  }

  inputChange(e){
    this.setState({
      input: e.target.value
    }, () => {
      console.log(this.state.input)
    
      fetch(`https://www.omdbapi.com/?s=${this.state.input}&apikey=thewdb`).then(res => res.json()).then(data => {
        // console.log(data.Search)

        if(data.Response === "False"){
          this.setState({
            movies: []
          })
        }

        else{
          console.log(data)
          this.setState({
            movies: data.Search.map((a) => {
              if(a.Poster !== "N/A"){
                return a
              }
            })
          }, ()=> console.log(this.state.movies))
        }

        
      })
    })




  }

  signOut(){
    firebase.auth().signOut().then(() => {
      console.log("Signed Out")
      this.setState({
        favourites: []
      }, ()=> console.log(this.state.favourites))
    }).catch(err => console.log(err))
  }

  toggleFav(e){
    const target = e.target
    firebase.auth().onAuthStateChanged(user => {
      if(!user){
        console.log("Sign in to save as and view favourites")
      }

      else{
        console.log(target)
        console.log(target.parentElement.children)
        target.classList.toggle("yellow")
        target.parentElement.parentElement.classList.toggle("yellow")
        const text = target.parentElement.parentElement.children[1].textContent
        if(target.classList.contains("yellow")){
          this.setState(prevState => ({
            favourites: [...prevState.favourites, text]
          }), ()=> {
            console.log(this.state.favourites)
            
              firebase.firestore().collection("users").doc(user.uid).update({
                favourites: this.state.favourites
              })
            
    
          });
        }
    
        else{
          const text = target.parentElement.parentElement.children[1].textContent
          const newArr = [...this.state.favourites]
          newArr.splice([...this.state.favourites].indexOf(text), 1)
          this.setState({
            favourites: newArr
          }, ()=> {
            console.log(this.state.favourites)
              firebase.firestore().collection("users").doc(user.uid).update({
                favourites: this.state.favourites
              })
            
    
          })
    
    
        }
      }
  })
  }


  
  render(){
    const Movies = this.state.movies.map((a)=>{
      if(!this.state.currentUser){
      if (a !== undefined){
        // if(this.state.currentUser === null){
        return (<MovieDiv divClass="MovieDiv" moreInfo={this.moreInfo} starClass="fas fa-star" imgURL={a.Poster} title={a.Title} to1={"/moreInfo"} to2={"/SignInOrUp"} click={this.toggleFav}/>)
        // }



        // else{
        //   return (<MovieDiv imgURL={a.Poster} title={a.Title} to={"/"} click={this.toggleFav}/>)         
        // }
      }

      else{
        return;
      }
    }

    else{

        if(a !== undefined){
          // console.log(user.data().favourites.includes(`${a.Title}`))
          console.log(a.Title)

        if(this.state.favourites.includes(a.Title)){
          return (<MovieDiv to1={"/moreInfo"} to2={"/"}  moreInfo={this.moreInfo} divClass="MovieDiv yellow" starClass="fas fa-star yellow" imgURL={a.Poster} title={a.Title} click={this.toggleFav}/>)
        }



        else{
          return (<MovieDiv to1={"/moreInfo"} to2={"/"} moreInfo={this.moreInfo} divClass="MovieDiv" starClass="fas fa-star" imgURL={a.Poster} title={a.Title} click={this.toggleFav}/>)
        }
      }
    }
    })


      // let header;
      // if(this.state.currentUser !== null){
      //    header=<Header change={this.inputChange} value={this.state.input} h1="Welcome To Henock's Movie Library" link={(<div>
      //     <Link to="/">HOME<i class="fas fa-home"></i></Link>
      //     <Link to="/favourites">Favourites<i class="fas fa-star"></i></Link>
      //     <Link to="/SignInOrUp" onClick={this.signOut}>SIGN OUT</Link>
      //    </div>)}/>}

      //   else{
      //     header=<Header change={this.inputChange} value={this.state.input} h1="Welcome To Your Favourite Movies" link={(<div>
      //     <Link to="/">HOME<i class="fas fa-home"></i></Link>
      //     <Link to="/SignInOrUp">Favourites<i class="fas fa-star"></i></Link>
      //     <Link to="/SignInOrUp">SIGN IN/UP</Link>
      //     </div>)}/>
      //   }

    
    
    return (
    <div>

        {/* {header} */}
        <Switch>
          <Route exact={true} path="/" render={()=>(
            <Container inputChange={this.inputChange} input={this.state.input} signOut={this.signOut} currentUser={this.state.currentUser}  movies={Movies} />
          )}  />
          <Route exact={true} path="/favourites" render={() =>(
            <FavouritesDiv inputChange={this.inputChange} input={this.state.input} signOut={this.signOut} user={this.state.userName} currentUser={this.state.currentUser} toggleFav={this.toggleFav}/>
          )}/>
          <Route exact={true} path="/SignInOrUp" render={()=>(
            !this.state.currentUser ? (<SignInOrUp inputChange={this.inputChange} input={this.state.input} signOut={this.signOut} user={this.state.userName} currentUser={this.state.currentUser}/>) : (<Redirect to="/" />)
          )} />
          // {/* <Route exact={true} path="/signinandup" component={SignInOrUp} /> */}

          <Route exact={true} path="/moreInfo" render={()=>(
            <MoreInfo title={this.state.currentMovie} />
          )} />
        </Switch>


    </div>
  )};
}

export default App;

/*
ADD FAVOURITES COMPONENT
FIX LAYOUT
CLEAR CONTAINER WHEN SEARCH INPUT IS EMPTY
*/