import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import MainPage from "../MainPage/mainpage.jsx"

class NewDirector extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            tdirectorname: "Name",
            tbirthday: "Birthday in format 2000-01-01",
            directorname: "Name",
            user_email: probs.activeuser,
            birthday: "Birthday in format 2000-01-01",
            adress: "http://localhost:5000"
        }
    }

    showmainpage = () => {
        this.setState({loadmainpage: true})
    }

    handlenameChange = (input) => {
        this.setState({directorname: input.target.value})
    }

    handlebirthdayChange = (input) => {
        this.setState({birthday: input.target.value})
    }

    submit = () => {

        this.credentials = {
            directorname: this.state.directorname,
            birthday: this.state.birthday
        }

        axios.post(this.state.adress+"/newdirector", this.credentials).then(response => this.setState({"submit": response.data.loaded}, this.showmainpage))

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
                    <TextField id = "Name" label = {this.state.tdirectorname} onChange = {this.handlenameChange}/>
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

export default NewDirector