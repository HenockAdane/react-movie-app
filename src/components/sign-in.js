import React from "react"
import Button from "./custom-button"
import {googleLogin, getUser} from "./firebase"


class SignIn extends React.Component{

    constructor(){
        super()
        this.state = {
            email: "",
            password: ""
        }

        this.change = this.change.bind(this)
        this.signIn = this.signIn.bind(this)
        this.sub = this.sub.bind(this)

    }


    change(e){
        this.setState({
            [e.target.name]: e.target.value
        }, ()=> console.log(this.state))

    }

    signIn(){
        return getUser(this.state.email, this.state.password),
        this.setState({
            email: "",
            password:""
        })
    }

    sub(e){
        e.preventDefault()
    }


    render(){
        return(<div className="signIn">
            <h3>Sign In Here To Access And Add To Favourites Or Sign Up Below</h3>
            
            <form onSubmit={this.sub} className="signIn-form">

                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter Your Email Here" value={this.state.email} required onChange={this.change}/>

                <label for="password">password</label>
                <input type="password" name="password" id="password" placeholder="Enter Your Password Here" value={this.state.password} required onChange={this.change} />

                <Button type="submit" class="custom-button" click={this.signIn} text="SIGN IN" />
                <Button type="button" class="custom-button google-login" text="GOOGLE SIGN IN" click={googleLogin}/>

            </form>
        </div>)
    }

}

export default SignIn