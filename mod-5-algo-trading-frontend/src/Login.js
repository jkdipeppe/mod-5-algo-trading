import React from "react";
import { Form, Button } from "semantic-ui-react"


const baseUrl = "http://localhost:3000";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    invalid: false
  };

  login = e => {

    e.preventDefault();
    fetch(`${baseUrl}/login`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res =>
        res.json())
      .then(json => {
        if(json.token) {
          localStorage.setItem("token", json.token);
          this.props.handleLogIn()
        } else {
          this.setState({
            invalid: true
          })
        }
        this.props.handleRoute()
      })
  };

  render() {

    return (
      <div>
        <Form centered style={{margin:'0 auto', width:'200px', padding:'5px'}}>
          <input
            name="username"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
            placeholder="username"
          />
          <input
            name="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="password"
          />
        <Button style={{backgroundColor:'gray', padding:'10px', margin:'10px'}} onClick={this.login.bind(this)}>Login</Button>
        </Form>
      {
        this.state.invalid ?
        <p style={{textColor:'red'}}>Incorrect Username or Password</p>
        :
        null
      }
      </div>
    );
  }
}

export default Login;
