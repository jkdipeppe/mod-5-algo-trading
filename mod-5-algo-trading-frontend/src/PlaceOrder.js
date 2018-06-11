import React from "react";
import { Form, Radio, Button } from 'semantic-ui-react'


class PlaceOrder extends React.Component {
  state = {
    orderType: 'market',
    buyOrSell: 'buy',
    limitPrice: 0,
    quantity: 0
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

  render() {
    return(
      <div>
        <Form.Field>
          <Button.Group >
            <Button
              value='buy'
              color={this.state.buyOrSell === 'buy' ? 'green' : 'gray'}
              onClick={this.handleBidAsk}
            >Buy</Button>
            <Button
              value='sell'
              color={this.state.buyOrSell === 'sell' ? 'red' : 'gray'}
              onClick={this.handleBidAsk}
            >Sell</Button>
          </Button.Group>

        </Form.Field>
        <Form size={'mini'}>
          <Form.Group>
            <Form.Input onChange={this.handleQuantity} value={this.state.quantity} required placeholder='Quantity' width={10} />{this.props.tradingPair} Amount
            </Form.Group>
          <Form.Field>
            <Radio
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
          <Form.Group>
            <Form.Input value={this.state.limitPrice} onChange={this.handleLimitPrice} required placeholder='Price' width={10} /> Limit Price
          </Form.Group>

          : null

        }
        {
          this.state.buyOrSell === 'buy' ?
          <p>Current Best Bid is </p>
          :
          <p>Current Best Offer is</p>
        }
      </Form>
      </div>
    )
  }
}

export default PlaceOrder
