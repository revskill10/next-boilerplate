import Link from 'next/link'
import { withI18next } from '../hocs/withI18next'
const Layout = ({ t, children }) => (
  <div>
    <header>
      <nav>
        <Link href={`/`}><a>{t('home_menu')}</a></Link> |
        <Link href={`/about`}><a>{t('about_menu')}</a></Link>
      </nav>
    </header>

    { children }

    <footer>
      {'I`m here to stay'}
    </footer>
  </div>
)


export default withI18next(['common'])(Layout);