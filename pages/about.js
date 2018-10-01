import OrganizationsList from '../components/OrganizationsList';
import LiveComponent from '../hocs/liveComponent'
import {OrganizationListQuery, OrganizationListSubscription} from '../graphql/organizations.gql'
import Helmet from 'react-helmet'
import { withI18next } from '../hocs/withI18next'

const Page = ({t, titleKey}) =>
  <>
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
  </>
  

Page.getInitialProps = async ({ req }) => {
  if (req) {
    Helmet.renderStatic()
  }
  return { titleKey: 'about_page' }
}

export default withI18next(['common'])(Page);
