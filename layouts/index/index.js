import Nav from './appBar'
import Footer from './footer'
import Grid from '@material-ui/core/Grid';
import Sidebar from './rightBar'
import { withStyles } from '@material-ui/core';


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

const AutoGrid = ({classes, children}) =>
  <div className={classes.root}>
    <Grid container spacing={24}>      
      <Grid item xs={1}>
      </Grid>
      <Grid item xs={9}>
        {children}
      </Grid>
      <Grid item xs>
        <Sidebar />
      </Grid>
    </Grid>
  </div>

const StyledAutoGrid = withStyles(styles)(AutoGrid)

const Layout = ({children }) => (
  <>
    <Nav />
    <main>
      <StyledAutoGrid>
        {children}
      </StyledAutoGrid>
    </main>
    <Footer />
  </>
)

export default Layout;