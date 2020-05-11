import React from "react";
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

import MainPage from "../MainPage/mainpage.jsx"
import NewUser from "../newuser/newuser.jsx"

class Login extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            email: "test@email.com",
            password: "2000-01-01",
            user_email: "", // clear after finishing
            user_pwd: "",
            verified: false//true // just to skip login page, delete later
        }
    }

    openMainPage = () => {

        this.verifyLogin()
        //this.loadUserWatchlist()
        //console.log("are movies there?", this.state)

    }

    loadUserWatchlist = () => {

        this.user = {
            "user": this.state.user_email
        } 
        // get data from flask
        axios.post("/loadwatchlist", this.user)
        .then(response => this.setState({userwatchlist: response.data.watchlist}))
    }
    
    verifyLogin = () => {
        // this function shall verify the login of the user
        // get email and password
        this.credentials = {
            "email": this.state.user_email,
            "password": this.state.user_pwd
        }

        axios.post("/login", this.credentials)
        .then(response => this.setState({verified: response.data.verrified}))

    }

    newUser = () => {
        this.setState({newUser: true})
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

    handleloginchange = (input) => {

        this.setState({verrified: !this.state.verrified})
    }

    render () {

        return (
            <div>
                {this.state.newUser ?
                    <NewUser/>
                :
                    this.state.verified ?
                        <MainPage {...this.state}/>
                    :
                        <div>
                            <br/>
                            Email:
                            <TextField id = "email" label = {this.state.email} onChange = {this.handleEmailChange}/>
                            <br/>
                            Password:
                            <TextField id = "birthday" label = {this.state.password} onChange = {this.handlePasswordChange}/>
                            <br/>
                            <Button onClick = {this.openMainPage}>
                                Login
                            </Button>
                            {/* <Button onClick = {this.showResult}>
                                showState
                            </Button> */}
                            <Button onClick = {this.newUser}>
                                Sign up
                            </Button>
                            <br/>
                            {/* <FormControlLabel
                                value="stay logged in"
                                control={<Checkbox color="primary" onChange = {this.handleloginchange}/>}
                                label="stay logged in"
                                labelPlacement="start"
                                /> */}
                        </div>
                } 
                
            </div>
        )
    }
}

export default Login;