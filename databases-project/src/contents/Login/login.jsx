import React from "react";
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import MainPage from "../MainPage/mainpage.jsx"

class Login extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            email: "beispiel@email.com",
            password: "2000-12-31",
            showMainPage: false,
            user_email: "",
            user_pwd: ""
        }
    }

    openMainPage = () => {
        // set State for LoadMainPage to True
        //this.setState({showMainPage: true})
        this.verifyLogin()
    }
    
    verifyLogin = () => {
        // this function shall verify the login of the user
        // get email and password
        this.credentials = {
            "email": this.state.user_email,
            "password": this.state.user_pwd
        }
        
        this.setState({loading: true})
        console.log(this.state)

        axios.post("/login", this.credentials)
        .then(result => this.setState({
            verified: result.data.verify,
            loading: false
        }))
        
    }

    showResult = () => {
        console.log("state", this.state)
    }

    handleEmailChange = (input) => {
        this.setState({user_email: input.target.value})
    }

    handlePasswordChange = (input) => {
        this.setState({user_pwd: input.target.value})
    }

    render () {

        return (
            <div>
                {this.state.showMainPage ?
                    <MainPage />
                :
                    <div>
                        Das ist eine Login-Seite
                        <br/>
                        Email:
                        <TextField id = "email" label = {this.state.email} onChange = {this.handleEmailChange}/>
                        <br/>
                        Passwort:
                        <TextField id = "birthday" label = {this.state.password} onChange = {this.handlePasswordChange}/>
                        <br/>
                        <Button onClick = {this.openMainPage}>
                            Anmelden
                        </Button>
                        <Button onClick = {this.showResult}>
                            DUmmyButton
                        </Button>
                    </div>
                } 
                
            </div>
        )
    }
}

export default Login;