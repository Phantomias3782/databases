import React from "react";
import axios from "axios"
import Button from '@material-ui/core/Button';

import {overview} from "../../components/overview/overview.jsx"

class MainPage extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            showDatabase: false
        }
    }

    useEffect = () => {

        // obsolete - now axios in use
        /*fetch("/time").then(function(response){ return response.json();})
        .then(function(data) {
            const items = data;
            console.log(items)
        })

        fetch("/time")
        .then(response => response.json())
        .then(data => this.setState({ data }));*/

        this.setState({ loading: true }) // with this "trick" the loading time while data extraction can be catched up
        axios.get("/time")
        .then(result => this.setState({
            time: result.data.time,
            loading: false
        }))

        console.log("state", this.state)
    }

    render () {

        return (
            <div>
                <div>
                    Das ist die Hauptseite, an der die Datenbank angezeigt werden soll.
                </div>
                <br/>
                <Button onClick = {this.useEffect}>
                    aktuelle Zeit
                </Button>
                <br/>
                <div>
                    {overview()}
                </div>
            </div>

        )
    }
}

export default MainPage;