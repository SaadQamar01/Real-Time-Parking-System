import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../App.css';
class AddAreaAndSlot extends Component {
        constructor() {
        super();
        this.state = {
            areas: [],
            applier: [],
            keys: []
        }
    }
    addArea(ev) {
        ev.preventDefault();
        // for(let i=1;i<=this.refs.slots.value;i++){
        var arr=[];
                for(let i=1;i<=this.refs.slots.value;i++){
                    arr.push({
                        label: 'Slot No : ' + i
                    })
                    // arr.push(i)
                }
        // }
        var areas = firebase.database().ref("Areas/"+this.refs.name.value).set(arr);
        // this.setState({
        //     areas: [...this.state.areas, area]
        // })
        this.refs.name.value="";
        this.refs.slots.value="";
        alert("Add Area");

    }
    // componentDidMount() {
    //     firebase.auth().onAuthStateChanged(() => {
    //         if (firebase.auth().currentUser) {
    //             firebase.database().ref('jobs').orderByChild('uid').equalTo(firebase.auth().currentUser.uid).once('value').then((snap) => {
    //                 var obj = snap.val();
    //                 let keys = []
    //                 let jobs = [];
    //                 for (let key in obj) {
    //                     keys.push(key);
    //                     jobs.push(obj[key]);
    //                 }
    //                 // console.log(jobs);
    //                 this.setState({ jobs, keys })
    //                 // console.log(this.state.jobs);
    //             })

    //         }
    //     })
    // }

render(){
    return(
        // <h1>Add Area And Slot</h1>
        <div>
        {firebase.auth().currentUser?
            <div className="addArea">
               Area Name:<input type="text" ref="name"/><br/>
               Enter Slots:<input type="number" ref="slots"/>   <br />
               <button onClick={this.addArea.bind(this)}>Add</button>
                </div>
            //  <ul className="list">
            //         <h1>All Area</h1>
            //         {this.state.jobs.map((job, index) => (
            //             <li className="eachList" key={index}>
            //                 {<span>Area Name: </span>}   {job.jobTitle} <br />
            //                 {<span>How many slots: </span>}  {job.salary}   <br />
            //                 <span>Areas :</span>{
            //                     <Applicants index={index} keys={this.state.keys} />
            //                 }
            //             </li>
            //         ))}
            //     </ul>
            :          <div>{this.props.history.push('/')}</div>}
                </div>
    )
}
}
export default AddAreaAndSlot;