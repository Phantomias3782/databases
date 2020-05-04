import React from "react";
import { Switch, Link, Route} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import axios from "axios"

import Login from "../../contents/Login/login.jsx";
import Movielist from "../../contents/movielist/movielist.jsx"

export function navigation() {

    // load movielist for user
    let movielist = []
    axios.get("/loadmovielist").then(response => movielist.push(response.data.movies))

    return (
        <div>
            <nav>
                <Link to = "/login">
                    <Button>
                        Startpage
                    </Button>
                </Link>
            </nav>
            <Switch>
                <Route path = "/login" render = {() => <Login/>}/>
                <Route path = "/movielist" render = {() => <Movielist {...movielist}/>}/>
            </Switch>
        </div>
    )
}