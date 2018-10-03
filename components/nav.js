import Link from 'next/link'
import { withI18next } from '../hocs/withI18next'

const Nav = ({t}) => 
  <nav>
    <Link href={`/`}><a>{t('home_menu')}</a></Link> |
    <Link href={`/about`}><a>{t('about_menu')}</a></Link>
  </nav>

export default withI18next(['common'])(Nav)