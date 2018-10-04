import React from 'react'
import App, { Container } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../shared/getPageContext';
import { ApolloProvider } from 'react-apollo'
import withApollo from '../hocs/withApollo'
import { PageTransition } from 'next-page-transitions'
import Loader from '../components/loader'
import i18n from '../shared/i18n'
import { Provider as ReduxProvider } from 'react-redux'
import withRedux from '../hocs/withRedux'

const TIMEOUT = 400

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (ctx.req) {
      const lng = ctx.req.query.lng
      if (lng !== 'en') {
        i18n.changeLanguage(lng)
      }
    }

    return { pageProps }
  }

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  
  render () {
    const { Component, pageProps, apolloClient, reduxStore } = this.props

    return (
      <Container>
        <ReduxProvider store={reduxStore}>
          <ApolloProvider client={apolloClient}>
            <PageTransition
              timeout={TIMEOUT}
              classNames='page-transition'
              loadingComponent={<Loader />}
              loadingDelay={500}
              loadingTimeout={{
                enter: TIMEOUT,
                exit: 0
              }}
              loadingClassNames='loading-indicator'
            >
              <JssProvider
                registry={this.pageContext.sheetsRegistry}
                generateClassName={this.pageContext.generateClassName}
              >
                {/* MuiThemeProvider makes the theme available down the React
                    tree thanks to React context. */}
                  <MuiThemeProvider
                    theme={this.pageContext.theme}
                    sheetsManager={this.pageContext.sheetsManager}
                  >
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                      <Component pageContext={this.pageContext} {...pageProps} />
                  </MuiThemeProvider>
                </JssProvider>
              </PageTransition>
            </ApolloProvider>
          </ReduxProvider>
        <style jsx global>{`
          .page-transition-enter {
            opacity: 0;
            transform: translate3d(0, 20px, 0);
          }
          .page-transition-enter-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
          }
          .page-transition-exit {
            opacity: 1;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity ${TIMEOUT}ms;
          }
          .loading-indicator-appear,
          .loading-indicator-enter {
            opacity: 0;
          }
          .loading-indicator-appear-active,
          .loading-indicator-enter-active {
            opacity: 1;
            transition: opacity ${TIMEOUT}ms;
          }
        `}</style>
      </Container>
    )
  }
}

export default withApollo(withRedux(MyApp))
