import React from "react";
// import TickerTape from "./TickerTape";
import { Menu, Grid, Segment } from 'semantic-ui-react'

class AccountInfo extends React.Component {

  render() {
    return (
      <div>
        <h3>{this.props.account.username}</h3>
        <h3>{this.props.account.email}</h3>
      </div>
    )
  }
}

export default AccountInfo;
