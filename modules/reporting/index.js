import MUIDataTable from "../../components/mui-datatables";
import LiveComponent from '../../hocs/liveComponent'
import {QueryAllLessonClass as query, SubscribeAllLessonClass as subscription} from '../../graphql//modules/qlgd/v_get_all_lesson_class.gql'
import convertDataToArray from '../../shared/convertDataToArray'

const columns = ["Tuan", "Don vi", "Giang vien",
  "Ma lop", "Ma mon hoc",
  "Phong", "Si so", "So Tiet"];

const options = {
  filter: true,
  selectableRows: true,
  filterType: 'dropdown',
  responsive: 'stacked',
  rowsPerPage: 10,
  onRowsSelect: (rowsSelected, allRows) => {
    console.log(rowsSelected, allRows);
  },
  onRowsDelete: (rowsDeleted) => {
    console.log(rowsDeleted, "were deleted!");
  },
  onChangePage: (numberRows) => {
    console.log(numberRows);
  },
  onSearchChange: (searchText) => {
    console.log(searchText);
  },
  onColumnSortChange: (column, direction) => {
    console.log(column, direction);
  },
  onColumnViewChange: (column, action) => {
    console.log(column, action);
  },
  onFilterChange: (column, filters) => {
    console.log(column, filters);
  },
  onCellClick: (cellIndex, rowIndex) => {
    console.log(cellIndex, rowIndex);
  },
  onRowClick: (rowData, rowState) => {
    console.log(rowData, rowState);
  }
};

const dataTable = ({v_get_all_lesson_class}) => {
  return (
    <MUIDataTable 
    title={"Employee List"} 
    data={convertDataToArray(v_get_all_lesson_class, 
      ["tuan", "don_vi", "giang_vien", "ma_lop",
    "ma_mon_hoc", "phong", "si_so", "so_tiet"])} 
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