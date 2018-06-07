import * as GTT from 'gdax-trading-toolkit';
import React from 'react'
// import { GDAXFeed } from "gdax-trading-toolkit/build/src/exchanges";

class TickerTape extends React.Component {
  render(){
    let exchanges = [ gdaxExchangeAPI, bitfinexExchangeAPI ];

    const logger = GTT.utils.ConsoleLoggerFactory({ level: 'info' });
    const bitfinex = new BitfinexExchangeAPI(bitfinexConfig);
    const gdax = new GDAXExchangeAPI(gdaxConfig);


    const bitfinexConfig: BitfinexConfig = {
      gdaxProduct: 'BTC-USD',
      logger: logger,
      // auth: {
      //     key: process.env.BITFINEX_KEY,
      //     secret: process.env.BITFINEX_SECRET
      // }
    };

    const gdaxConfig: GDAXConfig = {
        apiURL: process.env.GDAX_API_URL || 'https://api.gdax.com',
        product: 'BTC-USD',
        // auth: {
        //     key: process.env.GDAX_KEY,
        //     secret: process.env.GDAX_SECRET,
        //     passphrase: process.env.GDAX_PASSPHRASE
        // }
    };

    let exchanges = [ gdaxExchangeAPI, bitfinexExchangeAPI ];
    exchanges.forEach((exchange: PublicExchangeAPI) => {
      exchange.loadProducts().then(products => {
        return logger.log('info', 'Products for ' + exchange.owner, products.map(p => p.id).join(' '));
      })
    })

    function getTickers(exchanges: PublicExchangeAPI[], product: string): Promise<Ticker[]> {
        const promises = exchanges.map((ex: PublicExchangeAPI) => ex.loadTicker(product));
        return Promise.all(promises);
    }

    return(
      <div>
        <p>TickerTape</p>
      {}
      </div>
    )
  }
}

export default TickerTape


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
