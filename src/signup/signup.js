import React, { Component } from 'react';
import './signup.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";

export default class Signup extends Component {
    constructor() {
        super()
        this.signup = this.signup.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPassword2Change = this.onPassword2Change.bind(this);
        this.state = {
            modal: false,
            username: "",
            password: "",
            password2: ""
        };
    }

    signup() {
        if (this.state.password === this.state.password2) {
            if (this.state.password.length < 6) {
                alert(`Password requirements:\nAt least 6 characters long\nAt least one uppercase letter\nAt least one number`)
            } else if (this.state.password === this.state.password.toLowerCase) {
                alert(`Password requirements:\nAt least 6 characters long\nAt least one uppercase letter\nAt least one number`)
            } else {
                axios.post("/signup", { username: this.state.username, password: this.state.password }).then((result) => {
                    console.log(result.data);
                    alert(result.data.message);
                    this.setState({
                        modal: false
                    })
                })
            }
        } else {
            alert(`Passwords must match!`)
        }
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

    onPassword2Change = (e) => {
        this.setState({
            password2: (e.target.value)
        });
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>Signup</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Signup Below</ModalHeader>
                    <ModalBody>
                        <form>
                            <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.onUsernameChange} />
                            <br />
                            <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
                            <br />
                            <input type="password" name="password2" placeholder="Re-enter Password" value={this.state.password2} onChange={this.onPassword2Change} />
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.signup}>Signup</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
