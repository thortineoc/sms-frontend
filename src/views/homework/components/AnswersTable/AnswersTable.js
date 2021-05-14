import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {Link} from "@material-ui/core";

function createData(firstName, lastName, modificationDate, uploadedFile, comments, url) {
    return {firstName, lastName, modificationDate, uploadedFile, comments, url};
}

// const rows = [
//     createData('Adam', "Wojtyla", "01-01-2021", "file1", "comment1", "not"),
//     createData('User1', "User", "01-01-2022", "1file2", "comment 2", "https://drive.google.com/u/0/uc?id=18JhF01yDrwwEAhlBb7Tf3eKTVhP7bYZH&export=download")
// ];

function downloadHomework(uri)
{
    console.log(uri);
}

function createGrade()
{
    console.log("GRADE ONCLICK");
}

function editGrade()
{
    console.log("GRADE EDIT");
}

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row(props) {
    const {row} = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.user.firstName}
                </TableCell>
                <TableCell>{row.user.lastName}</TableCell>
                <TableCell>{row.createdTime}</TableCell>
                <TableCell>{row.lastUpdatedTime}</TableCell>
                {row.grade ? <TableCell component={Link} onClick={() => editGrade()}>{row.grade.grade}</TableCell> : <TableCell component={Link} onClick={() => createGrade()}>Grade</TableCell>}
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <h4 style={{margin: "15px"}}>User's files</h4>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Download</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.files.map((userFiles) => (
                                    <TableRow key={userFiles.uri}>
                                        <TableCell component="th" scope="row">
                                            {userFiles.filename}
                                        </TableCell>
                                        <TableCell component={Link} onClick={() => downloadHomework(userFiles.uri)}>download</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const AnswersTable = ({answers}) => {
    let rows = answers;
    console.log(rows);
    return (
        <TableContainer component={Paper} style={{ borderRadius: "10px", marginTop: 5}}>
            <h3 style={{margin: "15px"}}>Answers</h3>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Create date</TableCell>
                        <TableCell>Modification date</TableCell>
                        <TableCell>Grade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AnswersTable;
