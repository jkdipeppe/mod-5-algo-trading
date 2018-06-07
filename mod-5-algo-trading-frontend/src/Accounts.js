import React from "react";

const baseUrl = "http://localhost:3000";

class Accounts extends React.Component {
  constructor() {
    super();

    this.state = {
      accounts: []
    };
  }

  componentDidMount() {
    fetch(`${baseUrl}/api/v1/accounts`)
      .then(res => res.json())
      .then(accounts => this.setState({ accounts }));
  }

  render() {
    console.log(this.state);
    return <div>{this.state.accounts.map(a => <div>{a.username}</div>)}</div>;
  }
}

export default Accounts;
