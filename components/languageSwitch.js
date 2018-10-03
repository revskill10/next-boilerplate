import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'

import i18n from '../shared/i18n'

const LanguageSwitch = ({ router }) => (
  <ul>
    <li>
      <Link href={`${router.pathname}`}>
        <a onClick={() => i18n.changeLanguage('en')}>en</a>
      </Link>
    </li>
    <li>
    <Link href={`${router.pathname}?lng=vi`}>
        <a onClick={() => i18n.changeLanguage('vi')}>vi</a>
      </Link>
    </li>
  </ul>
)

export default withRouter(LanguageSwitch)