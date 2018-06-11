import React from "react";
import DropDown from "./DropDown";
import PlaceOrder from "./PlaceOrder";
// import TickerTape from "./TickerTape";
import { Menu, Grid, Segment } from 'semantic-ui-react'

class AccountInfo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      account: props.account,
      positions: {}
    }
  }

  componentDidMount(){

    fetch(`http://localhost:3000/api/v1/positions/${this.props.account.id}`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }),
      withCredentials: true
    })
      .then(resp => resp.json())
      .then(json => {this.setState({
        positions: json
      })})
  }

  render() {
    console.log(this.state.account)
    console.log(this.state.positions)
    let usd = 0
    let btc = 0
    return (
      <div>
        <h5>Welcome: {this.props.account.username}</h5>
        <h5>{this.props.account.email}</h5>
        <h5>Cash (USD): 0</h5>
        <DropDown setTradingPair={this.props.setTradingPair}/>
        <PlaceOrder tradingPair={this.props.tradingPair}/>
      </div>
    )
  }
}

export default AccountInfo;
