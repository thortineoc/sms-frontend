import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Link} from "@material-ui/core";
import getComparator from "../../../../utilities/tablesCommons/getComparator";
import stableSort from "../../../../utilities/tablesCommons/stableSort";
import useToolbarStyles from "../../../../utilities/tablesCommons/useToolbarStyles";
import useAxiosDownloadFile from "../../../../utilities/axios/useAxiosDownloadFile";
import downloadFile from "../../../../utilities/axios/DownloadFile";

function createData(name, modificationDate, uploadedFile, comments, url) {
    return { name, modificationDate, uploadedFile, comments, url };
}

const rows = [
    createData('Adam Preflight', "01-01-2021", "file1", "comment1", "not"),
    createData('User1', "01-01-2022", "1file2", "comment 2", "https://drive.google.com/u/0/uc?id=18JhF01yDrwwEAhlBb7Tf3eKTVhP7bYZH&export=download"),
    createData('User2', "01-01-2021", "2file3", "comment1", "/"),
    createData('User3', "01-01-2021", "3file4", "comment1", "/"),
    createData('User5', "01-01-2021", "file5", "comment1", "/"),
    createData('User4', "01-01-2021", "file6", "comment1", "/"),
    createData('User6', "01-01-2021", "file7", "comment1", "/"),
    createData('User7', "01-01-2021", "file8", "comment1", "/"),
    createData('User8', "01-01-2021", "file9", "comment1", "/"),
    createData('User9', "01-01-2021", "file10", "comment1", "/"),
    createData('User10', "01-01-2021", "file11", "comment1", "/"),
    createData('User11', "01-01-2021", "file12", "comment1", "/"),
    createData('User12', "01-01-2021", "file13", "comment1", "/"),
    createData('User13', "01-01-2021", "file14", "comment1", "/"),
    createData('User14', "01-01-2021", "file15", "comment1", "/"),
];

const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
    { id: 'modificationDate', numeric: false, disablePadding: false, label: 'Modification date' },
    { id: 'uploadedFile', numeric: false, disablePadding: false, label: 'Uploaded file' },
    { id: 'comments', numeric: false, disablePadding: false, label: 'Comments' },
];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {/*<TableCell padding="checkbox">*/}
                {/*    <Checkbox*/}
                {/*        indeterminate={numSelected > 0 && numSelected < rowCount}*/}
                {/*        checked={rowCount > 0 && numSelected === rowCount}*/}
                {/*        onChange={onSelectAllClick}*/}
                {/*        inputProps={{ 'aria-label': 'select all items' }}*/}
                {/*    />*/}
                {/*</TableCell>*/}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'center'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
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

const EnhancedTableToolbar = ({numSelected, selectedData}) => {
    const classes = useToolbarStyles();
    const axiosDownloadInstance = useAxiosDownloadFile("http://52.142.201.18:24020/");


    const downloadAllHandle = () =>
    {
        console.log(selectedData);
        selectedData.forEach(homework => {
            console.log(homework.url);
            downloadFile(axiosDownloadInstance, "/homework-service/" + homework.url).then(response => {
                console.log(response);
            })
                .catch(error => console.log(error));
        });
        //downloadFile(axiosDownloadInstance, "");
    };

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    Nutrition
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={downloadAllHandle} aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                ""
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

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

function AssignmentsTable() {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const [selected, setSelected] = React.useState([]);
    const [selectedData, setSelectedData] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            setSelectedData(rows);
            return;
        }
        setSelected([]);
        setSelectedData([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        let newSelectedData;
        newSelectedData = rows.filter(obj => obj.name === name);

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
            newSelectedData = newSelectedData.concat(selectedData);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newSelectedData = newSelectedData.concat(selectedData.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newSelectedData = newSelectedData.concat(selectedData.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
            newSelectedData = newSelectedData.concat(
                selectedData.slice(0, selectedIndex),
                selectedData.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
        setSelectedData(newSelectedData);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} selectedData={selectedData} />
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
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.name)}
                                            // role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            {/*<TableCell padding="checkbox">*/}
                                            {/*    <Checkbox*/}
                                            {/*        checked={isItemSelected}*/}
                                            {/*        inputProps={{ 'aria-labelledby': labelId }}*/}
                                            {/*    />*/}
                                            {/*</TableCell>*/}
                                            <TableCell component="th" id={labelId} align={"center"} scope="row" padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="center">{row.modificationDate}</TableCell>
                                            <TableCell  component={Link} href={row.url} download={row.name + "-" + row.uploadedFile} align="center">{row.uploadedFile}</TableCell>
                                            <TableCell align="center">{row.comments}</TableCell>
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
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Dense padding"
            />
        </div>
    );
}

export default AssignmentsTable;