import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../App.css';
class ViewLocation extends Component {
    constructor() {
        super();
        this.state = {
            areaObj: [],
            areaName: []
        }
    }
    componentDidMount() {
        firebase.database().ref("Areas").on("value", snap => {
            var areaObj = snap.val();
            //     this.setState({
            //    areaObj: areaObj
            // })
            //   console.log(areaObj);
            var obj = [];
            var areaName = [];
            for (let key in areaObj) {
                obj.push(areaObj[key])
                areaName.push(key)
                // console.log(key);
                // for(var i=0;i<areaObj[key].length;i++){
                //     console.log(areaObj[key][i]);
                // }
            }
            // console.log(obj,"Got");
            this.setState({
                areaObj: obj,
                areaName: areaName
            })

            // console.log(this.state);
        })
    }
    slot(name, index) {
        console.log(name, index + 1);
    }
    render() {
        // var arr=[[1,2],[3,4]];
        return (
            //  <h1>all location</h1>
            <div>
                {firebase.auth().currentUser ?
                    <div className="areas">
                        {this.state.areaObj.map((data, index) => (
                            <table key={index}>
                                <tr ><span>{this.state.areaName[index]}</span>
                                    <br />
                                    {data.map((d, i) => (
                                        <td key={i}>
                                            <Link to={`/bookingParking/${this.state.areaName[index]}/${i + 1}`}>   <button >{d.label}</button></Link>
                                        </td>
                                    ))}
                                </tr><br />
                            </table>
                        ))}
                    </div>
                    :
                    <div>{this.props.history.push('/')}</div>}
            </div>
        )
    }
}
export default ViewLocation;
// <div className="addArea">
//         {this.state.areaObj.map((data,index)=>(
//           <Slots data={data} key={index}/>
//         ))}
//         </div>
// <Link to="/slots"><button>View Slots</button></Link>