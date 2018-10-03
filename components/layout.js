import LanguageSwitch from '../components/languageSwitch';
import Nav from './appBar'

const Layout = ({ children, t }) => (
  <div>
    <header>
      <Nav t={t} />
    </header>

    { children }

    <footer>
      {t('choose_language')}
      <br />
      <LanguageSwitch />
    </footer>
  </div>
)


export default Layout;