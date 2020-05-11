import React from "react";
import axios from "axios"
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import AlterUserInfo from "../AlterUserInfo/alteruserinfo.jsx"

import AlterGenre from "../altergenre/altergenre.jsx"
import NewGenre from "../newgenre/newgenre.jsx"

import AlterDirector from "../alterdirector/alterdirector.jsx"
import NewDirector from "../newdirector/newdirector.jsx"

import AlterActor from "../alteractor/alteractor.jsx"
import NewActor from "../newactor/newactor.jsx"

import Watchlist from "../watchlist/Watchlist.jsx"
import Movielist from "../movielist/movielist.jsx"

import {navigation} from "../../components/navigation/navigation.jsx"

class MainPage extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            activeuser: probs.user_email,
            showpopup: false,
            actor: "",
            director: "",
            genre: "",
            openUserInfo: false,
            alterGenre: false,
            newGenre: false,
            alterActor: false,
            newActor: false,
            alterDirector: false,
            newDirector: false,
            showwatchlist: false,
            logout: false
        }

        this.loaddata()
        this.loaduserinfo()
        console.log("probs mainpage", probs)
        
    }

    loaduserinfo = () => {

        this.user = {"user":this.state.activeuser}
        axios.post("/getuserinfo", this.user)
        .then(response => this.setState({userinfo: response.data.userinfo}))

    }

    loaddata = () => {

        // genres
        axios.get("/loadgenres").then(response => this.setState({genres: response.data.genres}, this.delayotheraxios()))

        // actors
        axios.get("/loadactors").then(response => this.setState({actors: response.data.actors}, this.delayotheraxios()))

        // directors
        axios.get("/loaddirectors").then(response => this.setState({directors: response.data.directors}, this.delayloadaxios()))

    }

    delayotheraxios = () => {

        this.user = {"user":this.state.activeuser}

        axios.post("/getuserinfo", this.user)
        .then(response => this.setState({test: response.data.userinfo}))
    }

    delayloadaxios = () => {

        this.user = {"user":this.state.activeuser}

        axios.post("/getuserinfo", this.user)
        .then(response => this.setState({test: response.data.userinfo}, this.loadcontent()))
    }

    loadcontent = () => {

        this.setState({genrecontent: []})
        this.setState({actorcontent: []})
        this.setState({directorcontent: []})

        this.state.genres.map((genre) => (
            this.state.genrecontent.push(
                <MenuItem value = {genre} id = "1">
                    {genre}
                </MenuItem>
            )
        ))

        this.state.actors.map((actor) => (
            this.state.actorcontent.push(
                <MenuItem value = {actor} id = "2">
                    {actor}
                </MenuItem>
            )
        ))

        this.state.directors.map((director) => (
            this.state.directorcontent.push(
                <MenuItem value = {director} id = "3">
                    {director}
                </MenuItem>
            )
        ))
    }

    openUserInfo = () => {

        this.user = {"user":this.state.activeuser}

        axios.post("/getuserinfo", this.user)
        .then(response => this.setState({userinfo: response.data.userinfo}), this.delayingaxios())

    }

    delayingaxios = () => {

        this.user = {"user":this.state.activeuser}
        axios.post("/getuserinfo", this.user)
        .then(response => this.setState({userinfo: response.data.userinfo}, this.openPage()))
    }

    openPage = () => {

        this.setState({openUserInfo: true})

    }

    deleteuser = () => {

        this.setState({showpopup: true})
    }

    confirmdelete = () => {

        this.user = {"user":this.state.activeuser}
        axios.post("/deletuser", this.user).then(response => this.setState({deleted : response.data}, window.location.reload()))

        // reload
        // window.location.reload()
    }

    interruptdelete = () => {
        this.setState({showpopup: false})
    }

    handlegenrechange = (event) => {

        this.setState({genre: event.target.value}, this.delayGenreChange())

    }

    delayGenreChange = () => {
        this.user = {"user":this.state.activeuser}
        axios.post("/getuserinfo", this.user)
        .then(response => this.setState({userinfo: response.data.userinfo}, this.openGenreChange()))
    }

    openGenreChange = () => {

        this.state.genre === "New Genre" ?
            this.setState({newGenre: true})
        :
        this.setState({alterGenre: true})

    }

    handleactorchange = (event) => {

        this.setState({actor: event.target.value}, this.delayActorChange())

    }

    delayActorChange = () => {
        this.user = {"user":this.state.activeuser}
        axios.post("/getuserinfo", this.user)
        .then(response => this.setState({userinfo: response.data.userinfo}, this.openActorChange()))
    }

    openActorChange = () => {

        console.log("actor:", this.state.genre)
        this.state.actor === "New Actor" ?
            this.setState({NewActor: true})
        :
        this.setState({AlterActor: true})

    }

    handledirectorchange = (event) => {

        this.setState({"director": event.target.value}, this.delayDirectorChange())
    }

    delayDirectorChange = () => {
        this.user = {"user":this.state.activeuser}
        axios.post("/getuserinfo", this.user)
        .then(response => this.setState({userinfo: response.data.userinfo}, this.openDirectorChange()))
    }

    openDirectorChange = () => {

        this.state.director === "New Director" ?
            this.setState({NewDirector: true})
        :
        this.setState({AlterDirector: true})

    }

    openwatchlist = () => {
        
        this.setState({showwatchlist: true})
    }

    showstate = () => {
        console.log("state:", this.state)
    }

    openmovielist = () => {

        this.setState({showmovielist: true})
    }

    logout = () => {

        this.setState({logout: true})

    }

    render () {

        return (
            <div>
                {this.state.openUserInfo ?
                    <AlterUserInfo {...this.state}/>
                :
                    this.state.newGenre ?
                        <NewGenre />
                    :
                    this.state.alterGenre ?
                        <AlterGenre {...this.state} />
                    :
                    this.state.AlterDirector ?
                        <AlterDirector {...this.state}/>
                    :
                    this.state.NewDirector ?
                        <NewDirector />
                    :
                    this.state.AlterActor ?
                        <AlterActor {...this.state}/>
                    :
                    this.state.NewActor ?
                        <NewActor />
                    :
                    this.state.showwatchlist ?
                        <Watchlist {...this.state}/>
                    :
                    this.state.showmovielist ?
                        <Movielist {...this.state} />
                    :
                    this.state.logout ?
                        navigation()
                    :
                    <div>
                        {/* <Button onClick = {this.showstate}>
                            showState
                        </Button> */}
                        <br/>
                        <InputLabel>
                            Edit Genres
                        </InputLabel>
                        <Select value = {this.state.genre} onChange = {this.handlegenrechange}>
                            {this.state.genrecontent}
                            <MenuItem value = "New Genre">
                                New Genre
                            </MenuItem>
                        </Select>
                        <br/>
                        <br/>
                        <InputLabel>
                            Edit Actors
                        </InputLabel>
                        <Select value = {this.state.actor} onChange = {this.handleactorchange}>
                            {this.state.actorcontent}
                            <MenuItem value = "New Actor">
                                New Actor
                            </MenuItem>
                        </Select>
                        <br/>
                        <br/>
                        <InputLabel>
                            Edit Directors
                        </InputLabel>
                        <Select value = {this.state.director} onChange = {this.handledirectorchange}>
                            {this.state.directorcontent}
                            <MenuItem value = "New Director">
                                New Director
                            </MenuItem>
                        </Select>
                        <br/>
                        <Button onClick = {this.openUserInfo}>
                            Edit User Info
                        </Button>
                        <br/>
                        <Button onClick = {this.openmovielist}>
                            Movielist
                        </Button>
                        <Button onClick = {this.openwatchlist}>
                            Watchlist
                        </Button>
                        <br/>
                        <Button onClick = {this.deleteuser}>
                            Delete Account
                        </Button>
                        {this.state.showpopup ?
                            <div>
                                Do you really want to delete your account with email: {this.state.activeuser}
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
                        <Button onClick = {this.logout}>
                            Log out
                        </Button>
                    </div>
                }
            </div>

        )
    }
}

export default MainPage;