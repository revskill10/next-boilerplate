import IndexComponent from '../components';
import '../styles/index.css';
import cookies from 'next-cookies';
import { withI18next } from '../hocs/withI18next'

const Index = ({token, t}) => (
  <>
    <h1>{t('test')}</h1>
    <IndexComponent token={token} />
  </>  
)

Index.getInitialProps = async (ctx) => {
  return cookies(ctx);
}

export default withI18next(['common'])(Index)
