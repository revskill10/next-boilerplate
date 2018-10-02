import Link from 'next/link'

const Nav = ({t}) => 
  <nav>
    <Link href={`/`}><a>{t('home_menu')}</a></Link> |
    <Link href={`/about`}><a>{t('about_menu')}</a></Link>
  </nav>

export default Nav