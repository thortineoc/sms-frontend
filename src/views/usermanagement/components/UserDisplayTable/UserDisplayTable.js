import React, { useEffect, useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/useAxios";
import callBackendPost from "../../../../utilities/CallBackendPost";
import {TableHead} from "@material-ui/core";
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Modal from "../../../../components/Modal/Modal";
import FiltersForm from "../FiltersForm/FiltersForm";
import EnhancedTableToolbar from "./EnhancedTableToolbar";
import Details from "../Details/Details";

const removeEmptyStrings = (obj) => {
    return Object.keys(obj)
        .filter((k) => obj[k] !== "")
        .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
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

const headCells = [
    { id: 'firstName', numeric: false, disablePadding: true, label: 'First Name' },
    { id: 'lastName', numeric: true, disablePadding: false, label: 'Last Name' },
    { id: 'pesel', numeric: true, disablePadding: false, label: 'Pesel' },
    { id: 'userName', numeric: true, disablePadding: false, label: 'Username' },
    { id: 'group', numeric: true, disablePadding: false, label: 'Group' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? '10px' : 'default'}
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
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};





const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%',
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -35%)",

    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {

        minWidth: 750,
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
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows, setArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState("Loading...")
    const {keycloak, initialized} = useKeycloak();
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [filterParams, setFilterParams] = useState({role: props.type});
    const [requireRefresh, setRequireRefresh] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState();
    const [detailsModalShown, setDetailsModalShown] = useState(false);
    const [detailsUser, setDetailsUser] = useState({});
    const [showEdit, setShowEdit] = useState(false);

    useEffect( () => {
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

    const handleRequireRefresh = () =>{
        setRequireRefresh(true);
    }

    const fetchData = () => {
        callBackendPost(axiosInstance, "usermanagement-service/users/filter", removeEmptyStrings(filterParams))
            .then(response => {
                console.log(flatten(response.data));
                setArray(flatten(response.data))
            })
            .catch(error => console.log(error))
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };



    const handleClick = (row) => {
        console.log(row)
        setSelectedUser(row)
        setShowDetails(true);
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
                    type={props.type}
                    handleFiltersParamsChanged={handleFiltersParamsChanged}
                    requireRefresh={handleRequireRefresh}
                />
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}

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
                                            onClick={()=>handleClick(row)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                        >

                                            <TableCell component="th" id={labelId} scope="row" padding="10px">
                                                {row.firstName}
                                            </TableCell>
                                            <TableCell align="right">{row.lastName}</TableCell>
                                            <TableCell align="right">{row.pesel}</TableCell>
                                            <TableCell align="right">{row.userName}</TableCell>
                                            <TableCell align="right">{row.group}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
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
            <Modal isOpen={showDetails} setIsOpen={setShowDetails}>
                <Details user={selectedUser} setShowEdit={setShowEdit} setDetailsModalShown={setShowDetails}/>
            </Modal>

        </div>
    );
}

