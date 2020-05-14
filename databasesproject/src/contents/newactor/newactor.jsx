import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import MainPage from "../MainPage/mainpage.jsx"

class NewActor extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            tactorname: "Name",
            tbirthday: "Birthday in format 2000-01-01",
            actorname: "Name",
            user_email: probs.activeuser,
            birthday: "Birthday in format 2000-01-01",
            adress: "http://localhost:5000"
        }
    }

    showmainpage = () => {
        this.setState({loadmainpage: true})
    }

    handlenameChange = (input) => {
        this.setState({actorname: input.target.value})
    }

    handlebirthdayChange = (input) => {
        this.setState({birthday: input.target.value})
    }

    submit = () => {

        this.credentials = {
            actorname: this.state.actorname,
            birthday: this.state.birthday
        }

        axios.post(this.state.adress+"/newactor", this.credentials).then(response => this.setState({"submit": response.data.loaded}, this.showmainpage))

        // reload window
        // window.location.reload()

    }

    render() {

        return (
            <div>
                {this.state.loadmainpage ?
                    < MainPage {...this.state}/>
                :
                <div>
                    <TextField id = "Name" label = {this.state.tactorname} onChange = {this.handlenameChange}/>
                    <br/>
                    <TextField id = "Birthday" label = {this.state.tbirthday} onChange = {this.handlebirthdayChange}/>
                    <br/>
                    <Button onClick = {this.submit}>
                        Submit
                    </Button>
                </div>
                }
            </div>
        )
    }
}

export default NewActor