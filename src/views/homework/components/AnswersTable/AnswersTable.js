import React, {useEffect, useState} from 'react';
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
import AddCircle from "../../../grades/components/AddCircle/AddCircle";
import useAxios from "../../../../utilities/useAxios";
import callBackendPost from "../../../../utilities/CallBackendPost";

function downloadHomework(uri) {
    console.log(uri);
}

function createGrade() {
    console.log("GRADE ONCLICK");
}

function editGrade() {
    console.log("GRADE EDIT");
}

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});

function Row({row, subject}) {
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
                <TableCell>{row.createdTime ? row.createdTime : "-"}</TableCell>
                <TableCell>{row.lastUpdatedTime  ? row.lastUpdatedTime : "-" }</TableCell>
                {row.grade ? <TableCell component={Link} onClick={() => editGrade()}>{row.grade.grade}</TableCell>
                    : <TableCell>
                        <AddCircle studentId={row.user.id} type="REGULAR" subject={subject}/>
                    </TableCell>}
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
                                    {row.files?.map((userFiles) => (
                                        <TableRow key={userFiles.uri}>
                                            <TableCell component="th" scope="row">
                                                {userFiles.filename}
                                            </TableCell>
                                            <TableCell component={Link}
                                                       onClick={() => downloadHomework(userFiles.uri)}>download</TableCell>
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

function mapUsersToAnswers(allUsers, answers) {
    let usersWithAnswers = answers.map(answers => answers.user);
    let usersWithoutAnswer = usersWithAnswers.concat(allUsers)
        .filter(item => !usersWithAnswers.includes(item));
    // map to empty answer
    let allAns = answers.concat(usersWithoutAnswer.map(user => {
            return {
                "user":
                    {
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
            }
        }));
    return allAns
}

const AnswersTable = ({answers, subject, group}) => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        callBackendPost(axiosInstance, "usermanagement-service/users/filter", {group: group})
            .then(response => {
                if (response.status === 200) {
                    setAllUsers(response.data)
                } else if (response.status === 204) {
                    setAllUsers([])
                }

            })
            .catch(error => console.log(error))
    }, [])

    if(allUsers == null || answers == null)
    {
        return ("Loading...");
    }

    let rows = mapUsersToAnswers(allUsers, answers);

    return (
        <TableContainer component={Paper} style={{borderRadius: "10px", marginTop: 5}}>
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
                        <Row key={row.name} row={row} subject={subject}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AnswersTable;
