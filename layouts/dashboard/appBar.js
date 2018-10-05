import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/main'
import Link from 'next/link'
import { withI18next } from '../../hocs/withI18next'
import { connect } from 'react-redux'
import {SignalWifiStatusbar4Bar} from 'styled-icons/material/SignalWifiStatusbar4Bar.cjs'
import {SignalWifiStatusbar1Bar} from 'styled-icons/material/SignalWifiStatusbar1Bar.cjs'


const Component = ({classes, t, socket}) => 
  <AppBar position="static" color="default" className={classes.appBar}>
    <Toolbar>
      <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
        <Link href={`/`}>
          <a style={{
            textDecoration: 'none',
            color: 'black'
          }}>
            TF
          </a>
        </Link>
      </Typography>
      <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
        {socket.status === 'Connected' && <SignalWifiStatusbar4Bar size='40' />}
        {socket.status !== 'Connected' && <SignalWifiStatusbar1Bar size='40' />}
      </Typography>
      <Button>
        <Link href={`/dashboard`}>
          <a className={classes.appBarLink}>
            {t('dashboard_menu')}
          </a>
        </Link>
      </Button>
      <Button>
        <Link href={`/about`}>
          <a className={classes.appBarLink}>
            {t('about_menu')}
          </a>
        </Link>
      </Button>
      <Button>
        <Link href={`/pricing`}>
          <a className={classes.appBarLink}>
            {t('pricing_menu')}
          </a>
        </Link>
      </Button>
      <Button>
        <Link href={`/contact`}>
          <a className={classes.appBarLink}>
            {t('contact_menu')}
          </a>
        </Link>
      </Button>
      <Button color="primary" variant="outlined">
        Login
      </Button>
    </Toolbar>
  </AppBar>



function mapStateToProps (state) {
  const {socket} = state
  return {socket}
}

export default connect(mapStateToProps)(
  withI18next(['common'])(withStyles(styles)(Component))
)