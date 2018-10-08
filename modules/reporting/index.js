import MUIDataTable from "mui-datatables";
import LiveComponent from '../../hocs/liveComponent'
import {QuerySubjects as query, SubscribeSubjects as subscription} from '../../graphql/qlgd.gql'
import convertDataToArray from '../../shared/convertDataToArray'

const columns = ["Tuan", "Ma lop", "Ma mon hoc", "Ten mon hoc"];

const options = {
  filterType: 'checkbox',
};

const dataTable = ({v_get_all_subject_class}) => {
  return (
    <MUIDataTable 
    title={"Employee List"} 
    data={convertDataToArray(v_get_all_subject_class, ["tuan", "ma_lop", "ma_mon_hoc", "ten_mon_hoc"])} 
    columns={columns} 
    options={options} 
  />
  )
}
  

const QlgdReporting = () =>
  <LiveComponent
  query={query}
  subscription={subscription}
  >
    {dataTable}
  </LiveComponent>

export default QlgdReporting