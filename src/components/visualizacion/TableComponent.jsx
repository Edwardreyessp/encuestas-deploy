import DataGrid from '@mui/material';

const TableComponent = data => {
  const [headers, setHeaders] = useState(getTableHeaders(data));
  /**
   * Extract the data keys and returns the table headers array
   * param {Object} data
   * returns {Array} table headers
   */
  const getTableHeaders = data => {
    const headers = Object.keys(data);
    return headers.map(header => {
      return {
        field: header,
        headerName: header,
        width: 150,
      };
    });
  };
};

export default TableComponent;
