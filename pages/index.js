import IndexComponent from '../components';
import '../styles/index.css';
import cookies from 'next-cookies';

const Index = ({token}) => (
  <>
    <IndexComponent token={token} />
  </>  
)

Index.getInitialProps = async (ctx) => {
  return cookies(ctx);
}

export default Index