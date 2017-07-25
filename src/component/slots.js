
import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Slots extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <h1>Slots</h1>
        //    <table >
        //         <tr >
        //             {this.props.data.map((d,i)=>(

                    

        //             <td key={i}><button>{d.label}</button></td>
                   
   
                    
        //           ))}
        //            </tr>
        //         </table>
        )
    }
}
export default Slots;