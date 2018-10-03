import Nav from './appBar'
import Footer from './footer'

const Layout = ({ children }) => (
  <>
    <header>
      <Nav />
    </header>

    { children }

    <Footer />
  </>
)

export default Layout;