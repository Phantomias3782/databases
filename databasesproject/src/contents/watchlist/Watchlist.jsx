import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';

import Movie from "../movie/movie.jsx"
import MainPage from "../MainPage/mainpage.jsx"

class Watchlist extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            activeuser: probs.activeuser,
            openmoviesite: false,
            loadmainpage: false,
            user_email: probs.activeuser
        }

        this.getwatchlistmovies()
    }

    getwatchlistmovies = () => {

        this.credentials = {
            user: this.state.activeuser
        }
        axios.post("/loadwatchlist", this.credentials).then(response => this.setState({watchlist: response.data.watchlist}, this.delayaxios))
    }

    delayaxios = () => {
        
        this.user = {"user":this.state.activeuser}

        axios.post("/getuserinfo", this.user)
        .then(response => this.setState({test: response.data.userinfo}, this.delayaxios2))

    }

    delayaxios2 = () => {

        this.user = {"user":this.state.activeuser}

        axios.post("/getuserinfo", this.user)
        .then(response => this.setState({test: response.data.userinfo}, this.buildwatchlist))
    }
    
    openmovie = (event) => {
        console.log("movie:", event.currentTarget.value)
        this.setState({movie: event.currentTarget.value})
        this.setState({openmoviesite: true})
    }

    buildwatchlist = () => {

        this.watchlistcontent = []

        this.state.watchlist.map((movie) => (
            this.watchlistcontent.push(
                <div>
                    <td>
                        <Button onClick = {this.openmovie} id = {movie} value = {movie}>
                            {movie}
                        </Button>
                    </td>
                </div>
            )
        ))

        this.setState({content : this.watchlistcontent})
    }

    showstate = () => {
        console.log("state in watchlist:", this.state)
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
                    <br/>
                    <table>
                        {this.state.content}
                    </table>
                    <Button onClick = {this.openmainpage}>
                        return to MainPage
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

export default Watchlist