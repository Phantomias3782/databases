import React from "react"
import axios from "axios"
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import MainPage from "../MainPage/mainpage.jsx"

class RateMovie extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            movie: probs.movie,
            activeuser: probs.activeuser,
            user_email: probs.activeuser,
            textrating: "Write your rating!",
            rating: "Rating x/5",
            adress: "http://localhost:5000"
        }
    }

    showmainpage = () => {
        this.setState({loadmainpage: true})
    }

    handleChange = (event) => {
        this.setState({textrating : event.target.value})
    }

    handleratingchange = (event) => {

        this.setState({rating: event.target.value})

    }

    submit = () => {
        this.credentials = {
            movie: this.state.movie,
            textrating: this.state.textrating,
            rating: this.state.rating,
            user: this.state.activeuser
        }

        axios.post(this.state.adress+"/ratemovie", this.credentials).then(response => this.setState({loaded: response.data}, this.showmainpage))
    }

    render () {

        return (
            <div>
                {this.state.loadmainpage ?
                    < MainPage {...this.state}/>
                :
                <div>
                    Please enter your Rating for the movie: {this.state.movie} below! 
                    <br/>
                    <Select value = {this.state.rating} onChange = {this.handleratingchange}>
                        <MenuItem value = "1">
                            1
                        </MenuItem>
                        <MenuItem value = "2">
                            2
                        </MenuItem>
                        <MenuItem value = "3">
                            3
                        </MenuItem>
                        <MenuItem value = "4">
                            4
                        </MenuItem>
                        <MenuItem value = "5">
                            5
                        </MenuItem>
                    </Select>
                    <br/>
                    <TextField label="Multiline" multiline rowsMax={4} value={this.state.textrating} onChange={this.handleChange}/>
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

export default RateMovie