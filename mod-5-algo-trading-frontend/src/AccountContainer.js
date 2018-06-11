import React from "react";
import GdaxData from "./GdaxData";
// import TickerTape from "./TickerTape";
import ExecutedTrades from "./ExecutedTrades";
import AccountInfo from "./AccountInfo";
import BidAsk from "./BidAsk";
import { Menu, Grid, Segment } from 'semantic-ui-react'


const baseUrl = "http://localhost:3000";

class AccountContainer extends React.Component {
  state = {
    account: null,
    tradingPair: 'BTC-USD'
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
    // debugger
    this.setState({
      tradingPair: newPair
    })

  }

  render() {
    console.log(this.state.tradingPair)
    if(this.state.account){
      console.log('current account', this.state.account.positions)
    }
      return (
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>
              {this.state.account ? (
                <AccountInfo tradingPair={this.state.tradingPair} setTradingPair={this.setTradingPair} account={this.state.account}/>
              ) : (
                <p>Loading...</p>
              )}
            </Grid.Column>

            <Grid.Column width={10}>

                <Segment width={8}>
                  <h3>Chart</h3>
                  <h3>Chart</h3>
                  <h3>Chart</h3>
                  <h3>Chart</h3>
                  <h3>Chart</h3>

                </Segment>
                <Segment height={8}>
                  <BidAsk tradingPair={this.state.tradingPair}/>
                </Segment>

            </Grid.Column>

            <Grid.Column width={3}>
              <ExecutedTrades tradingPair={this.state.tradingPair}/>
            </Grid.Column>
          </Grid.Row>


        </Grid>
      )
    }

}

export default AccountContainer;
