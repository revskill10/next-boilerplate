import Nav from './appBar'
import Footer from './footer'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import Modules from '../../modules'
const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
    fontSize: 'x-small',
  },
  root: {
    flexGrow: 1,
  },
});

const AutoGrid = ({classes}) =>
  <div className={classes.root}>
    <Grid container spacing={24}>
      <Grid item xs={12}>
        <Modules />
      </Grid>
    </Grid>
  </div>

const StyledAutoGrid = withStyles(styles)(AutoGrid)

const Layout = () => (
  <>
    <Nav />
    <main>
      <StyledAutoGrid  />
    </main>
    <Footer />
  </>
)

export default Layout;