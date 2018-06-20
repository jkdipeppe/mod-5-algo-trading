import React from "react";
import { Form, Radio, Button } from 'semantic-ui-react'


class PlaceOrder extends React.Component {
  state = {
    orderType: 'market',
    buyOrSell: 'buy',
    limitPrice: 0,
    quantity: 0,
    bestBid: 0,
    bestAsk: 0,
    insufficientFunds: false,
    orderSuccessful: false
  }

  componentDidMount(){
    setInterval(() => {
      fetch(`https://api.gdax.com/products/${this.props.tradingPair}/book?level=1`)
      .then(resp => resp.json())
      .then(json => {
        if(json.bids && json.asks){
          this.setState({
            bestBid: json.bids[0][0],
            bestAsk: json.asks[0][0]
          })
        }
      })
    }, 1000)
  }

  handleChange = (e, { value }) => this.setState({ orderType: value })
  handleBidAsk = (e, { value }) => this.setState({ buyOrSell: value })

  handleLimitPrice = (e) => {
    const re = /^\d*\.?\d*$/;
    if(re.test(e.target.value)) {
      this.setState({
        limitPrice: e.target.value
      })
    }
  }
  handleQuantity = (e) => {
    const re = /^\d*\.?\d*$/;
    if(re.test(e.target.value)) {
      this.setState({
        quantity: e.target.value
      })
    }
  }

  handleSubmitOrder = (e) => {
    let cashValue = parseFloat(this.props.usdPosition.quantity)
    let cryptoPurchaseValue = this.state.quantity * this.state.bestAsk
    let cryptoSellValue = this.state.quantity * this.state.bestBid
    let newCashQuantity = cashValue
    let newCryptoQuantity = parseFloat(this.props.cryptoPosition.quantity)
    let cryptoQuantityChange = parseFloat(this.state.quantity)
    if(this.state.buyOrSell === 'buy') {
      newCryptoQuantity = newCryptoQuantity + cryptoQuantityChange;
      newCashQuantity = newCashQuantity - cryptoPurchaseValue
    } else if(this.state.buyOrSell === 'sell') {
      console.log('its a sell')
      newCryptoQuantity = newCryptoQuantity - cryptoQuantityChange;
      newCashQuantity = newCashQuantity + cryptoSellValue
      console.log(newCryptoQuantity)
    }
    console.log(newCryptoQuantity)
    console.log('true or tfalse', newCryptoQuantity >= 0.00)
    if(this.state.orderType === 'market' && ((cashValue - cryptoPurchaseValue >= 0) || (this.state.buyOrSell === 'sell')) && newCryptoQuantity >= 0){
        console.log('inside the if')
      fetch(`http://localhost:3000/api/v1/positions/${this.props.cryptoPosition.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Accept": 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          account_id: this.props.cryptoPosition.acciount_id,
          quantity: newCryptoQuantity,
          tradingPair: this.props.tradingPair
        })
      })
      .then(resp => resp.json())
      .then(json => {
        console.log('first fetch json', json)
        fetch(`http://localhost:3000/api/v1/positions/${this.props.usdPosition.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            account_id: this.props.cryptoPosition.acciount_id,
            quantity: newCashQuantity,
            tradingPair: this.props.tradingPair
          })
        })
        .then(resp => resp.json())
        .then(json => {
          console.log('handling order next')
          this.props.handleOrder()
          this.handleOrderSuccess()
        })
      })

    } else if(this.state.orderType === 'limit'){
      if((this.state.buyOrSell === 'buy' && (this.state.quantity * this.state.bestAsk <= this.props.usdPosition.quantity)) || (this.state.buyOrSell === 'sell' && this.state.quantity <= this.props.cryptoPosition.quantity)){
        console.log('before the fetch')
        fetch(`http://localhost:3000/api/v1/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Accept": 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({
            account_id: this.props.usdPosition.account_id,
            quantity: this.state.quantity,
            trading_pair: this.props.tradingPair,
            price: this.state.limitPrice,
            limit: true,
            usd_id: this.props.usdPosition.id,
            position_id: this.props.cryptoPosition.id,
            buy_or_sell: this.state.buyOrSell
          })
        })
        .then(resp => resp.json)
        .then(json => {
          this.setState({
            quantity:0,
            limitPrice: 0
          })
          this.handleOrderSuccess()
        }) //this goes to the if
      } else {
        this.handleOrderFail()
      }
    }
  }

  handleOrderSuccess = () => {
    this.setState({
      orderSuccessful: true,
      quantity: 0,
      orderType: 'market',
      limitPrice: 0
    })
    setTimeout(() => {
      this.setState({
        orderSuccessful: false
      })
    }, 3000)
  }

  handleOrderFail = () => {
    this.setState({
      insufficientFunds: true,
      orderType: 'market',
    })
    setTimeout(() => {
      this.setState({
        insufficientFunds: false
      })
    }, 3000)
  }

  render() {
    return(
      <div>
        <h5>Current trading pair: {this.props.tradingPair}</h5>
        <Form.Field style={{padding:10}}>
          <Button.Group >
            <Button
              value='buy'
              color={this.state.buyOrSell === 'buy' ? 'green' : 'grey'}
              onClick={this.handleBidAsk}
            >Buy</Button>
            <Button
              value='sell'
              color={this.state.buyOrSell === 'sell' ? 'red' : 'grey'}
              onClick={this.handleBidAsk}
            >Sell</Button>
          </Button.Group>

        </Form.Field>
        <p>{this.props.tradingPair} Amount</p>
        <Form>
          <div style={{margin:'0 auto', width:'80%'}}>

              <Form.Input onChange={this.handleQuantity} value={this.state.quantity} required placeholder='Quantity'  />

          </div>
          <Form.Field>
            <Radio
              style={{padding:5}}
              label='Market'
              name='radioGroup'
              value='market'
              checked={this.state.orderType === 'market'}
              onChange={this.handleChange}
            />
            <Radio
              label='Limit'
              name='radioGroup'
              value='limit'
              checked={this.state.orderType === 'limit'}
              onChange={this.handleChange}
            />
          </Form.Field>
        {
          this.state.orderType === 'limit' ?
          <div style={{margin:'0 auto', width:'80%'}}>
            <p>Limit Price:</p>
            <Form.Input value={this.state.limitPrice} onChange={this.handleLimitPrice} required placeholder='Price' />
          </div>
          : null
        }
        {
          this.state.buyOrSell === 'buy' ?
          <div style={{margin:'0 auto', width:'80%', paddingTop:'10px'}}>
            <p>Current Best Bid is {this.state.bestBid}</p>
            <Button onClick={this.handleSubmitOrder.bind(this)} inverted color='green'>Place Buy Order {this.props.tradingPair}</Button>
          </div>
          :
          <div style={{margin:'0 auto', width:'80%', paddingTop:'10px'}}>
            <p>Current Best Offer is {this.state.bestAsk}</p>
            <Button onClick={this.handleSubmitOrder.bind(this)} inverted color='red'>Place Sell Order {this.props.tradingPair}</Button>
          </div>
        }
      </Form>
      {
        this.state.orderSuccessful ?
        <h5 style={{color:'blue'}}>Order Successful!</h5>
        :
        null
      }
      {
        this.state.insufficientFunds ?
        <h5 style={{color:'red'}}>Could not complete order - check available funds or position size</h5>
        :
        null
      }
      </div>
    )
  }
}

export default PlaceOrder
