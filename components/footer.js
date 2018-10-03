import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import { withI18next } from '../hocs/withI18next'
import LanguageSwitch from './languageSwitch'

const Footer = ({t}) => 
  <div style={{
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    maxWidth: '20vh',
  }}>
      {t('choose_language')}
      <br />
      <LanguageSwitch />
    </div>

export default withI18next(['common'])(Footer)