import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class NewActor extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            tactorname: "Name",
            tbirthday: "Birthday in format 2000-01-01",
            actorname: "Name",
            birthday: "Birthday in format 2000-01-01"
        }
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

        axios.post("/newactor", this.credentials).then(response => this.setState({"submit": response.data.loaded}, window.location.reload()))

        // reload window
        // window.location.reload()

    }

    render() {

        return (
            <div>
                <TextField id = "Name" label = {this.state.tactorname} onChange = {this.handlenameChange}/>
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

export default NewActor