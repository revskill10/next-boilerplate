import { withI18next } from '../hocs/withI18next'
import Layout from '../layouts/index'

const Page = () =>
  <Layout>
    <div>About page</div>
  </Layout>

export default withI18next(['common'])(Page);
