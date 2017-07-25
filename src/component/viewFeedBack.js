import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../App.css';
class ViewFeedBack extends Component {
    constructor() {
        super();
        this.state = {
            allFeedback: [],
            allkeys: [],
            check: false
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(() => {
            if (firebase.auth().currentUser) {
                if (firebase.database().ref("feedback")) {
                    firebase.database().ref("feedback").on("value", snap => {
                        let obj = snap.val();
                        let feedback = [];
                        let allKeys = [];
                        for (let key in obj) {
                            allKeys.push(key);
                            feedback.push(obj[key])
                        }
                        // console.log(feedback);
                        this.setState({
                            allFeedback: feedback,
                            allkeys: allKeys,
                            check: true
                        })
                        // console.log(this.state);
                    })
                }
            }
        })
    }
    reply(index) {
        firebase.database().ref('feedback/' + this.state.allkeys[index] + '/reply/').set({ reply: this.refs.reply.value });
        this.refs.reply.value = "";
        //   console.log(this.refs.feedback.value);
    }
    render() {
        return (
            <div>
                {firebase.auth().currentUser ?
                    <div>
                        {this.state.check ?
                            <ul className="allList">
                                <h1>All Feedback</h1>
                                {this.state.allFeedback.map((data, index) => (
                                    <div>
                                        <li className="eachList" key={index}>
                                            <span>Feedback: </span>{data.feedback.email}<br />
                                            {data.feedback.feedback}<br />
                                            <textarea ref="reply"></textarea><br />
                                            <button onClick={this.reply.bind(this, index)} >Reply</button>
                                        </li>

                                    </div>
                                ))}
                            </ul>
                            :
                            <div className="allList">No Feedback</div>
                        }
                    </div>
                    :
                    <div>{this.props.history.push('/')}</div>}
            </div>
        )
    }
}
export default ViewFeedBack;

