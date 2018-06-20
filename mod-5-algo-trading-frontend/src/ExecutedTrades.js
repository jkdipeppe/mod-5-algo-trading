import React from 'react'
import { Grid } from 'semantic-ui-react'

let subscribe = JSON.stringify(
  {
    "type": "subscribe",
    "product_ids": [
      "ETH-USD",
      "BTC-USD",
      "BCH-USD",
      "LTC-USD",
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
        ]
      }
    ]
  }
)

class ExecutedTrades extends React.Component {
  constructor(props){
    super(props)

    this.state={
      trades: [],
      tradingPair: this.props.tradingPair,
      visibleTrades: 30
    }
  }

  componentDidMount(){
    fetch(`https://api.gdax.com/products/${this.props.tradingPair}/trades`)
     .then(resp => resp.json())
     .then(json => {
       if(json){
         json.map(trade => {
           return(
             this.setState({
               trades: [...this.state.trades, trade]
             })
           )
         })
       }
       this.setState({
         trades: [...this.state.trades.splice(0,this.state.visibleTrades)]
       })
     })
    this.connection = new WebSocket('wss://ws-feed.gdax.com');
    this.connection.onopen = () => this.connection.send(subscribe)
      // listen to onmessage event
    this.connection.onmessage = evt => {
      // add the new message to state
      let currResp = JSON.parse(evt.data);
      if(currResp.product_id === this.props.tradingPair && this.state.trades.length >= this.state.visibleTrades && currResp.type !== 'ticker'){
        let arr = [...this.state.trades]
        arr.splice(-1,1)
        this.setState({
          trades: [currResp, ...arr]
        })
      } else if(currResp.product_id === this.props.tradingPair && currResp.type === 'ticker'){
        if(this.state.trades.length >= this.state.visibleTrades){
          let arr = [...this.state.trades]
          arr.splice(-1,1)
          this.setState({
            trades: [currResp, ...arr]
          })
        } else {
          this.setState({
            trades: [currResp, ...this.state.trades]
          })
        }
      }
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.tradingPair !== this.props.tradingPair) {
      this.setState({
        trades: []
      })

      fetch(`https://api.gdax.com/products/${this.props.tradingPair}/trades`)
       .then(resp => resp.json())
       .then(json => {
         if(json){
         json.map(trade => {
           return(
             this.setState({
               trades: [...this.state.trades, trade]
             })
           )
         })
         this.setState({
           trades: [...this.state.trades.splice(0,this.state.visibleTrades)]
         })
       }})
    }
  }

  render(){
    let arr = [...this.state.trades]

    return(
      <div style={{backgroundColor:"rgba(255,255,255,0.8)", paddingTop:'10px', height:'100%'}}>
        <p>Executed Trades for {this.props.tradingPair}</p>
        <Grid style={{paddingLeft:'5px'}}>
          <Grid.Column width={1}/>
          <Grid.Column width={4}>Price</Grid.Column>
          <Grid.Column width={4}>Size</Grid.Column>
          <Grid.Column width={4}>Time</Grid.Column>
        </Grid>
        <div>
          {
            arr.map(trade => {
              if(trade.time){
                let price = parseFloat(trade.price).toFixed(2)
                let size = parseFloat(trade.last_size).toFixed(4)
                if(trade.size){
                  size = parseFloat(trade.size).toFixed(4)
                }
                let time = trade.time.split('').splice(11,8).join('')
                let hour = ((parseInt(time.split('').splice(0,2).join(''), 10) + 20) % 24).toString()
                time = hour.concat(time.split('').splice(2).join(''))
                let color = (trade.side === 'buy') ? 'green' : 'red'
                return(
                  <Grid style={{paddingLeft:'25px', paddingBottom:'0px'}}>
                    <Grid.Column style={{padding:'3px'}} width={5}>
                      <p key={trade.trade_id} style={{fontSize: 15, color: color}}>
                        {price}
                      </p>
                    </Grid.Column>
                    <Grid.Column style={{padding:'3px'}} width={5}>
                      <p key={trade.trade_id} style={{fontSize: 15}}>
                        {size}
                      </p>
                    </Grid.Column>
                    <Grid.Column style={{padding:'3px'}} width={5}>
                      <p key={trade.trade_id} style={{fontSize: 15}}>
                        {time}
                      </p>
                    </Grid.Column>
                  </Grid>
                )
              } else {
                return(null)
              }
            })
          }
        </div>
      </div>
    )
  }
}

export default ExecutedTrades
