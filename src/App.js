import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import Signup from "./component/signup.js";
import Signin from "./component/signin.js";
import Admin from "./component/admin.js";
import User from "./component/user.js";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as firebase from "firebase";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      auth: true,
      anchorEl: null
    };
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };


  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user);
      if (user) {
        this.setState({
          email: user.email
        });
      } else {
        this.setState({
          email: null
        });
      }
    });
  }

  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={this.handleChange}
              aria-label="LoginSwitch"
            />
          }
          label={auth ? "Logout" : "Login"}
        />
      </FormGroup>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            // className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            // className={classes.flex}
          >
            Real-time Parking Booking System
          </Typography>
          {auth && (
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : null}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
      // <div className="background">
      //   <div className="nav">
      //     <h1 className="heading1">Real-time Parking Booking System</h1>
      //     <Router>
      //       <div className="container">
      //         {/* {!this.state.email?
      //       <div className="container-fluid">
      //       <Link to="/" className="button btn btn-primary">Sign In</Link>
      //       <Link to="/signup" className="button btn btn-primary">Sign Up</Link>
      //     </div>
      //     :
      //     <div className="container-fluid">
      //       <Link to="/" onClick={
      //         ()=>{
      //           firebase.auth().signOut()
      //           }
      //         }
      //        className="button btn btn-primary">Sign Out</Link>
      //     </div>} */}
      //         <Route exact path="/" component={Signin} />
      //         <Route path="/signup" component={Signup} />
      //         <Route path="/admin" component={Admin} />
      //         <Route path="/user" component={User} />
      //       </div>
      //     </Router>
      //   </div>
      // </div>
    );
  }
}
export default App;
