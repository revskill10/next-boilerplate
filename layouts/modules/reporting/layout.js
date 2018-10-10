import Grid from '@material-ui/core/Grid';

const Layout = ({leftBar, children}) =>
  <Grid container spacing={24}>      
    <Grid item xs={2}>
      {leftBar}
    </Grid>
    <Grid item xs={10}>
      {children}
    </Grid>
  </Grid>

export default Layout
