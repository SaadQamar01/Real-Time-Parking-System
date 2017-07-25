import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../App.css';
import ViewLocation from './viewLocation.js'
import BookingParking from './bookingParking.js'
import ViewBooking from './viewBooking.js'
import Feedback from './feedback.js'
import Receipt from './receipt.js'
import image from '../cover.jpg'
import imageDp from '../dp.png'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class User extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: null,
        email: null,
        checkLoggedIn:false
      }
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      if (firebase.auth().currentUser) {

        var Rootref = firebase.database().ref().child("user/" + firebase.auth().currentUser.uid);
        Rootref.on("value", snap => {
          let currentUserObj = snap.val()

          this.setState({
            user: currentUserObj
          });
          // console.log(this.state.user);
        })
      }
    })
  }
  // <Link to="/bookingParking" className="link">Booking Parking</Link>
  render() {
    return (
      <div>
        {firebase.auth().currentUser ?
          <div>
          <div className="userName">User</div>
          <div className="Links">
            <Router>
              <div>
                <Link to="/viewLocation" className="link">View Location</Link>
                <Link to="/receipt" className="link">View Receipt</Link>
                <Link to="/viewBooking" className="link">View Booking</Link>
                <Link to="/feedback" className="link">Feedback</Link>

                <Route exact path="/viewLocation" component={ViewLocation} />
                <Route path="/bookingParking/:name/:index" component={BookingParking} />
                <Route path="/viewBooking" component={ViewBooking} />
                <Route path="/feedback" component={Feedback} />
                <Route path="/receipt" component={Receipt} />
              </div>
            </Router>
          </div>
          <img src={image} className="cover" title="Cover" height="400px" width="1440px" />
          <img src={imageDp} className="dp" title="Cover" height="200px" width="200px" />
          <div className="userInfo">
            <h1>User Information</h1>
            <h3> Name :  {this.state.user.name}</h3>
            <h3> Email : {this.state.user.email}  </h3>
            </div>
          </div>
       :
          <div>{this.props.history.push('/')}</div>}
      </div>
    )
  }
}
export default User;