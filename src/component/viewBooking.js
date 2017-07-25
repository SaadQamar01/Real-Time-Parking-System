import React, { Component } from 'react';
import * as firebase from 'firebase';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../App.css';
class ViewBooking extends Component {
    constructor() {
        super();
        this.state = {
            booking: [],
            Keys: [],
            checkAdmin: false
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                var currentEmail = firebase.auth().currentUser.email;
                if (currentEmail == "admin@gmail.com") {
                    this.setState({
                        checkAdmin: true
                    })
                }

                firebase.database().ref("booking").on("value", snap => {
                    let obj = snap.val();
                    // console.log(obj);
                    let booking = [];
                    let Keys = [];
                    for (let key in obj) {
                        Keys.push(key)
                        booking.push(
                            obj[key]
                        )
                    }
                    // console.log(jobKeys);
                    this.setState({
                        booking: booking,
                        Keys: Keys
                    })
                    // console.log(this.state);
                })
            }
        })
    }

    deleteBooking(index) {
        var key = this.state.Keys[index];
        firebase.database().ref('booking/' + key).remove();

    }
    render() {
        return (
            <div>
                {firebase.auth().currentUser ?
                    <div>
                        <ul className="allList">
                            <h1>All Bookings</h1>
                            {this.state.booking.map((data, index) => (

                                <li className="eachList" key={index}>
                                    Area Name: {data.areaName} <br />
                                    Slot No: {data.slot}   <br />
                                    Date: {data.date} <br />
                                    Start Time:  {data.startTime} <br />
                                    End Time: {data.endTime} <br />
                                    {this.state.checkAdmin ?
                                        <button onClick={this.deleteBooking.bind(this, index)}>Cancel</button>
                                        : <span></span>
                                    }
                                </li>
                            ))}
                        </ul>
                    </div>
                    :
                    <div>{this.props.history.push('/')}</div>}</div>
        );
    }
}
export default ViewBooking;