import { VictoryBar, VictoryChart, VictoryAxis,
  VictoryTheme } from 'victory';
import { connect } from 'react-redux'


const Chart = ({data}) =>
  <VictoryChart
    // adding the material theme provided with Victory
    theme={VictoryTheme.material}
    domainPadding={20}
  >
    <VictoryAxis
      tickValues={[1, 2, 3, 4]}
      tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
    />
    <VictoryAxis
      dependentAxis
      tickFormat={(x) => (`$${x / 1000}k`)}
    />
    <VictoryBar
      data={data}
      x="quarter"
      y="earnings"
    />
  </VictoryChart>


const mapStateToProps = (state) => {
  return {
    data: state.demoData.bar,
  }
}  

export default connect(mapStateToProps, null)(Chart);