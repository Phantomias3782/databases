import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import MainPage from "../MainPage/mainpage.jsx"

class AlterDirector extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            tdirectorname: probs.director,
            tbirthday: "Birthday in format 2000-01-01",
            directorname: probs.director,
            user_email: probs.activeuser,
            birthday: "",
            showpopup: false,
            adress: "http://localhost:5000"
        }
        console.log("probs", probs)
        this.loaddirectorbirthdate()
    }

    showmainpage = () => {
        this.setState({loadmainpage: true})
    }

    loaddirectorbirthdate = () => {
        this.credentials = {
            directorname: this.state.tdirectorname
        }
        axios.post(this.state.adress+"/loaddirectorbirthdate", this.credentials).then(response => this.setState({tbirthday: response.data.birthday}))
        axios.post(this.state.adress+"/loaddirectorbirthdate", this.credentials).then(response => this.setState({birthday: response.data.birthday}))
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
            birthday: this.state.birthday,
            directoridentification: this.state.tdirectorname
        }

        axios.post(this.state.adress+"/alterdirector", this.credentials).then(response => this.setState({"submit": response.data.loaded}, this.showmainpage))

        // reload window
        // window.location.reload()

    }

    deletedirector = () => {

        this.setState({showpopup: true})
    }

    confirmdelete = () => {

        this.director = {"director":this.state.tdirectorname}
        axios.post(this.state.adress+"/deletedirector", this.director).then(response => this.setState({deleted : response.data}, this.showmainpage))

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
                    <TextField id = "Name" label = {this.state.tdirectorname} onChange = {this.handlenameChange}/>
                    <br/>
                    <TextField id = "Birthday" label = {this.state.tbirthday} onChange = {this.handlebirthdayChange}/>
                    <br/>
                    <Button onClick = {this.submit}>
                        Submit
                    </Button>
                    <Button onClick = {this.deletedirector}>
                        Delete Director
                    </Button>
                    {this.state.showpopup ?
                    <div>
                        Do you really want to delete the director:  {this.state.tdirectorname}
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

export default AlterDirector