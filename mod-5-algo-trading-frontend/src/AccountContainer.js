import React from "react";
import ExecutedTrades from "./ExecutedTrades";
import AccountInfo from "./AccountInfo";
import LineChart from "./LineChart";
import BidAsk from "./BidAsk";
import { Grid, Segment } from 'semantic-ui-react'


const baseUrl = "http://localhost:3000";

class AccountContainer extends React.Component {
  state = {
    account: null,
    tradingPair: 'BTC-USD',
  };

  componentDidMount() {
    fetch(`${baseUrl}/api/v1/account`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }),
      withCredentials: true
    })
      .then(res => res.json())
      .then(json => this.setState({ account: json }));

  }

  setTradingPair = (e) => {
    let crypto = e.target.innerText.substring(0,3)
    let currency = e.target.innerText.substring(e.target.innerText.length - 3)
    let newPair = crypto + "-" + currency
    this.setState({
      chartPrices: []
    })
    fetch(`https://min-api.cryptocompare.com/data/histoday?fsym=${newPair.substring(0,3)}&tsym=USD&limit=30`)
    .then(resp => resp.json())
    .then(json => {
      json.Data.map(trade => {
        return(
          this.setState({
            tradingPair: newPair,
            chartPrices: [...this.state.chartPrices, trade.close]
          })
        )
      })
    })
  }

  render() {

      return (
        <Grid style={{padding:'20px'}}>
          <Grid.Row>
            <Grid.Column  style={{paddingRight:"0px"}}width={3}>
              {this.state.account ? (
                <AccountInfo tradingPair={this.state.tradingPair} setTradingPair={this.setTradingPair} account={this.state.account}/>
              ) : (
                <p>Loading...</p>
              )}
            </Grid.Column>
            <Grid.Column width={9} style={{padding:"0px", margin:"0px"}}>
                <Grid.Column style={{paddingBottom:"0px"}}height={4}>
                  <LineChart tradingPair={this.state.tradingPair} chartPrices={this.state.chartPrices}/>
                </Grid.Column>
                <Grid.Column height={8} style={{paddingTop:"0px"}}>
                  <BidAsk tradingPair={this.state.tradingPair}/>
                </Grid.Column>
            </Grid.Column>
            <Grid.Column style={{paddingLeft:"0px"}} width={4}>
              <ExecutedTrades tradingPair={this.state.tradingPair}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
    }

}

export default AccountContainer;
