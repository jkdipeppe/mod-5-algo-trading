import React from 'react'
import {Line} from 'react-chartjs-2'
import { Grid } from 'semantic-ui-react'

class LineChart extends React.Component{
  state = {
    timeframe: 'day',
    chartPrices: []
  }

  componentDidMount(){
    fetch(`https://min-api.cryptocompare.com/data/histo${this.state.timeframe}?fsym=${this.props.tradingPair.substring(0,3)}&tsym=USD&limit=30`)
    .then(resp => resp.json())
    .then(json => {
      json.Data.map(trade => {
        return(
          this.setState({
            chartPrices: [...this.state.chartPrices, trade.close]
          })
        )
      })
    })
    .catch((error) => {console.log('error fetching', error)})
  }

  componentDidUpdate(prevProps){
    if(prevProps.tradingPair !== this.props.tradingPair){
      this.setState({
        chartPrices: []
      })
      fetch(`https://min-api.cryptocompare.com/data/histo${this.state.timeframe}?fsym=${this.props.tradingPair.substring(0,3)}&tsym=USD&limit=30`)
      .then(resp => resp.json())
      .then(json => {
        json.Data.map(trade => {
          return(
            this.setState({
              chartPrices: [...this.state.chartPrices, trade.close]
            })
          )
        })
      })
      .catch((error) => {console.log('error fetching', error)})

    }
  }

  handleClick = (e) => {
    this.setState({
      timeframe: e.target.name,
      chartPrices: []
    })
    fetch(`https://min-api.cryptocompare.com/data/histo${e.target.name}?fsym=${this.props.tradingPair.substring(0,3)}&tsym=USD&limit=30`)
    .then(resp => resp.json())
    .then(json => {
      json.Data.map(trade => {
        return(
          this.setState({
            chartPrices: [...this.state.chartPrices, trade.close]
          })
        )
      })
    })
    .catch((error) => {console.log('error fetching', error)})
  }



  render(){
    return(
      <div style={{backgroundColor:'rgba(255,255,255,0.9)', paddingTop:'10px', paddingBottom:'20px'}}>
        <Grid>
          <Grid.Column width={6}/>
          <Grid.Column  style={{textDecorationLine: 'underline'}} onClick={this.handleClick} width={2}>
            <a name='day'>Days</a>
          </Grid.Column>
          <Grid.Column  style={{textDecorationLine: 'underline'}} onClick={this.handleClick} width={2}>
            <a name='hour'>Hours</a>
          </Grid.Column>
          <Grid.Column width={6}/>
        </Grid>
        <Line
          data={{
            labels: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24',
            '25','26','27','28','29','30'],
            datasets: [{
              label: `${this.props.tradingPair.substring(0,3)} Prices - Last 30 ${this.state.timeframe}s`,
              data: this.state.chartPrices
            }]
          }}
          width={100}
          height={30}
          options={
            {maintainAspectRatio: true},
            {legend: {
             display: true,
             labels: {
               boxWidth: 0,
               fontColor: "rgb(0, 0, 0)"
             }
           }}
          }
        />
      </div>
    )
  }
}

export default LineChart
