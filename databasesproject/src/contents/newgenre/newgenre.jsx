import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class NewGenre extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            tgenrename: "Name",
            tgenredescription: "Description",
            genrename: "Name",
            genredescription: "Description"
        }
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

        axios.post("/newgenre", this.credentials).then(response => this.setState({"submit": response.data.loaded}, window.location.reload()))
        
        // reload window
        // window.location.reload()

    }

    render() {

        return (
            <div>
                <TextField id = "Name" label = {this.state.tgenrename} onChange = {this.handlenameChange}/>
                <br/>
                <TextField id = "Description" label = {this.state.tgenredescription} onChange = {this.handedexcriptionChange}/>
                <br/>
                <Button onClick = {this.submit}>
                    Submit
                </Button>
            </div>
        )
    }
}

export default NewGenre