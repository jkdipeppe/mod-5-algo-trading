import React from 'react'

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
      visibleTrades: 40
    }
  }

  componentDidMount(){
    fetch(`https://api.gdax.com/products/${this.props.tradingPair}/trades`)
     .then(resp => resp.json())
     .then(json => {
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
      <div>
        <p>Executed Trades for {this.props.tradingPair}</p>
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
                  <p key={trade.trade_id} style={{fontSize: 15, color: color}}>
                    {"S: " + size + " P: " + price + " T: " + time}
                  </p>
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
