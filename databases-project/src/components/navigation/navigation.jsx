import React from "react";
import { Switch, Link, Route} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import Login from "../../contents/Login/login.jsx";

export function navigation() {

    return (
        <div>
            <nav>
                <Link to = "/login">
                    <Button>
                        <Button>
                            Anmeldeseite
                        </Button>
                    </Button>
                </Link>
            </nav>
            <Switch>
                <Route path = "/login" render = {() => <Login/>}/>
            </Switch>
        </div>
    )
}