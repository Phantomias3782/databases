import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import MainPage from "../MainPage/mainpage.jsx"

class NewGenre extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            tgenrename: "Name",
            tgenredescription: "Description",
            genrename: "Name",
            user_email: probs.activeuser,
            genredescription: "Description",
            adress: "http://localhost:5000"
        }
    }

    showmainpage = () => {
        this.setState({loadmainpage: true})
    }

    handlenameChange = (input) => {
        this.setState({genrename: input.target.value})
    }

    handedexcriptionChange = (input) => {
        this.setState({genredescription: input.target.value})
    }

    submit = () => {
        
        this.credentials = {
            "genrename": this.state.genrename,
            "genredescription": this.state.genredescription
        }

        axios.post(this.state.adress+"/newgenre", this.credentials).then(response => this.setState({"submit": response.data.loaded}, this.showmainpage))
        
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
                    <TextField id = "Name" label = {this.state.tgenrename} onChange = {this.handlenameChange}/>
                    <br/>
                    <TextField id = "Description" label = {this.state.tgenredescription} onChange = {this.handedexcriptionChange}/>
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

export default NewGenre