import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import MyNavbar from "./navbar/navbar.js";
import ListInput from "./listinput/listinput.js";
import ListResult from "./listresult/listresult.js";

export default class App extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.submitItem = this.submitItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.state = {
      showList: "Please Login To Use App",
      showListInput: "",
      username: "",
    }
  }

  login(username, password) {
    return new Promise((resolve, reject) => {
      axios.post("/login", { username: username, password: password }).then((result) => {
        if (result.data.check) {
          localStorage.setItem("token", result.data.myToken);
          this.setState({
            showList: <ListResult />,
            showListInput: <ListInput submitItem={this.submitItem} removeItem={this.removeItem} />,
            username: username
          })
        }
        resolve(result);
      })
    })
  }

  submitItem(item) {
    return new Promise((resolve, reject) => {
      axios.post("/submit", { username: this.state.username, item: item, token: localStorage.getItem("token") }).then((result) => {

        resolve(result);
      })
    })
  }

  removeItem(item) {
    return new Promise((resolve, reject) => {
      axios.post("/remove", { username: this.state.username, item: item, token: localStorage.getItem("token") }).then((result) => {
        resolve(result);
      })
    })
  }

  render() {
    return (
      <div className="App">
        <MyNavbar login={this.login} />
        {this.state.showListInput}
        {/* {this.state.showList} */}
      </div>
    );
  }
}
