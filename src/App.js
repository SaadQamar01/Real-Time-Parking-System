import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Signup from './component/signup.js'
import Signin from './component/signin.js'
import Admin from './component/admin.js'
import User from './component/user.js'

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
        email: null
    }
  }

componentDidMount(){
  firebase.auth().onAuthStateChanged((user)=>{
    // console.log(user);
    if (user) {
      this.setState({
        email : user.email})
    }
    else{
   this.setState({

        email : null
             })
    }
    
  })
}


render() {
  return (

    <div className="background">
    <div className="nav">
    <h1 className="heading1">Real-time Parking Booking System</h1>
      <Router>
      <div className="container">
          {!this.state.email?
            <div className="container-fluid">
            <Link to="/" className="button btn btn-primary">Sign In</Link>
            <Link to="/signup" className="button btn btn-primary">Sign Up</Link>
          </div>
          :
          <div className="container-fluid">
            <Link to="/" onClick={
              ()=>{
                firebase.auth().signOut()
                }
              }
             className="button btn btn-primary">Sign Out</Link>
          </div>}
          <Route exact path="/" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/admin" component={Admin}/>
          <Route path="/user" component={User}/>
      </div>
      </Router>
      </div>
      </div>
  );
}
}
export default App;
