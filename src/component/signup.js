import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Signup extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    signUp() {
        var userEmail = this.refs.email.value;
        var userPass = this.refs.pass.value;
        const auth = firebase.auth();
        auth.createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) { alert(error) })
            .then(data => {
                firebase.auth().currentUser.updateProfile({
                    displayName: this.refs.name.value,
                })
                var rootRef = firebase.database().ref();
                const speedRef = rootRef.child("user" + "/" + firebase.auth().currentUser.uid).set({
                    email: userEmail,
                    password: userPass,
                    name: this.refs.name.value,
                })
                //    this.props.history.push('/')
                this.refs.name.value = "";
                this.refs.email.value = "";
                this.refs.pass.value = "";
            })
    }
    render() {
        return (
            <div className="form">
                <form onSubmit={ev => ev.preventDefault()}>
                    Name:<br /><input className="form-control" type="text" ref="name" /><br />
                    Email:<br /><input className="form-control" type="email" ref="email" /> <br />
                    Password:<br /><input className="form-control" type="password" ref="pass" /><br />
                    <button onClick={this.signUp.bind(this)}>Sign Up</button>
                </form>
            </div>
        )
    }
}
export default Signup;