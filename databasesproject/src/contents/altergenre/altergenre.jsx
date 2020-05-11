import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class AlterGenre extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            tgenrename: probs.genre,
            tgenredescription: "",
            genrename: probs.genre,
            genredescription: "",
            showpopup: false
        }
        this.loadgenredescription()
    }

    loadgenredescription = () => {
        this.credentials = {
            genrename: this.state.tgenrename
        }
        axios.post("/loadgenredescription", this.credentials).then(response => this.setState({tgenredescription: response.data.genredescription}))
        axios.post("/loadgenredescription", this.credentials).then(response => this.setState({genredescription: response.data.genredescription}))
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
            "genredescription": this.state.genredescription,
            "genreidentification": this.state.tgenrename
        }

        axios.post("/altergenre", this.credentials).then(response => this.setState({"submit": response.data.loaded}, window.location.reload()))
        
        // reload window
        // window.location.reload()

    }

    deletegenre = () => {

        this.setState({showpopup: true})
    }

    confirmdelete = () => {

        this.genre = {"genre":this.state.tgenrename}
        axios.post("/deletegenre", this.genre).then(response => this.setState({deleted : response.data}))

        // reload
        window.location.reload()
    }

    interruptdelete = () => {
        this.setState({showpopup: false})
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
                <Button onClick = {this.deletegenre}>
                    Delete Genre
                </Button>
                {this.state.showpopup ?
                <div>
                    Do you really want to delete the genre:  {this.state.tgenrename}
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
        )
    }
}

export default AlterGenre