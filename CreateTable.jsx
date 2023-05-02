import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { res } from './response';

const CreateTable = () => {
  const data = res.tabla;
  const headers = Object.keys(data);
  const rowsLenght = Object.values(data)[0].length;

  const rows = [];
  for (let i = 0; i < rowsLenght; i++) {
    const rowValues = [];
    for (let header of headers) {
      rowValues.push(data[header][i]);
    }
    rows.push(rowValues);
  }
  console.log(rows);
  console.log(headers);
  function visualRows(rowsArr) {
    return rowsArr.map((row, i) => {
      return (
        <TableRow key={`${i}tablerow`}>
          {row.map(cell => (
            <TableCell key={`cell${cell}`}>{cell}</TableCell>
          ))}
        </TableRow>
      );
    });
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{visualRows(rows)}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CreateTable;
