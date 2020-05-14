import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import MainPage from "../MainPage/mainpage.jsx"

class NewMovie extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            description: "Description",
            movieName: "Movie Name",
            movieLength: "120",
            ageRating: "12",
            ldescription: "Description",
            lmovieName: "Movie Name",
            lmovieLength: "120",
            lageRating: "12",
            actors: probs.actors,
            genres: probs.genres,
            directorcontent: probs.directorcontent,
            director: "",
            studio: "Universal",
            lstudio: "Universal",
            apiactors: [],
            apigenre: [],
            user_email: probs.activeuser,
            activeuser: probs.activeuser,
            genrecontent: [],
            actorcontent: [],
            adress: "http://localhost:5000"
        }
        this.setupcontent()
    }

    setupcontent = () => {
        this.setState({genrecontent: []})
        this.setState({actorcontent: []})
        this.test = this.state.genres
        console.log("state befor fail", this.state)
        this.test.map((genre) => (
            this.state.genrecontent.push(
                <FormControlLabel
                value= {genre}
                control={<Checkbox value = {genre} color="primary" onChange = {this.handlegenrechange}/>}
                label= {genre}
                labelPlacement="start"
                />
            )
        ))

        this.state.actors.map((actor) => (
            this.state.actorcontent.push(
                <FormControlLabel
                value= {actor}
                control={<Checkbox value = {actor} color="primary" onChange = {this.handleactorchange}/>}
                label= {actor}
                labelPlacement="start"
                />
            )
        ))
    }

    removeitemfromlist = (array, item) => {
        let filteredArray = array.filter(element => element !== item)
        return filteredArray
    }

    handlegenrechange = (event) => {
        this.genre = event.target.value

        this.state.apigenre.includes(this.genre) ?
            this.setState({apigenre: this.removeitemfromlist(this.state.apigenre, this.genre)})
        :
        this.state.apigenre.push(this.genre)
    }

    handleactorchange = (event) => {
        this.actor = event.target.value

        this.state.apiactors.includes(this.actor) ?
            this.setState({apiactors: this.removeitemfromlist(this.state.apiactors, this.actor)})
        :
        this.state.apiactors.push(this.actor)
    }

    handlenameChange = (input) => {
        this.setState({movieName: input.target.value})
    }

    handlelengthChange = (input) => {
        this.setState({movieLength: input.target.value})
    }

    handlestudioChange = (input) => {
        this.setState({studio: input.target.value})
    }

    handledescriptionChange = (input) => {
        this.setState({description: input.target.value})
    }

    handleageratingChange = (input) => {
        this.setState({agerating: input.target.value})
    }

    handledirectorchange = (event) => {

        this.setState({"director": event.target.value})
    }

    submit = () => {
        
        this.credentials = {
            "name": this.state.movieName,
            "length": this.state.movieLength,
            "studio": this.state.studio,
            "description": this.state.description,
            "agerating": this.state.ageRating,
            "director": this.state.director,
            "genre": this.state.apigenre,
            "actors": this.state.apiactors
        }

        axios.post(this.state.adress+"/newmovie", this.credentials).then(response => this.setState({"submit": response.data.loaded}, this.showmainpage))
        
        // reload window
        // window.location.reload()

    }

    showmainpage = () => {
        this.setState({loadmainpage: true})
    }

    showstate = () => {
        console.log("state:", this.state)
        console.log("apigenre", this.state.apigenre)
        console.log("apiactors", this.state.apiactors)
    }

    render() {

        return (
            <div>
                {this.state.loadmainpage ?
                    < MainPage {...this.state}/>
                :
                <div>
                    <TextField id = "MovieName" label = {this.state.lmovieName} onChange = {this.handlenameChange}/>
                    <br/>
                    <TextField id = "Length" label = {this.state.lmovieLength} onChange = {this.handlelengthChange}/>
                    <br/>
                    <TextField id = "Studio" label = {this.state.lstudio} onChange = {this.handlestudioChange}/>
                    <br/>
                    <TextField id = "Description" label = {this.state.ldescription} onChange = {this.handledescriptionChange}/>
                    <br/>
                    <TextField id = "AgeRating" label = {this.state.lageRating} onChange = {this.handleageratingChange}/>
                    <br/>
                    <br/>
                    <InputLabel>
                        Select Director
                    </InputLabel>
                        <Select value = {this.state.director} onChange = {this.handledirectorchange}>
                            {this.state.directorcontent}
                        </Select>
                    <br/>
                    Select actors
                    <br/>
                    {this.state.actorcontent}
                    <br/>
                    Select genre
                    <br/>
                    {this.state.genrecontent}
                    <br/>
                    <Button onClick = {this.submit}>
                        Submit
                    </Button>
                    {/* <Button onClick = {this.showstate}>
                        showstate
                    </Button> */}
                </div>
                }
            </div>
        )
    }
}

export default NewMovie