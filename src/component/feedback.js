import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../App.css';
class Feedback extends Component {
    constructor() {
        super();
        this.state = {
            reply: null,
            check: false
        }
    }
    componentDidMount() {
        var checkReply = firebase.database().ref('feedback/' + firebase.auth().currentUser.uid)

        checkReply.child('reply').on('value', snap => {
            var obj = snap.val();
            if (obj != null) {
                //    console.log(obj,"nice");
                this.setState({
                    reply: obj.reply,
                    check: true
                })
            }
            //    console.log(obj);
        })


    }

    feedback() {
        firebase.database().ref('feedback/' + firebase.auth().currentUser.uid + '/feedback/').set(
            {
                feedback: this.refs.feedback.value,
                email: firebase.auth().currentUser.email
            }
        );
        this.refs.feedback.value = "";
        //   console.log(this.refs.feedback.value);
    }
    render() {
        return (
            <div>
                {firebase.auth().currentUser ?

                    <div className="addArea">
                        <li>Reply:</li>
                        {this.state.check ?
                            <span>{this.state.reply}</span>
                            : <span>No Reply from Admin Side</span>
                        } <br />
                        <textarea ref="feedback"></textarea><br />
                        <button onClick={this.feedback.bind(this)} >Send</button>
                    </div>
                    : <div>{this.props.history.push('/')}</div>}
            </div>
        )
    }
}
export default Feedback;