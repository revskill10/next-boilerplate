import React from 'react'
import cookie from 'cookie'
import PropTypes from 'prop-types'
import { getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import initApollo from '../shared/initApollo'
import { inspect } from 'util'
import { makeStore } from '../data/store'

function parseCookies (req, options = {}) {
  return cookie.parse(
    req ? req.headers.cookie || '' : document.cookie,
    options
  )
}

export default App => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    }

    static async getInitialProps (ctx) {
      const { Component, router, ctx: { req, res } } = ctx

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      
      const { initialReduxState } = appProps
      const reduxStore = makeStore(initialReduxState)

      const token = parseCookies(req).token
      const apollo = initApollo({}, {
        getToken: () => token,
      })

      ctx.ctx.apolloClient = apollo

      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {}
      }

      if (!process.browser) {
        // Run all graphql queries in the component tree
        // and extract the resulting data
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
              reduxStore={reduxStore}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
        token,
      }
    }

    constructor (props) {
      super(props)

      const { initialReduxState } = props
      
      this.reduxStore = makeStore(initialReduxState)
      
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => props.token,
        store: this.reduxStore,
      })
    }

    render () {
      return <App {...this.props} apolloClient={this.apolloClient} reduxStore={this.reduxStore} />
    }
  }
}
