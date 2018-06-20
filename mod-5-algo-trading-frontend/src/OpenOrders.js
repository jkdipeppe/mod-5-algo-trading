import React from "react";
import { Grid } from 'semantic-ui-react'


const baseUrl = "http://localhost:3000";

class OpenOrders extends React.Component {
  state = {
    account: {},
  }

  componentDidMount(){
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
    })
    this.setState({
      orders: this.props.orders
    })
}




  render() {
    console.log(this.state.orders)
    return (
      <div style={{margin:10}}>

      </div>
    )
  }
}

export default OpenOrders;
