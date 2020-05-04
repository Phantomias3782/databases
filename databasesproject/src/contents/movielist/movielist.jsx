import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';

import Movie from "../movie/movie.jsx"
import MainPage from "../MainPage/mainpage.jsx"

class Movielist extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            movielist: "",
            openmoviesite: false,
            activeuser: probs.activeuser,
            loadmainpage: false
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
                <div>
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

    render () {

        return (
            <div>
                {this.state.openmoviesite ?
                    < Movie {...this.state}/>
                :
                this.state.loadmainpage ?
                    < MainPage {...this.state} />
                :
                <div>
                    <Button onClick = {this.showstate}>
                        showstate
                    </Button>
                    <table>
                        {this.state.content}
                    </table>
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