import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';

import MainPage from "../MainPage/mainpage.jsx"
import RateMovie from "../ratemovie/ratemovie.jsx";

class Movie extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            movie: probs.movie,
            activeuser: probs.activeuser,
            user_email: probs.activeuser,
            loadmainpage: false,
            ratemovie: false,
            adress: "http://localhost:5000"
        }
        console.log("probs:", probs)
        this.getmovieinfos()
    }

    getmovieinfos = () => {

        this.credentials = {
            "movie": this.state.movie
        }
        axios.post(this.state.adress+"/loadspecmovie", this.credentials).then(response => this.setState({moviedata: response.data}, this.delayaxios))
    }

    delayaxios = () => {
        
        this.user = {"user":this.state.activeuser}

        axios.post(this.state.adress+"/getuserinfo", this.user)
        .then(response => this.setState({test: response.data.userinfo}, this.delayaxios2))

    }

    delayaxios2 = () => {

        this.user = {"user":this.state.activeuser}

        axios.post(this.state.adress+"/getuserinfo", this.user)
        .then(response => this.setState({test: response.data.userinfo}, this.buildmoviedata))
    }

    buildmoviedata = () => {

        console.log("moviedata", this.state.moviedata)
        this.setState({ratings: this.state.moviedata.ratings})
        this.setState({moviename: this.state.moviedata.moviename})
        this.setState({agerating: this.state.moviedata.agerating})
        this.setState({description: this.state.moviedata.description})
        this.setState({director: this.state.moviedata.director})
        this.setState({genre: this.state.moviedata.genre})
        this.setState({movielength: this.state.moviedata.movielength})
        this.setState({studio: this.state.moviedata.studio})
        this.setState({actor: this.state.moviedata.actors}, this.createratings)

    }

    createratings = () => {

        this.ratingcontent = []

        // create ratings
        this.ratings = this.state.ratings
        this.ratings.map((rating) => (
            this.ratingcontent.push(
                <div id = {rating}>
                    <td>
                        <tr>
                            {rating.rating} / 5
                        </tr>
                        <tr>
                            {rating.text}
                        </tr>
                    </td>
                </div>
            )
        ))
        this.setState({ratingcontent: this.ratingcontent})
    }

    showstate = () => {
        console.log("showstate", this.state)
    }

    showmainpage = () => {
        this.setState({loadmainpage: true})
    }

    ratemovie = () => {
        this.setState({ratemovie: true})
    }

    addtowatchlist = () => {
        this.credentials = {
            movie: this.state.movie,
            user: this.state.user_email
        }

        axios.post(this.state.adress+"/addtowatchlist", this.credentials).then(response => console.log(response.data))
    }

    deletefromwatchlist = () => {
        this.credentials = {
            movie: this.state.movie,
            user: this.state.user_email
        }

        axios.post(this.state.adress+"/deletefromwatchlist", this.credentials).then(response => console.log(response.data))
    }

    render () {

        return (

            <div>
                {this.state.loadmainpage ?
                    < MainPage {...this.state}/>
                :
                this.state.ratemovie ?
                    <RateMovie {...this.state}/>
                :
                <div>
                    <Button onClick = {this.showstate}>
                        showstate
                    </Button>
                    Movie Information
                    <table>
                        <tr>
                            <td>
                                Name:
                            </td>
                            <td>
                                -----
                            </td>
                            <td>
                                {this.state.moviename}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Length:
                            </td>
                            <td>
                                -----
                            </td>
                            <td>
                                {this.state.movielength}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                AgeRating:
                            </td>
                            <td>
                                -----
                            </td>
                            <td>
                                {this.state.agerating}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Studio:
                            </td>
                            <td>
                                -----
                            </td>
                            <td>
                                {this.state.studio}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Director:
                            </td>
                            <td>
                                -----
                            </td>
                            <td>
                                {this.state.director}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Actors:
                            </td>
                            <td>
                                -----
                            </td>
                            <td>
                                {this.state.actor}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Genres:
                            </td>
                            <td>
                                -----
                            </td>
                            <td>
                                {this.state.genre}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Description:
                            </td>
                            <td>
                                -----
                            </td>
                            <td>
                                {this.state.description}
                            </td>
                        </tr>
                    </table>
                    <br/>
                    Ratings:
                    <table>
                        {this.state.ratingcontent}
                    </table>
                    <Button onClick = {this.ratemovie}>
                        rate movie
                    </Button>
                    <Button onClick = {this.addtowatchlist}>
                        Add to Watchlist
                    </Button>
                    <Button onClick = {this.deletefromwatchlist}>
                        Delete from Watchlist
                    </Button>
                    <Button onClick = {this.showmainpage}>
                        return to Mainpage
                    </Button>
                </div>
                }
            </div>
        )
    }
}

export default Movie