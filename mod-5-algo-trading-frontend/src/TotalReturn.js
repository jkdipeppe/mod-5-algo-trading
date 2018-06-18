import React from "react";

const baseUrl = "http://localhost:3000";

class TotalReturn extends React.Component {
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
}




  render() {
    console.log(this.props.account)
    console.log(this.state.account)
    return (
      <div>
        show total return for {this.state.account.username}
      </div>
    )
  }
}

export default TotalReturn;
