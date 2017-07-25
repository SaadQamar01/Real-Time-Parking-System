import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App.js'
// import Jobs from './component/jobs.js'
// import Jobs from './component/jobs.js'
// import ViewJobs from './component/ViewJobs.js'
// import Student from './component/student.js'
// import LoggedinPannel from '../src/component/LoggedinPanel.js'
// import signup from '../component/signup.js'
import { BrowserRouter as  Router,Route,Link } from "react-router-dom";
// import { browserRouter as Router ,Route}
import * as firebase from 'firebase';
//   Initialize Firebase
  var config = {
    apiKey: "AIzaSyCATMKivMDQ-uh2Rg3cSKfrNNaPIoyI7fI",
    authDomain: "real-time-parking-system-b430d.firebaseapp.com",
    databaseURL: "https://real-time-parking-system-b430d.firebaseio.com",
    projectId: "real-time-parking-system-b430d",
    storageBucket: "real-time-parking-system-b430d.appspot.com",
    messagingSenderId: "794278590752"
  };
  firebase.initializeApp(config);


ReactDOM.render( <App /> ,document.getElementById('root'));