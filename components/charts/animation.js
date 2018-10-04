import { VictoryCandlestick, VictoryTheme } from 'victory';
import { connect } from 'react-redux'

const App = ({data}) =>
  <VictoryCandlestick
    data={data}
    theme={VictoryTheme.material}
    domainPadding={20}
  />

const mapStateToProps = (state) => {
  return {
    data: state.demoData.candle,
  }
}  

export default connect(mapStateToProps, null)(App);