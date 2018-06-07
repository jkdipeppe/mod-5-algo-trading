import React from "react";
// import TickerTape from "./TickerTape";
import { Menu, Grid, Segment } from 'semantic-ui-react'

let subscribe = JSON.stringify(
  {
    "type": "subscribe",
    "product_ids": [
      "ETH-USD",
      "BTC-USD"
    ],
    "channels": [
      "level2",
      {
        "name": "l2update",
        "product_ids": [
          "ETH-USD",
          "BTC-USD"
        ]
      }
    ]
  }
)

class BidAsk extends React.Component {


  componentDidMount(){

  this.connection = new WebSocket('wss://ws-feed.gdax.com');
    // listen to onmessage event
    setInterval( _ => {
    this.connection.onmessage = evt => {
      // add the new message to state
      let currResp = JSON.parse(evt.data);
      console.log('curr Response', currResp)
      //   if(currResp.product_id === this.props.tradingPair && this.state.trades.length >= 20){
      //     let arr = [...this.state.trades]
      //     arr.splice(0,1)
      //     this.setState({
      //       trades: [...arr, currResp]
      //     })
      //   } else if(currResp.product_id === this.props.tradingPair){
      //     this.setState({
      //       trades: [...this.state.trades, currResp]
      //     })
      //   }
      }
    }, 2000);

    // this will subscribe to a connection for the subscribe's pair prices
      this.connection.onopen = () => this.connection.send(subscribe)

  }

  render() {
    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={8}>
            <h3>Bid</h3>

          </Grid.Column>
          <Grid.Column width={8}>
            <h3>Ask</h3>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default BidAsk;
