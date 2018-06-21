import React from "react";
import DropDown from "./DropDown";
import PlaceOrder from "./PlaceOrder";
import { Form, Button, Input, Label } from 'semantic-ui-react'

class AccountInfo extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      account: props.account,
      updatedPosition: false,
      usdPosition: {},
      btcPosition: {},
      ethPosition: {},
      bchPosition: {},
      ltcPosition: {},
      depositBox: false,
      depositAmount: null
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

  handleOrder = () => {
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

  handleDeposit = (e) => {
    this.setState({
      depositBox: true
    })
  }

  handleDepositSubmit = (e) => {
    this.setState({
      depositAmount: null
    })
    let totalCash = parseInt(this.state.depositAmount) + parseInt(this.state.usdPosition.quantity)
    fetch(`http://localhost:3000/api/v1/positions/${this.state.usdPosition.id}`, {
      method: 'PATCH',
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }),
      withCredentials: true,
      body: JSON.stringify({
        quantity: totalCash
      })
    })
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          usdPosition: json,
          depositBox: false
        })
      })

      let totalAccountDeposits = parseInt(this.state.account.cash_deposited) + parseInt(this.state.depositAmount)

      fetch(`http://localhost:3000/api/v1/accounts/${this.state.account.id}`, {
        method: 'PATCH',
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }),
        withCredentials: true,
        body: JSON.stringify({
          cash_deposited: totalAccountDeposits
        })
      })
        .then(resp => resp.json())
        // .then(json => {
        //   console.log('json for updated deposited total', json)
        // })
  }

  handleDepositAmount = (e) => {
    this.setState({
      depositAmount: e.target.value
    })
  }

  render() {
    let cryptoPosition = this.state[`${this.props.tradingPair.substring(0,3).toLowerCase()}Position`]
    return (
      <div style={{backgroundColor:"rgba(255,255,255,0.8)", height:"100%", paddingTop:'20px'}}>
        <h3>Welcome: {this.props.account.username}</h3>
        <h5>Available Cash (USD): {this.state.usdPosition.quantity}</h5>
        {
          this.state.depositBox ?
          <div style={{margin:'0 auto', width:'85%'}}>
            <Form style={{margin:'0 auto', width:'85%'}} onSubmit={this.handleDepositSubmit}>
              <Input onChange={this.handleDepositAmount} size='mini' type='text' placeholder='$0.00' value={this.state.depositAmount} />
            </Form>
          </div>
          :
          <Button onClick={this.handleDeposit} size='mini'>Deposit USD</Button>
        }
        <p style={{paddingTop:'10px'}}>BTC: {this.state.btcPosition.quantity}</p>
        <p>ETH: {this.state.ethPosition.quantity}</p>
        <p>LTC: {this.state.ltcPosition.quantity}</p>
        <p>BCH: {this.state.bchPosition.quantity}</p>
        <DropDown setTradingPair={this.props.setTradingPair}/>
        <PlaceOrder handleOrder={this.handleOrder} tradingPair={this.props.tradingPair} usdPosition={this.state.usdPosition} cryptoPosition={cryptoPosition}/>


    </div>
    )
  }
}

export default AccountInfo;
