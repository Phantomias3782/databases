import React from "react";
import Button from '@material-ui/core/Button';

import MainPage from "../MainPage/mainpage.jsx"

class Login extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            email: "beispiel@email.com",
            password: "Passwort123",
            showMainPage: false
        }
    }

    openMainPage = () => {
        // set State for LoadMainPage to True
        this.setState({showMainPage: true})

        console.log(this.state)
    }

    render () {

        return (
            <div>
                {this.state.showMainPage ?
                    <MainPage />
                :
                    <div>
                        Das ist eine Login-Seite
                        <form>
                            email
                        </form>
                        <form>
                            passwort
                        </form>
                        <Button onClick = {this.openMainPage}>
                            Anmelden
                        </Button>
                    </div>
                } 
                
            </div>
        )
    }
}

export default Login;