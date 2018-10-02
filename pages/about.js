import OrganizationsList from '../components/OrganizationsList';
import LiveComponent from '../hocs/liveComponent'
import {OrganizationListQuery, OrganizationListSubscription} from '../graphql/organizations.gql'
import Helmet from 'react-helmet'
import { withI18next } from '../hocs/withI18next'
import Layout from '../components/layout'

const Page = ({t, titleKey}) =>
  <Layout>
    <Helmet
      title={t(titleKey)}
      meta={[{ property: 'og:title', content: t(titleKey) }]}
    />
    <LiveComponent
      query={OrganizationListQuery}
      subscription={OrganizationListSubscription}
      >
      {OrganizationsList}
    </LiveComponent>
  </Layout>
  

Page.getInitialProps = async ({ req }) => {
  if (req) {
    Helmet.renderStatic()
    return { titleKey: 'about_page' }
  }
  return { titleKey: 'about_page' }
}

export default withI18next(['common'])(Page);
