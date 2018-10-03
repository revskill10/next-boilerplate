import React from 'react'
import Link from 'next/link'
import { withRouter } from 'next/router'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


import i18n from '../shared/i18n'

const LanguageSwitch = ({ }) => (
  <Select
    value={(i18n.language || 'en-US').split('-')[0]}
    onChange={(event) => i18n.changeLanguage(event.target.value)}
  >
    
    <MenuItem value={'en'}>English</MenuItem>
    <MenuItem value={'vi'}>Vietnamese</MenuItem>
  </Select>
)

export default withRouter(LanguageSwitch)