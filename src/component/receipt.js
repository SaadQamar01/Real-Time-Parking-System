import React, { Component } from 'react';
import * as firebase from 'firebase';
class Receipt extends React.Component {
    constructor() {
        super();
        this.state = {
            booking: [],
            keys: [],
            check: false
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                firebase.database().ref('booking').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).on('value', snap => {
                    var obj = snap.val();
                    let keys = []
                    let booking = [];
                    for (let key in obj) {
                        keys.push(key);
                        booking.push(obj[key]);
                    }
                    // console.log(jobs);
                    this.setState({ booking: booking, keys: keys })
                    console.log(this.state.booking);
                    console.log(this.state.keys);
                })

            }
        })
    }
    deleteBooking(index) {
        // console.log(this.state);
        // console.log(index);
        // console.log(this.state.keys);
        var key = this.state.keys[index];
        firebase.database().ref('booking/' + key).remove();

    }
    render() {
        return (
            <div>
                {firebase.auth().currentUser ?
                    <div>
                        <ul className="allList">
                            <h1>Your Bookings</h1>
                            {this.state.booking.map((data, index) => (

                                <li className="eachList" key={index}>
                                    Area Name: {data.areaName} <br />
                                    Slot No: {data.slot}   <br />
                                    Date: {data.date} <br />
                                    Start Time:  {data.startTime} <br />
                                    End Time: {data.endTime} <br />
                                    <button onClick={this.deleteBooking.bind(this, index)}>Cancel</button>

                                </li>
                            ))}
                        </ul>
                    </div>
                    : <div>{this.props.history.push('/')}</div>}
            </div>
        );
    }
}
export default Receipt;