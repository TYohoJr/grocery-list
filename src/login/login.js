import React, { Component } from 'react';
import './login.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.runLogin = this.runLogin.bind(this);
    this.showPassword = this.showPassword.bind(this);
    this.state = {
      modal: false,
      username: "",
      password: "",
      showPasswodType: "password"
    };
  }

  runLogin() {
    this.props.login(this.state.username, this.state.password).then((result) => {
      if (result.data.check) {
        localStorage.setItem('token', result.data.myToken);
        alert(result.data.message);
        this.setState({
          modal: false,
          username: "",
          password: ""
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

  showPassword() {
    if (this.state.showPasswodType === "password") {
      this.setState({
        showPasswodType: "text"
      })
    } else {
      this.setState({
        showPasswodType: "password"
      })
    }
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
              <input type={this.state.showPasswodType} name="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
              <br />
              <div><input type="checkbox" onChange={this.showPassword} />Show Password</div>
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
