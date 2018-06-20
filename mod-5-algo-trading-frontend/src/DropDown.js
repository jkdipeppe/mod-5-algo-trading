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
      <div style={{margin:'0 auto', width:'85%',paddingBottom:'10px'}}>
        <Dropdown centered ui fluid dropdown size='mini' placeholder='Trading Pair' search selection options={tradingPairs} onChange={this.handleTradingPair.bind(this)} />
      </div>

    )
  }
}

export default DropDown
