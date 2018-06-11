import React from "react";
// import TickerTape from "./TickerTape";
import { Menu, Grid, Segment } from 'semantic-ui-react'

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
      "level2",
      {
        "name": "level2",
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

class BidAsk extends React.Component {
  state = {
    buy: [],
    sell: []
  }

  componentDidMount(){
    // let buyArr = []
    // let sellArr = []
    // this.setState({
    //   buy: [],
    //   sell: []
    // })
    // this.connection = new WebSocket('wss://ws-feed.gdax.com');
    // // this will subscribe to a connection for the subscribe's pair prices
    // this.connection.onopen = () => this.connection.send(subscribe)
    //
    // this.connection.onmessage = evt => {
    //   // add the new message to state
    //   let currResp = JSON.parse(evt.data);
    //   if(currResp.changes && currResp.product_id === this.props.tradingPair && currResp.changes[0][2] !== '0'){
    //     if(currResp.changes[0][0] === 'buy'){
    //       buyArr.push(currResp.changes[0])
    //     } else if(currResp.changes[0][0] === 'sell'){
    //       sellArr.push(currResp.changes[0])
    //     }
    //   }
    // }
    //
    // setInterval(() => {
    //   buyArr = buyArr.sort((a,b) => {return (b[1] - a[1])})
    //   sellArr = sellArr.sort((a,b) => {return (a[1] - b[1])})
    //   buyArr.splice(30)
    //   sellArr.splice(30)
    //   // console.log('set buy array',buyArr)
    //   // console.log('set sell array',sellArr)
    //   this.setState({
    //     buy: buyArr,
    //     sell: sellArr
    //   })
    //
    //   // console.log('buy array',buyArr)
    //   // console.log('sell array',sellArr)
    //   // console.log('state buy array',this.state.buy)
    //   // console.log('state sell array',this.state.sell)
    // },1000)
    setInterval(() => {
      let buyArr = []
      let sellArr = []
      fetch(`https://api.gdax.com/products/${this.props.tradingPair}/book?level=2`)
      .then(resp => resp.json())
      .then(json => {
        console.log(json)
        buyArr = json.bids.sort((a,b) => {return (b[0] - a[0])})
        sellArr = json.asks.sort((a,b) => {return (a[0] - b[0])})
        this.setState({
          buy: buyArr,
          sell: sellArr
        })
      })

    }, 1000)
  }




  render() {
    // let buys = [...this.state.buy]
    // buys.sort((a,b) => {return (b[1] - a[1])})
    // let sells = [...this.state.sell]
    // sells.sort((a,b) => {return (a[1] - b[1])})
    // console.log('render sell', this.state.sell)
    return (
      <Grid columns={2} divided>
          <Grid.Column width={8}>
            <h3>Bid</h3>
            {
              this.state.buy.map(order => {
                return(
                  <Grid>
                    <Grid.Row style={{padding: 0, margin: 0}}>
                      <Grid.Column width={2}/>
                      <Grid.Column textAlign={'right'} width={6}>
                        <p style={{fontSize: 7, color: 'green'}}>{order[0]}</p>
                      </Grid.Column>
                      <Grid.Column textAlign={'left'} width={6}>
                        <p style={{fontSize: 7}}>{order[1]}</p>
                      </Grid.Column>
                      <Grid.Column width={2}/>
                    </Grid.Row>
                  </Grid>
                )
              })
            }
          </Grid.Column>
          <Grid.Column width={8}>
            <h3>Ask</h3>
              {
                this.state.sell.map(order => {
                  return(
                    <Grid>
                      <Grid.Row style={{padding: 0, margin: 0}}>
                        <Grid.Column width={2}/>
                        <Grid.Column textAlign={'right'} width={6}>
                          <p style={{fontSize: 7, color: 'red', weight: 'bolder'}}>{order[0]}</p>
                        </Grid.Column>
                        <Grid.Column textAlign={'left'} width={6}>
                          <p style={{fontSize: 7}}>{order[1]}</p>
                        </Grid.Column>
                        <Grid.Column width={2}/>
                      </Grid.Row>
                    </Grid>
                  )
                })
              }
          </Grid.Column>
      </Grid>
    )
  }
}

export default BidAsk;
