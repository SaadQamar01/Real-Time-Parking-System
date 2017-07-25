import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import logo from './logo.svg';
// import { BrowserRouter as  Router,Route,Link } from "react-router-dom";
class Signin extends Component {
  // constructor(){
  //   super();
  //   this.state={
  //     students :[]

  //   }
  // }
    logIn(){
    var userEmail = this.refs.email.value;
    var userPass = this.refs.pass.value;
        const auth=firebase.auth();
        const promise=auth.signInWithEmailAndPassword(userEmail,userPass)
       .then((data)=>{
        // this.props.history.push('/student');
        if(userEmail==="admin@gmail.com" && userPass==="admin12345"){
          this.props.history.push('/admin');
        }
        else{
       this.props.history.push('/user');
        }})
           .catch(function(error){alert(error)})
}
  render(){
      return(
      <div className="form">
      <form onSubmit={(ev)=>{
        ev.preventDefault();
        (this.logIn.bind(this))()
      }}>
     Email:<br/><input className="form-control" type="email" ref="email"/><br/>
     Password:<br/><input className="form-control" type="password" ref="pass"/><br/>
    <input type="submit" value="Sign In"/>
      </form>
      </div>
      );
}
}
export default Signin;