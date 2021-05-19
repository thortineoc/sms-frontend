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
import Grade from "../../../grades/components/Grade/Grade";
import AddReviewCircle from "../AddCircle/AddReviewCircle";

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


const getGrade = (row, subject, setRefresh) =>{

    if(!row.answer){
        return(
            <TableCell>
                -
            </TableCell>
        )
    } else {
        if(!row.answer.grade){
            return(
                <TableCell>
                    <AddCircle studentId={row.student.id} type="REGULAR" subject={subject} answer={row.answer} setRefresh={setRefresh}/>
                </TableCell>
            )
        } else {
            console.log(row.answer.grade)
            return(
                <TableCell>
                    <Grade role={"TEACHER"} value={row.answer.grade} setRefresh={setRefresh} type="regular"/>
                </TableCell>
            )
        }
    }
}
const getReview = (row, setRefresh) =>{

    if(!row.answer){
        return(
            <TableCell>
                -
            </TableCell>
        )
    } else {
            return(
                <TableCell>
                    <AddReviewCircle row={row}/>
                </TableCell>
            )
        }
    }


function Row({row, subject, toGrade, fetchHomeworkData}) {
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        fetchHomeworkData();
        setRefresh(false)
    }, [refresh]);

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.student.firstName}
                </TableCell>
                <TableCell>{row.student.lastName}</TableCell>
                <TableCell>{row.answer ? row.answer.createdTime.split("T")[0] : "-"}</TableCell>
                <TableCell>{row.answer ? row.answer.lastUpdatedTime.split("T")[0] : "-" }</TableCell>
                {getReview(row, setRefresh)}
                {getGrade(row, subject, setRefresh)}
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <p style={{margin: "15"}}>{row.review}</p>
                            <h4 style={{margin: "15"}}>User's files</h4>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Download</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.answer?.files?.map((userFiles) => (
                                        <TableRow key={userFiles.uri}>
                                            <TableCell component="th" scope="row">
                                                {userFiles.filename}
                                            </TableCell>
                                            <TableCell>
                                            <Link href={userFiles.uri} color="inherit">
                                                download
                                             </Link>
                                            </TableCell>
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

// function mapUsersToAnswers(allUsers, answers) {
//     let usersWithAnswers = answers.map(answers => answers.user);
//     let usersWithoutAnswer = usersWithAnswers.concat(allUsers)
//         .filter(item => !usersWithAnswers.includes(item));
//     // map to empty answer
//     let allAns = answers.concat(usersWithoutAnswer.map(user => {
//             return {
//                 "user":
//                     {
//                         firstName: user.firstName,
//                         lastName: user.lastName
//                     }
//             }
//         }));
//     return allAns
// }

const AnswersTable = ({answers, subject, group, toGrade, fetchHomeworkData}) => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [allUsers, setAllUsers] = useState([]);

    // useEffect(() => {
    //     callBackendPost(axiosInstance, "usermanagement-service/users/filter", {group: group})
    //         .then(response => {
    //             if (response.status === 200) {
    //                 setAllUsers(response.data)
    //             } else if (response.status === 204) {
    //                 setAllUsers([])
    //             }
    //
    //         })
    //         .catch(error => console.log(error))
    // }, [])

    // if(allUsers == null || answers == null)
    // {
    //     return ("Loading...");
    // }

    //let rows = mapUsersToAnswers(allUsers, answers);
    let rows=answers;

    return (
        <TableContainer component={Paper} style={{borderRadius: "10px", marginTop: "10px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)"}}>
            <h3 style={{margin: "15px"}}>Answers</h3>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell/>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Create date</TableCell>
                        <TableCell>Modification date</TableCell>
                        <TableCell>Review</TableCell>
                        {toGrade && <TableCell>Grade</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} subject={subject} toGrade={toGrade} fetchHomeworkData={fetchHomeworkData}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AnswersTable;
