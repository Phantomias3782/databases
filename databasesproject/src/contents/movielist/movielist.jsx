import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';

import Movie from "../movie/movie.jsx"
import MainPage from "../MainPage/mainpage.jsx"
import NewMovie from "../newmovie/newmovie.jsx"

class Movielist extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            movielist: "",
            openmoviesite: false,
            activeuser: probs.activeuser,
            loadmainpage: false,
            newmovie: false,
            actors: probs.actors,
            genres: probs.genres,
            directorcontent: probs.directorcontent
        }
        console.log("probs", probs)
        this.loadmovies()

    }

    loadmovies = () => {

        axios.get("/loadmovielist").then(response => this.setState({movielist: response.data.movies}, this.loadmovielist))
        
    }

    showstate = () => {
        console.log("state", this.state)
    }

    loadmovielist = () => {

        this.content = []
        this.state.movielist.map((movie) => (
            this.content.push(
                <div id = "1">
                    <td>
                        <Button onClick = {this.openmovie} id = {movie} value = {movie}>
                            {movie}
                        </Button>
                    </td>
                </div>
            )
        ))
        this.setState({content : this.content})

    }

    openmovie = (event) => {
        console.log("movie:", event.currentTarget.value)
        this.setState({movie: event.currentTarget.value})
        this.setState({openmoviesite: true})
    }

    openmainpage = () => {
        this.setState({loadmainpage: true})
    }

    newMovie = () => {
        this.setState({newmovie: true})
    }

    render () {

        return (
            <div>
                {this.state.openmoviesite ?
                    < Movie {...this.state}/>
                :
                this.state.loadmainpage ?
                    < MainPage {...this.state} />
                :
                this.state.newmovie ?
                    < NewMovie {...this.state} />
                :
                <div>
                    <Button onClick = {this.showstate}>
                        showstate
                    </Button>
                    <table>
                        {this.state.content}
                    </table>
                    <Button onClick = {this.newMovie}>
                        New Movie
                    </Button>
                    <Button onClick = {this.openmainpage}>
                        return to MainPage
                    </Button>
                </div>
                }
            </div>
        )
    }

}

export default Movielist