import React from "react"
import axios from "axios"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MainPage from "../MainPage/mainpage";

class AlterUserInfo extends React.Component{

    constructor(probs) {
        super(probs)
        console.log("alter user probs", probs)
        this.state = {
            activeuser: probs.activeuser,
            userinfo: probs,
            ofname: probs.userinfo.fname,
            olname: probs.userinfo.lname,
            ozipcode: probs.userinfo.ZipCode,
            ocity: probs.userinfo.City,
            ohomestate: probs.userinfo.HomeState,
            ocountry: probs.userinfo.Country,
            oeMail: probs.userinfo.eMail,
            obirthdate: probs.userinfo.Birthdate,
            oabotype: probs.userinfo.AboType, // make to drop down field
            obankaccount: probs.userinfo.BankAccount,
            nfname: probs.userinfo.fname,
            nlname: probs.userinfo.lname,
            nzipcode: probs.userinfo.ZipCode,
            ncity: probs.userinfo.City,
            nhomestate: probs.userinfo.HomeState,
            ncountry: probs.userinfo.Country,
            neMail: probs.userinfo.eMail,
            nbirthdate: probs.userinfo.Birthdate,
            nabotype: probs.userinfo.AboType, // make to drop down field
            nbankaccount: probs.userinfo.BankAccount,
            loadmainwindow: false,
            user_email: probs.activeuser
            
        }
    }

    showState = () => {
        console.log("here is state:", this.state)
    }

    handlefnameChange = (input) => {
        this.setState({nfname: input.target.value})
    }

    handlelnameChange = (input) => {
        this.setState({nlname: input.target.value})
    }

    handlezipcodeChange = (input) => {
        this.setState({nzipcode: input.target.value})
    }

    handlecityChange = (input) => {
        this.setState({ncity: input.target.value})
    }

    handlehomestateChange = (input) => {
        this.setState({nhomestate: input.target.value})
    }

    handlecountryChange = (input) => {
        this.setState({ncountry: input.target.value})
    }

    handleeMailChange = (input) => {
        this.setState({neMail: input.target.value})
    }

    handleabotypeChange = (input) => {
        this.setState({nabotype: input.target.value})
    }

    handlebankaccountChange = (input) => {
        this.setState({nbankaccount: input.target.value})
    }

    handlebirthdayChange = (input) => {
        this.setState({nbirthday: input.target.value})
    }

    submit = () => {

        this.credentials = {
            "fname": this.state.nfname,
            "lname": this.state.nlname,
            "zipcode": this.state.nzipcode,
            "city": this.state.ncity,
            "homestate": this.state.nhomestate,
            "country": this.state.ncountry,
            "email": this.state.neMail,
            "birthday": this.state.nbirthdate,
            "abotype": this.state.nabotype,
            "bankaccount": this.state.nbankaccount,
            "activeuser": this.state.activeuser
        }

        axios.post("/alteruserinfo", this.credentials).then(response => this.setState({"submit": response.data.loaded}))
        
        // reload window
        this.setState({"loadmainwindow": true})

    }

    render () {

        return (

            <div>
            {this.state.loadmainwindow ?
                <MainPage {...this.state}/>
            :
                <div>
                    <Button onClick = {this.showState}>
                        show State
                    </Button>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    First Name
                                </td>
                                <td>
                                    -----
                                </td>
                                <td>
                                    <TextField id = "FName" label = {this.state.ofname} onChange = {this.handlefnameChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Last Name
                                </td>
                                <td>
                                    -----
                                </td>
                                <td>
                                    <TextField id = "LName" label = {this.state.olname} onChange = {this.handlelnameChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Zip Code
                                </td>
                                <td>
                                    -----
                                </td>
                                <td>
                                    <TextField id = "zipcode" label = {this.state.ozipcode} onChange = {this.handlezipcodeChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    City
                                </td>
                                <td>
                                    -----
                                </td>
                                <td>
                                    <TextField id = "City" label = {this.state.ocity} onChange = {this.handlecityChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Home State
                                </td>
                                <td>
                                    -----
                                </td>
                                <td>
                                    <TextField id = "HomeState" label = {this.state.ohomestate} onChange = {this.handlehomestateChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Country
                                </td>
                                <td>
                                    -----
                                </td>
                                <td>
                                    <TextField id = "Country" label = {this.state.ocountry} onChange = {this.handlecountryChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    eMail
                                </td>
                                <td>
                                    -----
                                </td>
                                <td>
                                    <TextField id = "eMail" label = {this.state.oeMail} onChange = {this.handleeMailChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Birthday
                                </td>
                                <td>
                                    -----
                                </td>
                                <td>
                                    <TextField id = "birthday" label = {this.state.obirthdate} onChange = {this.handlebirthdayChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    AboType
                                </td>
                                <td>
                                    -----
                                </td>
                                <td>
                                    <TextField id = "abotype" label = {this.state.oabotype} onChange = {this.handleabotypeChange}/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Bank Account
                                </td>
                                <td>
                                    -----
                                </td>
                                <td>
                                    <TextField id = "bankaccount" label = {this.state.obankaccount} onChange = {this.handlebankaccountChange}/>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <Button onClick = {this.submit}>
                        Submit
                    </Button>
                </div>
            }
            </div>
        )
    }
}

export default AlterUserInfo