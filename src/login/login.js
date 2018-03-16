import React, { Component } from 'react';
import './login.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.runLogin = this.runLogin.bind(this);
    this.state = {
      modal: false,
      username: "",
      password: "",
    };
  }

  // login() {
  //   axios.post("/login", { username: this.state.username, password: this.state.password }).then((result) => {
  //     if (result.data.check) {
  //       localStorage.setItem('token', result.data.myToken);
  //       alert(result.data.message);
  //       this.setState({
  //         modal: false
  //       })
  //     } else {
  //       alert(result.data.message);
  //     }
  //   })
  // }

  runLogin() {
    this.props.login(this.state.username, this.state.password).then((result) => {
      if (result.data.check) {
        localStorage.setItem('token', result.data.myToken);
        alert(result.data.message);
        this.setState({
          modal: false,
          username:"",
          password:""
        })
      } else {
        alert(result.data.message);
      }
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onUsernameChange = (e) => {
    this.setState({
      username: (e.target.value)
    });
  }

  onPasswordChange = (e) => {
    this.setState({
      password: (e.target.value)
    });
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>Login</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Login Below</ModalHeader>
          <ModalBody>
            <form>
              <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onUsernameChange} />
              <br />
              <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.runLogin}>Login</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
