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

  render() {
    console.log(this.state.account)
      return (
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={3}>
              {this.state.account ? (
                <AccountInfo account={this.state.account}/>
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
                  <BidAsk />
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
