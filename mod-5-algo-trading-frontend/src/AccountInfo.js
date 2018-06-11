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
      usdPosition: {},
      btcPosition: {},
      ethPosition: {},
      bchPosition: {},
      ltcPosition: {}
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
      .then(json => {
        json.forEach(position => {
          let symbol = position.trading_pair.substring(0,3).toLowerCase()
          this.setState({
            [`${symbol}Position`]: position
          })
        })
      })
  }

  render() {
    console.log('cheicking full state', this.state)
    console.log(this.state.positions)
    let usd = this.state.usdPosition.quantity
    let btc = this.state.btcPosition.quantity

    let cryptoPosition = this.state[`${this.props.tradingPair.substring(0,3).toLowerCase()}Position`]
    return (
      <div>
        <h5>Welcome: {this.props.account.username}</h5>
        <h5>Cash (USD): {usd}</h5>
        <p>BTC: {this.state.btcPosition.quantity}</p>
        <p>ETH: {this.state.ethPosition.quantity}</p>
        <p>LTC: {this.state.ltcPosition.quantity}</p>
        <p>BCH: {this.state.bchPosition.quantity}</p>
        <DropDown setTradingPair={this.props.setTradingPair}/>
        <PlaceOrder tradingPair={this.props.tradingPair} usdPosition={this.state.usdPosition} cryptoPosition={cryptoPosition}/>
      </div>
    )
  }
}

export default AccountInfo;
