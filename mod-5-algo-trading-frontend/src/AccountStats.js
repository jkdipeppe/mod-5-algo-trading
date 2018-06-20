import React from "react";
import TotalReturn from "./TotalReturn";
import AssetBreakdown from "./AssetBreakdown";
import OpenOrders from "./OpenOrders";
import { Tab, Grid } from 'semantic-ui-react'

const baseUrl = "http://localhost:3000";



class AccountStats extends React.Component {
  state = {
    account: {},
    orders: [],
    positions: [],

  }

  componentDidMount(){
    //gets the user
    fetch(`${baseUrl}/api/v1/account`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      }),
      withCredentials: true
    })
    .then(res => res.json())
    .then(json => {
      this.setState({ account: json })
      fetch(`${baseUrl}/api/v1/orders/${json.id}`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }),
        withCredentials: true
      })
      .then(res => res.json())
      .then(json => {
        this.setState({ orders: json })
      });
      //gets positions
      fetch(`${baseUrl}/api/v1/positions/${json.id}`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }),
        withCredentials: true
      })
      .then(res => res.json())
      .then(json => {
        this.setState({ positions: json })
      });
    });
  }



  render() {
    const panes = [
      { menuItem: 'Total Return', render: () => <TotalReturn account={this.state.account} orders={this.state.orders} positions={this.state.positions} />},
      { menuItem: 'Assest Break Down', render: () => <AssetBreakdown account={this.state.account}/> },
      { menuItem: 'Open Orders', render: () => <OpenOrders account={this.state.account} orders={this.state.orders}/> },
      // { menuItem: 'Open Orders', render: () => <OpenOrders /> },
    ]

    return (
      <div >
        <Grid style={{backgroundColor:"rgba(137,173,195,0)"}}>
          <Grid.Column width={15}>
            <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={panes} />
          </Grid.Column>
          <Grid.Column width={1} />
        </Grid>
      </div>
    )
  }
}

export default AccountStats;
