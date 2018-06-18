import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import logo from "./logo.svg";
import "./App.css";
import "./App.css";
import Login from "./Login";
import AccountContainer from "./AccountContainer";
import CreateAccount from "./CreateAccount";
import AccountStats from "./AccountStats";

class App extends Component {
  constructor(){
    super();

    this.state = {
      loggedIn: false,
      newAccount: false,
      currentAccount: {}
    }
  }

  componentDidMount() {
    localStorage.getItem("token") ? this.setState({loggedIn: true}) : this.setState({loggedIn: false})
  }

  handleLogIn = () => {
    this.setState({
      loggedIn: true
    })
  }

  handleLogOut = () => {
    this.setState({
      loggedIn: false
    })
    localStorage.removeItem("token")
  }

  handleRoute = () => {

  }

  render() {

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Crypto Trader</h1>
          </header>
          <NavBar loggedIn={this.state.loggedIn} handleLogOut={()=> this.handleLogOut()}/>
          {this.state.loggedIn ? (
            <div>
              <Redirect to='/display' />
              <Route path='/display' render={() => <AccountContainer />} />
              <Route path='/limitOrders' render={() => <AccountStats />} />

            </div>
          ) : (
            <div>
              <Route path='/login' render={(props) => <Login loggedIn={this.state.loggedIn} handleRoute={this.handleRoute} handleLogIn={this.handleLogIn}/>} />
              <Route path='/CreateAccount' render={(props) => <CreateAccount loggedIn={this.state.loggedIn} handleLogIn={this.handleLogIn}/>} />
            </div>
          )}
        </div>
      </Router>
    );
  }
}

export default App;
