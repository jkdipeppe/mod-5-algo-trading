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
      "BTC-USD",
      "BCH-USD",
      "LTC-USD",
      "BTC-EUR",
      "BCH-EUR"
    ],
    "channels": [
      "ticker",
      {
        "name": "ticker",
        "product_ids": [
          "ETH-USD",
          "BTC-USD",
          "BCH-USD",
          "LTC-USD",
          "BTC-EUR",
          "BCH-EUR"
        ]
      }
    ]
  }
)

// console.log('props', this.props)
class ExecutedTrades extends React.Component {
  constructor(props){
    super(props)

    this.state={
      trades: [],
      tradingPair: this.props.tradingPair
    }
  }
  // state = {
  //   trades: [],
  // }

  componentShouldUpdate(nextProps, nextState){
    return this.state.value !== this.props.tradingPair
  }
  componentDidMount(){
    this.setState({
      trades: []
    })

  this.connection = new WebSocket('wss://ws-feed.gdax.com');
  this.connection.onopen = () => this.connection.send(subscribe)
    // listen to onmessage event
    this.connection.onmessage = evt => {
      // add the new message to state
      let currResp = JSON.parse(evt.data);
        if(currResp.product_id === this.props.tradingPair && this.state.trades.length >= 20 && currResp.type !== 'ticker'){
          let arr = [...this.state.trades]
          arr.splice(0,1)
          this.setState({
            trades: [...arr, currResp]
          })
        } else if(currResp.product_id === this.props.tradingPair && currResp.type === 'ticker'){
          this.setState({
            trades: [...this.state.trades, currResp]
          })
        }
    }

    // this will subscribe to a connection for the subscribe's pair prices
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
    let lastPrice = 0;

    return(
      <div>
        <p>Executed Trades for {this.props.tradingPair}</p>
        <div>
          {
            arr.reverse().map(trade => {

              if(trade.time){
                console.log('lastPrice', lastPrice)
                let price = parseFloat(trade.price).toFixed(2)
                console.log('price', price)
                let size = parseFloat(trade.last_size).toFixed(4)
                let time = trade.time.split('').splice(11,8).join('')
                let hour = ((parseInt(time.split('').splice(0,2).join('')) + 20) % 24).toString()
                time = hour.concat(time.split('').splice(2).join(''))
                let color = (price >= lastPrice) ? 'green' : 'red'
                lastPrice = price
                return(
                  <p style={{fontSize: 7, color: color}}>
                    {"Size: " + size + "    Price: " + price + "Time: " + time}
                  </p>
                )
              }
            })
          }
        </div>

      </div>
    )
  }
}

export default ExecutedTrades
