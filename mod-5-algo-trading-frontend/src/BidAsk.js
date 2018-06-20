import React from "react";
import { Grid } from 'semantic-ui-react'

class BidAsk extends React.Component {
  state = {
    buy: [],
    sell: []
  }

  componentDidMount(){

    setInterval(() => {
      let buyArr = []
      let sellArr = []
      fetch(`https://api.gdax.com/products/${this.props.tradingPair}/book?level=2`)
      .then(resp => resp.json())
      .then(json => {
        if(json.bids && json.asks){
          buyArr = json.bids.sort((a,b) => {return (b[0] - a[0])})
          sellArr = json.asks.sort((a,b) => {return (a[0] - b[0])})
          this.setState({
            buy: buyArr,
            sell: sellArr
          })
        }
      })

    }, 1000)
  }




  render() {
    let key = 1;

    return (
      <div style={{backgroundColor:"rgba(255,255,255,0.9)"}}>
      <Grid columns={2} divided>
          <Grid.Column width={8}>
            <h3>Bid</h3>
            {
              this.state.buy.map(order => {
                key = key+1
                return(
                  <Grid key={key}>
                    <Grid.Row style={{padding: 0, margin: 0}}>
                      <Grid.Column width={2}/>
                      <Grid.Column textAlign={'right'} width={6}>
                        <p style={{fontSize: '1em', color: 'green'}}>{order[0]}</p>
                      </Grid.Column>
                      <Grid.Column textAlign={'left'} width={6}>
                        <p style={{fontSize: '1em'}}>{order[1]}</p>
                      </Grid.Column>
                      <Grid.Column width={2}/>
                    </Grid.Row>
                  </Grid>
                )
              })
            }
          </Grid.Column>
          <Grid.Column width={8}>
            <h3>Ask</h3>
              {
                this.state.sell.map(order => {
                  key = key + 1
                  return(
                    <Grid key={key}>
                      <Grid.Row style={{padding: 0, margin: 0}}>
                        <Grid.Column width={2}/>
                        <Grid.Column textAlign={'right'} width={6}>
                          <p style={{fontSize: '1em', color: 'red', weight: 'bolder'}}>{order[0]}</p>
                        </Grid.Column>
                        <Grid.Column textAlign={'left'} width={6}>
                          <p style={{fontSize: '1em'}}>{order[1]}</p>
                        </Grid.Column>
                        <Grid.Column width={2}/>
                      </Grid.Row>
                    </Grid>
                  )
                })
              }
          </Grid.Column>
      </Grid>
    </div>
    )
  }
}

export default BidAsk;
