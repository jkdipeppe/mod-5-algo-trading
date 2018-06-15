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
      depositAmount: 0
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
        console.log('positions', json)
        console.log('account id', this.props.account.id)
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
        console.log('json for position', json)
        console.log('account id', this.props.account.id)
        this.setState({
          usdPosition: json,
          depositBox: false
        })
      })
  }

  handleDepositAmount = (e) => {
    this.setState({
      depositAmount: e.target.value
    })
  }

  render() {
    let cryptoPosition = this.state[`${this.props.tradingPair.substring(0,3).toLowerCase()}Position`]
    return (
      <div>
        <h5>Welcome: {this.props.account.username}</h5>
        <h5>Available Cash (USD): {this.state.usdPosition.quantity}</h5>
        {
          this.state.depositBox ?
          <Form onSubmit={this.handleDepositSubmit}>
            <Input style={{align:'left', width:100}} onChange={this.handleDepositAmount} size='mini' labelPosition='right' type='text' placeholder='Amount'>
              <Label basic>$</Label>
              <input value={this.state.depositAmount} />
              <Label>.00</Label>
            </Input>
          </Form>
          :
          <Button onClick={this.handleDeposit} size='mini'>Deposit USD</Button>
        }
        <p>BTC: {this.state.btcPosition.quantity}</p>
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
