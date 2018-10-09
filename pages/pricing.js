import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/main'
import Layout from '../layouts/index'
import { connect } from 'react-redux'

const Page = ({classes, tiers}) =>
  <Layout>
    <div className={classes.heroContent}>
      <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
        Pricing
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" component="p">
        Quickly build an effective pricing table for your potential customers with this layout.
        It&apos;s built with default Material-UI components with little customization.
      </Typography>
    </div>
    <Grid container spacing={40} alignItems="flex-end">
      {tiers.map(tier => (
        // Enterprise card is full width at sm breakpoint
        <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
          <Card>
            <CardHeader
              title={tier.title}
              subheader={tier.subheader}
              titleTypographyProps={{ align: 'center' }}
              subheaderTypographyProps={{ align: 'center' }}
              action={tier.title === 'Pro' ? <StarIcon /> : null}
              className={classes.cardHeader}
            />
            <CardContent>
              <div className={classes.cardPricing}>
                <Typography component="h2" variant="h3" color="textPrimary">
                  ${tier.price}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  /mo
                </Typography>
              </div>
              {tier.description.map(line => (
                <Typography variant="subtitle1" align="center" key={line}>
                  {line}
                </Typography>
              ))}
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Button fullWidth variant={tier.buttonVariant} color="primary">
                {tier.buttonText}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Layout>
       

Page.propTypes = {
  classes: PropTypes.object.isRequired,
  tiers: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return {
    tiers: state.tiers,
  }
}  

export default connect(mapStateToProps, null)(withStyles(styles)(Page));