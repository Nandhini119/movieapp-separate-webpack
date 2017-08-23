import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Paper,TextField,RaisedButton} from 'material-ui';
import {Row, Col} from 'react-flexbox-grid';
import {teal100} from 'material-ui/styles/colors';
import {Link, Redirect} from 'react-router-dom';
import $ from 'jquery';
import Home from '../movie/Home.js';
import Route from './../../congifroute/routes.js';

const style = {
    paperstyle: {
        margin: '50px',
        textAlign: 'center',
        backgroundColor: teal100
    },
    raisedstyle: {
        margin: '12'
    }
}
class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            authentication: false
        };
        this.handleemail = this.handleemail.bind(this);
        this.handlepassword = this.handlepassword.bind(this);
        this.handlesubmit = this.handlesubmit.bind(this);
    }
    handleemail(e) {
        var emailid = e.target.value;
        this.setState({
            email: emailid
        });
        localStorage.setItem("email", emailid);
    }
    handlepassword(e) {
        var pass = e.target.value;
        this.setState({
            password: pass
        });
    }
    handlesubmit() {
        if (this.state.email.length == 0 || this.state.password.length == 0) {
            alert("Please enter credentials");
        } else {
            let obj = this;
            $.ajax({
                url: Route.login,
                type: 'POST',
                data: {
                    username: this.state.email,
                    password: this.state.password
                },
                success: function(response) {
                    obj.setState({
                        authentication: true
                    });

                },
                error: function(err) {
                    alert("error in login");
                    console.log("error: == " + err)

                }
            })
        }
    }
    logout() {
        this.setState({
            authentication: false
        });
    }
    render() {

        return ( < MuiThemeProvider >
            < Row around = 'xs' >
            < Col center = 'xs'
            xs = {
                8
            }
            md = {
                6
            } >
            < Paper style = {
                style.paperstyle
            }
            zDepth = {
                4
            } >

            < TextField floatingLabelText = "Username"
            value = {
                this.state.email
            }
            floatingLabelFixed = {
                true
            }
            type = "email"
            onChange = {
                this.handleemail
            }
            /> < br / >
            < TextField floatingLabelText = "Password"
            value = {
                this.state.password
            }
            floatingLabelFixed = {
                true
            }
            onChange = {
                this.handlepassword
            }
            type = "password" / >
            < br / >
            < RaisedButton label = "Login"
            onClick = {
                this.handlesubmit
            }
            primary = {
                true
            }
            style = {
                style.raisedstyle
            }
            /> {
                this.state.authentication ?
                    < Redirect to = '/home' > < /Redirect>:''
            }

            <Link to = "/signup">
                          <RaisedButton label="Signup" primary={true} style={style.raisedstyle} />
                        </Link>
             < /Paper> < /Col> < /Row>

            < /MuiThemeProvider>
        );
    }
}
export default Login;
