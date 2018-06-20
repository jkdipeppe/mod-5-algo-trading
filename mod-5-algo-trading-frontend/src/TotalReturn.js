import React from "react";
import { Card } from 'semantic-ui-react'


const baseUrl = "http://localhost:3000";

class TotalReturn extends React.Component {
  state = {
    account: this.props.account,
    usdPosition: {},
    btcPosition: {},
    ethPosition: {},
    bchPosition: {},
    ltcPosition: {},
    chartData: [],
    BTC: 0,
    BCH: 0,
    ETH: 0,
    LTC: 0,
  }

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/positions/${this.props.account.id}`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }),
      withCredentials: true
    })
      .then(resp => resp.json())
      .then(json => {
        json.forEach(position => {
          let symbol = position.trading_pair.substring(0,3).toLowerCase()
          this.setState({
            [`${symbol}Position`]: position
          })
        })
      })

      fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,BCH&tsyms=USD`)
        .then(resp => resp.json())
        .then(json => {
          this.setState({
            BTC: json['BTC']['USD'],
            ETH: json['ETH']['USD'],
            BCH: json['BCH']['USD'],
            LTC: json['LTC']['USD'],
          })
        })
  }

  componentDidUpdate(prevProps){
    // console.log('old',prevProps)
    // console.log('new',this.props)
  }

  render() {
    let totalReturn = 0
    let totalPortfolioValue = 0
    let btcValue= parseFloat(this.state.btcPosition.quantity) * this.state.BTC
    let bchValue= parseFloat(this.state.bchPosition.quantity) * this.state.BCH
    let ethValue= parseFloat(this.state.ethPosition.quantity) * this.state.ETH
    let ltcValue= parseFloat(this.state.ltcPosition.quantity) * this.state.LTC
    let cash = parseFloat(this.state.usdPosition.quantity)
    totalPortfolioValue = btcValue + bchValue + ethValue + ltcValue + cash
    totalReturn = (totalPortfolioValue - (parseInt(this.props.account.cash_deposited))) / (parseFloat(this.props.account.cash_deposited)) * 100

    const oneItem = [
      {
        header: 'Portfolio',
        description: `Total Portfolio Value: $${totalPortfolioValue.toFixed(2)}`,
        meta: `ROI: ${totalReturn.toFixed(2)}%`,
      },
    ]
    const items = [
      {
        header: `BTC - $${this.state.BTC}`,
        description: `Current Position Value (USD): $${btcValue.toFixed(2)}`,
        meta: `Qty: ${this.state.btcPosition.quantity}`,
      },
      {
        header: `BCH - $${this.state.BCH}`,
        description: `Current Position Value (USD): $${bchValue.toFixed(2)}`,
        meta: `Qty: ${this.state.bchPosition.quantity}`,
      },
      {
        header: `ETH - $${this.state.ETH}`,
        description: `Current Position Value (USD): $${ethValue.toFixed(2)}`,
        meta: `Qty: ${this.state.ethPosition.quantity}`,
      },
      {
        header: `LTC - $${this.state.LTC}`,
        description: `Current Position Value (USD): $${ltcValue.toFixed(2)}`,
        meta: `Qty: ${this.state.ltcPosition.quantity}`,
      },
      {
        header: `CASH (USD)`,
        description: `Current cash (USD): $${parseFloat(this.state.usdPosition.quantity).toFixed(2)}`,
      },{
        header: <Card
        style={{backgroundColor: "gray", color: 'white'}}
        header='Elliot Baker'
        meta='Friend'
        description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
        />

      }


    ]
    return (
      <div style={{padding:'10px'}} >
        <br/>
        <Card.Group centered items={oneItem} />
        <h2>Positions:</h2>
        <Card.Group centered>
          <Card
            style={{backgroundColor: "rgba(255,255,255,0.7)"}}
            header= {`BTC - $${this.state.BTC}`}
            description= {`Current Position Value (USD): $${btcValue.toFixed(2)}`}
            meta= {`Qty: ${this.state.btcPosition.quantity}`}
          />
          <Card
            style={{backgroundColor: "rgba(255,255,255,0.7)"}}
            header= {`BCH - $${this.state.BCH}`}
            meta= {`Qty: ${this.state.bchPosition.quantity}`}
            description= {`Current Position Value (USD): $${bchValue.toFixed(2)}`}
          />
          <Card
            style={{backgroundColor: "rgba(255, 255, 255, 0.7)"}}
            header= {`ETH - $${this.state.ETH}`}
            description= {`Current Position Value (USD): $${ethValue.toFixed(2)}`}
            meta= {`Qty: ${this.state.ethPosition.quantity}`}
          />
          <Card
            style={{backgroundColor: "rgba(255,255,255,0.7)"}}
            header= {`LTC - $${this.state.LTC}`}
            description= {`Current Position Value (USD): $${ltcValue.toFixed(2)}`}
            meta= {`Qty: ${this.state.ltcPosition.quantity}`}
          />
          <Card
            style={{backgroundColor: "rgba(255,255,255,0.7)"}}
            header= {`CASH (USD)`}
            description= {`Current cash (USD): $${parseFloat(this.state.usdPosition.quantity).toFixed(2)}`}
          />
        </Card.Group>
      </div>
    )
  }
}

export default TotalReturn;
