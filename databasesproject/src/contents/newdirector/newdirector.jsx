import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class NewDirector extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            tdirectorname: "Name",
            tbirthday: "Birthday in format 2000-01-01",
            directorname: "Name",
            birthday: "Birthday in format 2000-01-01"
        }
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

        axios.post("/newdirector", this.credentials).then(response => this.setState({"submit": response.data.loaded}, window.location.reload()))

        // reload window
        // window.location.reload()

    }

    render() {

        return (
            <div>
                <TextField id = "Name" label = {this.state.tdirectorname} onChange = {this.handlenameChange}/>
                <br/>
                <TextField id = "Birthday" label = {this.state.tbirthday} onChange = {this.handlebirthdayChange}/>
                <br/>
                <Button onClick = {this.submit}>
                    Submit
                </Button>
            </div>
        )
    }
}

export default NewDirector