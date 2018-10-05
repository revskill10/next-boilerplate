/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../layouts/index'
import { withI18next } from '../hocs/withI18next'
import Table from '../components/table'
import PieChart from '../components/charts/pieChart'
import BarChart from '../components/charts/barChart'
import Grid from '@material-ui/core/Grid';
import NoSSR from 'react-no-ssr'
import Loading from '../components/loader'
import Animation from '../components/charts/animation'
import Head from 'next/head'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends React.Component {
  static async getInitialProps({req}) {
    if (req) {
      // Runs only in the server
      const faker = require('faker')
      const name = faker.name.findName()
      return { name }
    }
  
    // Runs only in the client
    return { name: 'Arunoda' }
  }

  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes, name, t } = this.props;
    const { open } = this.state;

    return (
      <Layout>
        <Head>
          <title>My page title</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <NoSSR onSSR={<Loading />}>
              <Grid container spacing={24}>
                <Grid item xs={4}>
                  <Animation />
                </Grid>
                <Grid item xs={4}>
                  <PieChart />
                </Grid>
                <Grid item xs={4}>
                  <BarChart />
                </Grid>
              </Grid>
            </NoSSR>
          </Grid>     
          <Grid item xs={12}>
            <Table />
          </Grid>     
        </Grid>
        
      </Layout>
    );
  }
}


export default withI18next(['common'])(withStyles(styles)(Index));