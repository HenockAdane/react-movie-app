import React from "react"
import { Switch, Route, Link } from 'react-router-dom'


class MoreInfo extends React.Component{

    constructor(){
        super();
        this.state = {
            movie: ""
        }
    }

    componentDidMount(){
        fetch(`https://www.omdbapi.com/?t=${this.props.title}&apikey=thewdb`).then(res => res.json()).then(data => {
            console.log(data)
            this.setState({
                movie: (<div className="more-info">
                    <div className="part1">
                    <img src={data.Poster} />
                    <div className="buttons">
                    <a className="view" href={`https://imdb.com/title/${data.imdbID}`} target="_blank">View IMDG</a>
                    <Link className="back" to={"/"}>Go Back</Link>
                    </div>
                </div>
                <div className="part2">
                    
                    
                    <ul>
                        <h1>{data.Title}</h1>
                        <li><h4>Released:</h4>{data.Released}</li>
                        <li><h4>Genre:</h4>{data.Genre}</li>
                        <li><h4>Rated:</h4>{data.Rated}</li>
                        <li><h4>IMDG Rating:</h4>{data.imdbRating}</li>
                        <li><h4>Director:</h4>{data.Director}</li>
                        <li><h4>Actors:</h4>{data.Actors}</li>
                        <li><h4>Plot:</h4>{data.Plot}</li>
                    </ul>
                </div>
                </div>)     
            })
                   
            })
        // this.setState({
        //     movie: this.props.title
        // }, ()=> console.log(this.state.movie))
        }

    render(){


        return this.state.movie
        
    }
}


export default MoreInfo