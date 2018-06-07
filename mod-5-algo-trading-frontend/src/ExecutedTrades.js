import * as GTT from 'gdax-trading-toolkit';
import React from 'react'
import openSocket from 'socket.io-client';

// import { GDAXFeed } from "gdax-trading-toolkit/build/src/exchanges";

// const logger = GTT.utils.ConsoleLoggerFactory();
// const products: string[] = ['BTC-USD', 'ETH-USD', 'LTC-USD'];
// // debugger
// GTT.Factories.GDAX.FeedFactory(logger, products).then((feed: GDAXFeed) => {
//     console.log(feed)
// });

let subscribe = JSON.stringify(
  {
    "type": "subscribe",
    "product_ids": [
      "ETH-USD",
      "BTC-USD"
    ],
    "channels": [
      "ticker",
      {
        "name": "ticker",
        "product_ids": [
          "ETH-USD",
          "BTC-USD"
        ]
      }
    ]
  }
)

// console.log('props', this.props)
class ExecutedTrades extends React.Component {
  state = {
    trades: [],
  }
  componentDidMount(){

  this.connection = new WebSocket('wss://ws-feed.gdax.com');
    // listen to onmessage event
    setInterval( _ => {
    this.connection.onmessage = evt => {
      // add the new message to state
      let currResp = JSON.parse(evt.data);
      // console.log('curr Response', currResp)
        if(currResp.product_id === this.props.tradingPair && this.state.trades.length >= 20){
          let arr = [...this.state.trades]
          arr.splice(0,1)
          this.setState({
            trades: [...arr, currResp]
          })
        } else if(currResp.product_id === this.props.tradingPair){
          this.setState({
            trades: [...this.state.trades, currResp]
          })
        }
    }
  }, 2000)

    // this will subscribe to a connection for the subscribe's pair prices
      this.connection.onopen = () => this.connection.send(subscribe)
    }
  // componentDidMount(){
  //   this.interval = setInterval(() =>
  //     fetch(`https://api.gdax.com/products/${this.props.tradingPair}/trades`)
  //       .then(resp => resp.json())
  //       .then(json => {
  //         console.log('setting state in CDM')
  //         this.setState({
  //           trades: json.splice(0,10)
  //         })
  //       }), 1000
  //   )
  // }
  // componentDidMount() {
  // this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
  // }
  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }


  // componentWillUnmount(){
  //   this.connection.close();
  // }

  render(){
    let arr = [...this.state.trades]

    return(
      <div>
        <p>Executed Trades</p>
        <div>
          {
            arr.reverse().map(trade => {
              let price = parseFloat(trade.price).toFixed(2)
              let time = trade.time.split('').splice(11,8).join('')
              let hour = ((parseInt(time.split('').splice(0,2).join('')) + 20) % 24).toString()
              let size = parseFloat(trade.last_size).toFixed(4)
              // console.log(typeof hour)
              time = hour.concat(time.split('').splice(2).join(''))
              return(
                <p style={{fontSize: 7}}>
                  {"Size: " + size + "    Price: " + price + "    Time: " + time}
                </p>
              )
            })
          }
        </div>

      </div>
    )
  }
}

export default ExecutedTrades


//
// const websocket = new Gdax.WebsocketClient(['BTC-USD', 'ETH-USD'],  'wss://ws-feed-public.sandbox.gdax.com');
//
// websocket.on('message', data => {
//   /* work with data */
// });
// websocket.on('error', err => {
//   /* handle error */
// });
// websocket.on('close', () => {
//   /* ... */
// });
