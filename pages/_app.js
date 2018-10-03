import React from 'react'
import App, { Container } from 'next/app'
import { I18nextProvider } from 'react-i18next'
import initialI18nInstance from '../shared/i18n'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../shared/getPageContext';
import { ApolloProvider } from 'react-apollo'
import withApollo from '../hocs/withApollo'
import { PageTransition } from 'next-page-transitions'
import Loader from '../components/loader'
import i18n from '../shared/i18n'

const TIMEOUT = 400

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    const i18nInitialProps = ctx.req ? i18n.getInitialProps(ctx.req, 'common') : {};

    return { pageProps, i18nInitialProps }
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
    const { Component, pageProps, apolloClient, i18nInitialProps } = this.props
    const { i18n, initialI18nStore, initialLanguage } = i18nInitialProps

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <I18nextProvider
            i18n={i18n || initialI18nInstance}
            initialI18nStore={initialI18nStore}
            initialLanguage={initialLanguage}
          >
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
            </I18nextProvider>
          </ApolloProvider>
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

export default withApollo(MyApp)
