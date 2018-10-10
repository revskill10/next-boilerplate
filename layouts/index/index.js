import Nav from './appBar'
import Footer from './footer'
import Grid from '@material-ui/core/Grid';
import Sidebar from './rightBar'

const AutoGrid = ({children}) =>
  <>
    <Nav />
    <Grid container spacing={24}> 
      <Grid item xs={12}>
        <Grid container spacing={24}> 
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={9}>
            {children}
          </Grid>
          <Grid item xs={2}>
            <Sidebar />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    <Footer />
  </>
  


export default AutoGrid;