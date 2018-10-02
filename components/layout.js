import LanguageSwitch from '../components/languageSwitch';
import Nav from './nav'

const Layout = ({ children, t }) => (
  <div>
    <header>
      <Nav t={t} />
    </header>

    { children }

    <footer>
      {'I`m here to stay'}
      <LanguageSwitch />
    </footer>
  </div>
)


export default Layout;