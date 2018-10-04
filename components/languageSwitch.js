import React from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import i18n from '../shared/i18n'
import { withI18next } from '../hocs/withI18next'
import { withRouter } from 'next/router'


const LanguageSwitch = ({t, router}) => (
  <Select
    value={(i18n.language || 'en-US').split('-')[0]}
    onChange={(event) => {
      i18n.changeLanguage(event.target.value)
      console.log(router.pathname)
      if (router.pathname === '/' || router.pathname === '/index') {
        router.push('/')
      } else {
        router.push(`${router.pathname}?lng=${event.target.value}`)
      }
    } }
  >
    
    <MenuItem key={'en'} value={'en'}>{t('language_en')}</MenuItem>
    <MenuItem key={'vi'} value={'vi'}>{t('language_vi')}</MenuItem>
  </Select>
)

export default withRouter(withI18next(['common'])(LanguageSwitch))