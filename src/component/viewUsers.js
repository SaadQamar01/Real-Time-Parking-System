import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class ViewUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            check: false
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                if (firebase.database().ref("user")) {
                    firebase.database().ref("user").on("value", snap => {
                        let obj = snap.val();

                        let users = [];
                        for (let a in obj) {
                            users.push(obj[a])
                        }
                        this.setState({
                            users: users,
                            check: true
                        })
                    })
                }
            }
        })
        // console.log(this.state.users);
    }

    render() {
        return (
            <div>
                {firebase.auth().currentUser ?
                    <div>
                        {
                            this.state.check ?
                                <div className="div3">
                                    <h1>All User</h1>
                                    {this.state.users.map((data) => {
                                        return <div className="eachList">
                                            {<span>Email: </span>}      {data.email}<br />
                                            {<span>Name: </span>}       {data.name}<br />
                                        </div>
                                    })
                                    }
                                </div>
                                :
                                <div className="div3">No Users</div>
                        }
                    </div>
                    :
                    <div>{this.props.history.push('/')}</div>}
            </div>
        )
    }
}
export default ViewUsers;
