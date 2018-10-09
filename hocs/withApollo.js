import React from 'react'
import PropTypes from 'prop-types'
import { getDataFromTree } from 'react-apollo'
import Head from 'next/head'
import initApollo from '../shared/initApollo'
import { makeStore, exampleInitialState } from '../data/store'
import { getToken } from '../shared/getToken'
import { updateDomain } from '../actions'

export default App => {
  return class WithData extends React.Component {
    static displayName = `WithData(${App.displayName})`
    static propTypes = {
      apolloState: PropTypes.object.isRequired,
    }

    static async getInitialProps (ctx) {
      const { Component, router, ctx: { req, res } } = ctx

      const token = getToken(req)

      const apollo = initApollo({}, {
        getToken: () => token,
      })

      const store = makeStore(exampleInitialState, apollo)

      ctx.ctx.apolloClient = apollo

      // Provide the store to getInitialProps of pages
      ctx.ctx.store = store

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }
      
      if (res && res.finished) {
        // When redirecting, the response is finished.
        // No point in continuing to render
        return {}
      }

      if (!process.browser) {
        const domain = req.get('host')

        const vars = {
          domain,
          isServer: true,
          req
        }

        store.dispatch(updateDomain(vars))
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
              store={store}
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

        const apolloState = apollo.cache.extract()

        return {
          ...appProps,
          apolloState,
          token,
          reduxState: store.getState(),
          isServer: true,
        }
      } 
      // Extract query data from the Apollo's store
      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
        token,
        reduxState: store.getState(),
        isServer: false,
      }
    }

    constructor (props) {
      super(props)

      this.reduxStore = makeStore(props.reduxState, null);
    
      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => props.token,
        store: this.reduxStore,
      })
    }

    render () {
      return <App {...this.props} apolloClient={this.apolloClient} store={this.reduxStore} />
    }
  }
}
