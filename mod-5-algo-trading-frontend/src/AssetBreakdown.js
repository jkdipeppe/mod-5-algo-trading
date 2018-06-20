import React from "react";
import { Grid } from 'semantic-ui-react'
import { Doughnut } from 'react-chartjs-2'



const baseUrl = "http://localhost:3000";

class AssetBreakdown extends React.Component {
  state = {
    account: {},
    totalAccountValue: 0,
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
    colors: ['rgba(200, 100, 50, 10)', 'rgba(150, 50, 100, 40)', 'rgba(100, 75, 125, 100)', 'rgba(250, 200, 200, 175)', 'rgba(0, 0, 0, 0.1)']
  }

  componentDidMount(){
    this.setState({
      account: this.props.account
    })

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
          console.log('json', json)
          this.setState({
            BTC: json['BTC']['USD'],
            ETH: json['ETH']['USD'],
            BCH: json['BCH']['USD'],
            LTC: json['LTC']['USD'],
          })
        })
  }




  render() {
    console.log('current state for AssetBreakdown', this.state)
    return (
      <div style={{margin:10}}>
        <h2>Asset Allocation (USD)</h2>
        <Doughnut
          data={{
            labels: ['USD','BTC','BCH','LTC','ETH'],
            datasets: [{
              label: `Asset Breakdown`,
              data: [this.state.usdPosition.quantity, (this.state.BTC * parseFloat(this.state.btcPosition.quantity)), (this.state.BCH * parseFloat(this.state.bchPosition.quantity)), (this.state.LTC * parseFloat(this.state.ltcPosition.quantity)), (this.state.ETH * parseFloat(this.state.ethPosition.quantity))],
              backgroundColor: this.state.colors
            }]
          }}
          width={100}
          height={50}
          options={
            {maintainAspectRatio: true},
            {legend: {
             display: true,
             labels: {
               boxWidth: 0,
               fontColor: "rgb(0, 0, 0)"
             }
           }}
          }
        />
      </div>
    )
  }
}

export default AssetBreakdown;
