import React from "react"
import Button from "./custom-button"
import {createUser} from "./firebase"


class SignUp extends React.Component{

    constructor(){
        super()
        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }

        this.change = this.change.bind(this)
        this.signUp = this.signUp.bind(this)
        this.sub = this.sub.bind(this)
    }


    change(e){
        this.setState({
            [e.target.name]: e.target.value
        }, ()=> console.log(this.state))

        

    }

    signUp(){
        if (this.state.password === this.state.confirmPassword){
            createUser(this.state.displayName, this.state.email, this.state.password)

            this.setState({
                displayName: "",
                email: "",
                password: "",
                confirmPassword: ""
            })

            alert("Your Account Has Been Created :)")
        }

        else{
            alert("The Passwords Do Not Match")
        }

    }

    sub(e){
        e.preventDefault();
        }


    render(){
        return(<div className="signIn">
            <h3>Sign Up Here If You Do Not Have An Account</h3>
            
            <form onSubmit={this.sub} className="signUp-form">

                <label for="displayName">Full Name</label>
                <input type="text" name="displayName" placeholder="Enter Your Full Name Here" value={this.state.displayName} required onChange={this.change}/>

                <label for="email">Email</label>
                <input type="email" name="email" placeholder="Enter Your Email Here" value={this.state.email} required onChange={this.change}/>

                <label for="password">Password</label>
                <input type="password" name="password" placeholder="Enter Your Password Here" value={this.state.password} required onChange={this.change} />

                <label for="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Enter Your Password Again Here" value={this.state.confirmPassword} required onChange={this.change} />

                <Button type="submit" class="custom-button" click={this.signUp} text="SIGN UP" />

            </form>
        </div>)
    }

}

export default SignUp