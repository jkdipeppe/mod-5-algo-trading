import React from 'react'
import { Dropdown } from 'semantic-ui-react'

let tradingPairs = [
  { key: 'BTC-USD', value: 'BTC-USD', text: 'BTC - Bitcoin/USD' },
  { key: 'BCH-USD', value: 'BCH-USD', text: 'BCH - Bitcoin Cash/USD' },
  { key: 'ETH-USD', value: 'ETH-USD', text: 'ETH - Ethereum/USD' },
  { key: 'LTC-USD', value: 'LTC-USD', text: 'LTC - Litecoin/USD' },
  { key: 'BTC-EUR', value: 'BTC-EUR', text: 'BTC - Bitcoin/EUR' },
  { key: 'ETH-EUR', value: 'ETH-EUR', text: 'BTC - Bitcoin/EUR' },
]

class DropDown extends React.Component{


  handleTradingPair = (e) => {
    this.props.setTradingPair(e);
  }

  render(){
    return(
      <Dropdown placeholder='Select Trading Pair' search selection options={tradingPairs} onChange={this.handleTradingPair.bind(this)} />
    )
  }
}

export default DropDown
