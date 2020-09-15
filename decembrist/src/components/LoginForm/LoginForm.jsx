import React, {Component} from "react";
import './LoginForm.css';

class LoginForm extends Component {
    state = {
        username: "",
        password: "",
    }

    setUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    setPassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleLogin = () => {
        this.props.setApp("contest")
    }

    render() {
        return (
            <div className="login-form">
                <h2>Hi, I'm Julia.</h2>
                <div className="form-info" id="form-info">Tell me your username and password.</div>
                <label htmlFor="username"/>
                <input type="text"
                       placeholder="Username"
                       value={this.state.username}
                       onChange={this.setUsername}/>
                <label htmlFor="password"/>
                <input type="password"
                       placeholder="Password"
                       value={this.state.password}
                       onChange={this.setPassword}
                       autoComplete="on"/>
                <button className="login-button" type="button" id="login-button" onClick={this.handleLogin}>
                    Login
                </button>
                <div className="change-form">
                    <div className="reset-password">
                         <span onClick={this.props.setForm.bind(this, "reset")} id="change-to-reset-password-form">
                             I forgot my password.
                         </span>
                    </div>
                    <div className="registration">
                         <span onClick={this.props.setForm.bind(this, "registration")} id="change-to-registration-form">
                             We're not acquainted.
                         </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginForm