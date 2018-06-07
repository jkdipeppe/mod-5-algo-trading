import * as GTT from 'gdax-trading-toolkit';
import React from 'react'
// import { GDAXFeed } from "gdax-trading-toolkit/build/src/exchanges";

class GdaxData extends React.Component {
  render(){
    const GTT = require('gdax-trading-toolkit');
    const products = ['LTC-USD'];
    const logger = GTT.utils.ConsoleLoggerFactory();
    debugger
    GTT.Factories.GDAX.FeedFactory(logger, products).then((feed: GDAXFeed) => {
      console.log("made it")
      
    })

    return(
      <div><p>Gdax Feed</p>
      {}
      </div>
    )
  }

}

export default GdaxData


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
