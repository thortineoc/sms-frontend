import React, {useEffect, useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/useAxios";
import callBackendPost from "../../../../utilities/CallBackendPost";
import {TableHead} from "@material-ui/core";
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Modal from "../../../../components/Modal/Modal";
import EnhancedTableToolbar from "./EnhancedTableToolbar/EnhancedTableToolbar";
import Details from "../Details/Details";
import EditForm from "../EditForm/EditForm";

const removeEmptyStrings = (obj) => {
    return Object.keys(obj)
        .filter((k) => obj[k] !== "")
        .reduce((a, k) => ({...a, [k]: obj[k]}), {});
}

const flatten = (users) => {
    return users.map(user => {
        if (!!user["customAttributes"]) {
            return {...user["customAttributes"], ...user};
        } else {
            return user;
        }
    });
}

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {props.displayColumns.map(function (headCell, i) {
                    if (headCell.display === true) {
                        return (
                            <TableCell
                                key={headCell.id}
                                align={'left'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <span className={classes.visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        )
                    }
                })}
            </TableRow>
        </TableHead>
    );
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
        cursor: 'pointer'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function UserDisplayTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('firstName');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState("Loading...")
    const {keycloak, initialized} = useKeycloak();
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [filterParams, setFilterParams] = useState({role: props.role});
    const [requireRefresh, setRequireRefresh] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [showEdit, setShowEdit] = useState(false);
    const [displayColumns, setDisplayColumns] = useState((props.role === "STUDENT" ? [
        {id: 'firstName', display: true, label: 'First Name'},
        {id: 'middleName', display: false, label: 'Middle name'},
        {id: 'lastName', display: true, label: 'Last Name'},
        {id: 'email', display: false, label: 'E-mail'},
        {id: 'phoneNumber', display: false, label: 'Phone'},
        {id: 'group', display: true, label: 'Group'},
        {id: 'pesel', display: true, label: 'Pesel'},
        {id: 'userName', display: true, label: 'Username'},
        {id: 'id', display: false, label: 'ID'},
    ] : [
        {id: 'firstName', display: true, label: 'First Name'},
        {id: 'middleName', display: false, label: 'Middle name'},
        {id: 'lastName', display: true, label: 'Last Name'},
        {id: 'email', display: false, label: 'E-mail'},
        {id: 'phoneNumber', display: false, label: 'Phone'},
        {id: 'pesel', display: true, label: 'Pesel'},
        {id: 'userName', display: true, label: 'Username'},
        {id: 'id', display: false, label: 'ID'},
    ]));


    useEffect(() => {
        fetchData();
    }, [initialized]);

    useEffect(() => {
        fetchData();
    }, [filterParams]);

    useEffect(() => {
        fetchData();
        setRequireRefresh(false);
    }, [requireRefresh]);

    const handleFiltersParamsChanged = (values) => {
        setFilterParams(values);
    }

    const handleRequireRefresh = () => {
        setRequireRefresh(true);
    }

    const fetchData = () => {
        callBackendPost(axiosInstance, "usermanagement-service/users/filter", removeEmptyStrings(filterParams))
            .then(response => {
                if (response.status === 200) {
                    setArray(flatten(response.data))
                    // console.log(rows);
                } else if (response.status === 204) {
                    setArray([])
                }

            })
            .catch(error => console.log(error))
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSearch = (value) => {
        console.log(value)
        setFilterParams({...filterParams, search: value});
        console.log(filterParams);
    }

    const handleClick = (row) => {
        // console.log(row)
        setSelectedUser(row)
        setShowDetails(true);
        setShowEdit(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    role={props.role}
                    handleFiltersParamsChanged={handleFiltersParamsChanged}
                    requireRefresh={handleRequireRefresh}
                    searchUpdated={handleSearch}
                    displayColumns={displayColumns}
                    setDisplayColumns={setDisplayColumns}
                    fetchData={fetchData}
                    filterParams={filterParams}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            displayColumns={displayColumns}
                            rowCount={rows.length}
                        />

                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={() => handleClick(row)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >

                                            {displayColumns.map(function(column, index) {

                                                if(column.display===true){
                                                    return(
                                                        (index === 0 ? <TableCell component="th" id={labelId} scope="row"
                                                                                  padding="10px">{row[column.id]}</TableCell>
                                                                : <TableCell align="left">{row[column.id]}</TableCell>
                                                        ))
                                                }

                                            })}

                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{height: (53) * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            {showDetails &&
            <Modal isOpen={showDetails}
                   setIsOpen={setShowDetails}
                   onClose={() => {
                       setShowDetails(false);
                       setShowEdit(false)
                   }}
                >
                {!showEdit &&
                <Details
                    user={selectedUser}
                    setShowEdit={setShowEdit}
                    setDetailsModalShown={setShowDetails}
                    role={props.role}
                    fetchData={fetchData}
                />}
                {showEdit && <EditForm user={selectedUser} role={props.role} fetchData={fetchData}
                                       refresh={handleRequireRefresh}/>}
            </Modal>}

        </div>
    );
}

