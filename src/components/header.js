import React from "react"
import { Switch, Route, Link } from 'react-router-dom'


class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            search: ""
        }
    }

    render(){
        return (
            <header>
            <h1>{this.props.h1}</h1>
            <input type="text" id="search" placeholder="Search for a movie" onChange={this.props.change} value={this.props.value}/>
            {this.props.link}
        </header>
        )
    }
}

export default Header