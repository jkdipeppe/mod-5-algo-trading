import React from "react";

const baseUrl = "http://localhost:3000";

class PendingOrderContainer extends React.Component {
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
        // this.setState({ orders: json })
        console.log('orders',json)
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
        // this.setState({ positions: json })
        console.log('positions',json)
      });






    });
    //gets orders



  }

  render() {
    return (
      <div>Display Pending Orders for {this.state.account.username}</div>
    )
  }
}

export default PendingOrderContainer;
