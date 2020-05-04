import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class NewUser extends React.Component {

    constructor(probs) {
        super(probs)
        this.state = {
            tfname: "Max",
            tlname: "Mustermann",
            tzipcode: "zip in format: xxxx",
            tcity: "Boston",
            thomestate: "Texas",
            tcountry: "U.S.A",
            teMail: "max@mustermann.com",
            tbirthday: "birthday in format: 2000-01-01",
            tabotype: "Premium / Test / Standard", // make to drop down field
            tbankaccount: "bank in format: xxxx xxxx xxxx",
            fname: "Max",
            lname: "Mustermann",
            zipcode: "xxxx",
            city: "Boston",
            homestate: "Texas",
            country: "U.S.A",
            eMail: "max@mustermann.com",
            birthday: "2000-01-01",
            abotype: "Premium / Test / Standard", // make to drop down field
            bankaccount: "xxxx xxxx xxxx"
        }
    }

    submit = () => {

        this.credentials = {
            "fname": this.state.fname,
            "lname": this.state.lname,
            "zipcode": this.state.zipcode,
            "city": this.state.city,
            "homestate": this.state.homestate,
            "country": this.state.country,
            "email": this.state.eMail,
            "birthday": this.state.birthday,
            "abotype": this.state.abotype,
            "bankaccount": this.state.bankaccount
        }

        axios.post("/registration", this.credentials).then(response => this.setState({"submit": response.data.loaded}))
        
        // reload window
        window.location.reload()
    }

    handlefnameChange = (input) => {
        this.setState({fname: input.target.value})
    }

    handlelnameChange = (input) => {
        this.setState({lname: input.target.value})
    }

    handlezipcodeChange = (input) => {
        this.setState({zipcode: input.target.value})
    }

    handlecityChange = (input) => {
        this.setState({city: input.target.value})
    }

    handlehomestateChange = (input) => {
        this.setState({homestate: input.target.value})
    }

    handlecountryChange = (input) => {
        this.setState({country: input.target.value})
    }

    handleeMailChange = (input) => {
        this.setState({eMail: input.target.value})
    }

    handleabotypeChange = (input) => {
        this.setState({abotype: input.target.value})
    }

    handlebankaccountChange = (input) => {
        this.setState({bankaccount: input.target.value})
    }

    handlebirthdayChange = (input) => {
        this.setState({birthday: input.target.value})
    }

    render () {

        return (
            <div>
                <TextField id = "FName" label = {this.state.tfname} onChange = {this.handlefnameChange}/>
                <br/>
                <TextField id = "LName" label = {this.state.tlname} onChange = {this.handlelnameChange}/>
                <br/>
                <TextField id = "zipcode" label = {this.state.tzipcode} onChange = {this.handlezipcodeChange}/>
                <br/>
                <TextField id = "City" label = {this.state.tcity} onChange = {this.handlecityChange}/>
                <br/>
                <TextField id = "HomeState" label = {this.state.thomestate} onChange = {this.handlehomestateChange}/>
                <br/>
                <TextField id = "Country" label = {this.state.tcountry} onChange = {this.handlecountryChange}/>
                <br/>
                <TextField id = "eMail" label = {this.state.teMail} onChange = {this.handleeMailChange}/>
                <br/>
                <TextField id = "birthday" label = {this.state.tbirthday} onChange = {this.handlebirthdayChange}/>
                <br/>
                <TextField id = "abotype" label = {this.state.tabotype} onChange = {this.handleabotypeChange}/>
                <br/>
                <TextField id = "bankaccount" label = {this.state.tbankaccount} onChange = {this.handlebankaccountChange}/>
                <br/>
                <Button onClick = {this.submit}>
                    Submit
                </Button>
            </div>
        )
    }
}

export default NewUser