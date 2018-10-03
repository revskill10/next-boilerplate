import OrganizationsList from '../components/organizationsList';
import LiveComponent from '../hocs/liveComponent'
import {OrganizationListQuery as query, OrganizationListSubscription as subscription} from '../graphql/organizations.gql'
import Helmet from 'react-helmet'
import { withI18next } from '../hocs/withI18next'
import Layout from '../components/layout'

const Page = ({t}) =>
  <Layout>
    <Helmet
      title={t('about_page')}
      meta={[{ property: 'og:title', content: t('about_page') }]}
    />
    <LiveComponent
      query={query}
      subscription={subscription}
      >
      {OrganizationsList}
    </LiveComponent>
  </Layout>
  

Page.getInitialProps = async ({ req }) => {
  if (req) {
    Helmet.renderStatic()
  }
}

export default withI18next(['common'])(Page);
