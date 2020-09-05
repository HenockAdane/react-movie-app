import React from "react"
import { Switch, Route, Link } from 'react-router-dom'


class MovieDiv extends React.Component{
    constructor(){
        super();
    }


    render(){
        return (<Link onClick={this.props.moreInfo} className={this.props.divClass} to={this.props.to1}>
            <img onClick={this.props.moreInfo} src={this.props.imgURL} className="img" />
            <p onClick={this.props.moreInfo} className="title">{this.props.title}</p>
            <Link to={this.props.to2}>
            <i onClick={this.props.click} className={this.props.starClass}></i>
            </Link>
        </Link>)
    }
}

export default MovieDiv