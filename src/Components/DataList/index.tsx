import React, {useEffect, useState} from 'react';
import { styled, Table, TableBody, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import { endPoint } from '../../App';

const sampleRows = [
    { name: 'User1', age: 35 },
    { name: 'User4', age: 35 },
    { name: 'User2', age: 35 },
    { name: 'User3', age: 35 }
]

const DataList = () => {
    const [rows, setRows] = useState(sampleRows);

    useEffect(() => {
        ( async function () {
           try {
                const response = await axios.get(`${endPoint}/all`);
                console.log(response);
                if (response && response.data) {
                    const rows = response.data['records'];
                    setRows(rows);
                }
           } catch(e) {
                console.log(JSON.stringify(e));
           }
        })();
    },[])
    
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.common.white,
            textTransform:'capitalize'
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>User</StyledTableCell>
                        <StyledTableCell align="right">Age</StyledTableCell>                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.age}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DataList;