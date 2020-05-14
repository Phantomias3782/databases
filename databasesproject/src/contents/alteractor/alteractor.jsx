import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import MainPage from "../MainPage/mainpage.jsx"

class AlterActor extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            tactorname: probs.actor,
            tbirthday: "Birthday in format 2000-01-01",
            actorname: probs.actor,
            birthday: "",
            loadmainpage: false,
            user_email: probs.activeuser,
            showpopup: false,
            adress: "http://localhost:5000"
        }
        this.loadactorbirthdate()
    }

    showmainpage = () => {
        this.setState({loadmainpage: true})
    }

    loadactorbirthdate = () => {
        this.credentials = {
            birthday: this.state.tdirectorname,
            actorname: this.state.tactorname
        }
        axios.post(this.state.adress+"/loadactorbirthdate", this.credentials).then(response => this.setState({tbirthday: response.data.birthday}))
        axios.post(this.state.adress+"/loadactorbirthdate", this.credentials).then(response => this.setState({birthday: response.data.birthday}))
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
            birthday: this.state.birthday,
            actoridentification: this.state.tactorname
        }

        axios.post(this.state.adress+"/alteractor", this.credentials).then(response => this.setState({"submitted": response.data.loaded}, this.showmainpage))

        // reload window
        // window.location.reload()

    }

    deleteactor = () => {

        this.setState({showpopup: true})
    }

    confirmdelete = () => {

        this.director = {"actor":this.state.tactorname}
        axios.post(this.state.adress+"/deleteactor", this.director).then(response => this.setState({deleted : response.data}, this.showmainpage))

        // reload
        // window.location.reload()
    }

    interruptdelete = () => {
        this.setState({showpopup: false})
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
                    <Button onClick = {this.deleteactor}>
                        Delete Actor
                    </Button>
                    {this.state.showpopup ?
                    <div>
                        Do you really want to delete the actor:  {this.state.tactorname}
                        <table>
                            <tbody>
                                <td>
                                    <Button onClick = {this.confirmdelete}>
                                        Delete
                                    </Button>
                                </td>
                                <td>
                                    <Button onClick = {this.interruptdelete}>
                                        Cancel
                                    </Button>
                                </td>
                            </tbody>
                        </table>
                    </div>
                    :
                        null
                    }
                </div>
                }
            </div>
        )
    }
}

export default AlterActor