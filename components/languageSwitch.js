import React from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import i18n from '../shared/i18n'
import { withI18next } from '../hocs/withI18next'

const LanguageSwitch = ({t}) => (
  <Select
    value={(i18n.language || 'en-US').split('-')[0]}
    onChange={(event) => i18n.changeLanguage(event.target.value)}
  >
    
    <MenuItem value={'en'}>{t('language_en')}</MenuItem>
    <MenuItem value={'vi'}>{t('language_vi')}</MenuItem>
  </Select>
)

export default withI18next(['common'])(LanguageSwitch)