import React from 'react'
import { Grid, Form, Checkbox, Button, Input } from 'semantic-ui-react'

const baseUrl = "http://localhost:3000";

class CreateAccount extends React.Component {
  state = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    invalidUsernameOrEmail: false
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (props) => {
    if(this.state.username !== '' && this.state.password !== '' && this.state.email.includes('@')){
      fetch('http://localhost:3000/api/v1/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          cash_deposited: 0
        })
      })
      .then(resp => resp.json())
      .then(json => {
        if(json.id === null){
          this.setState({
            invalidUsernameOrEmail: true
          })
        }
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
            }
          })
      })
    } else {
      this.setState({
        invalidUsernameOrEmail: true
      })
      //display invalid login
    }
  }

  render(){
    console.log(this.state.invalidUsernameOrEmail)
    return(
      <Grid style={{margin:'20px', padding:'10px', backgroundColor:'rgba(255,255,255,0.4)'}}>
        <Grid.Row>
          <Grid.Column width= {5}/>
          <Grid.Column width={6}>
          <Form onSubmit={()=> this.handleSubmit(this.props)}>
            <Form.Field>
              <label>Username</label>
              <Input onChange={this.handleChange} name="username" value={this.state.username} placeholder='Username' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input onChange={this.handleChange} name="password" value={this.state.password} placeholder='Password' />
            </Form.Field>
            <Form.Field>
              <label>First Name</label>
              <Input onChange={this.handleChange} name="firstName" value={this.state.firstName} placeholder='First Name' />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <Input onChange={this.handleChange} name="lastName" value={this.state.lastName} placeholder='Last Name' />
            </Form.Field>
            <Form.Field>
              <label>Email</label>
              <Input onChange={this.handleChange} name="email" value={this.state.email} placeholder='Email' />
            </Form.Field>
            <Form.Field>
              <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Grid.Column>
        <Grid.Column width= {5}/>
        </Grid.Row>
        {
          this.state.invalidUsernameOrEmail ?
          <p style={{padding:'5px', margin:'0 auto', color:'red', backgroundColor:'rgba(255,255,255,0)'}}>The username or password is already taken or the form in incomplete.</p>
          :
          null
        }
      </Grid>
    )
  }
}

export default CreateAccount
