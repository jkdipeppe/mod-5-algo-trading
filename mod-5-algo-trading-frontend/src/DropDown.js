import React from 'react'
import { Dropdown } from 'semantic-ui-react'

let tradingPairs = [
  { key: 'BTC-USD', value: 'BTC-USD', text: 'BTC - Bitcoin/USD' },
  { key: 'BCH-USD', value: 'BCH-USD', text: 'BCH - Bitcoin Cash/USD' },
  { key: 'ETH-USD', value: 'ETH-USD', text: 'ETH - Ethereum/USD' },
  { key: 'LTC-USD', value: 'LTC-USD', text: 'LTC - Litecoin/USD' },

]

class DropDown extends React.Component{


  handleTradingPair = (e) => {
    this.props.setTradingPair(e);
  }

  render(){
    return(
      <div style={{padding:'10px', width: '80%'}}>
        <Dropdown size='mini' style={{width:'80%'}} placeholder='Select Trading Pair' search selection options={tradingPairs} onChange={this.handleTradingPair.bind(this)} />
      </div>
    )
  }
}

export default DropDown
