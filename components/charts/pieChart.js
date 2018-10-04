import React, { Component } from 'react';
import { VictoryPie, VictoryTheme } from 'victory';

class PieChart extends Component {
  render() {
    return (
      <VictoryPie 
        theme={VictoryTheme.material}
        domainPadding={20}
      />
    );
  }
}

export default PieChart;