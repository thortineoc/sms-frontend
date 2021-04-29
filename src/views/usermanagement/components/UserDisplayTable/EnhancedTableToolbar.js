import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import React, {useState} from "react";
import FilterListIcon from '@material-ui/icons/FilterList';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SchoolIcon from '@material-ui/icons/School';
import {lighten, makeStyles} from "@material-ui/core/styles";
import FiltersForm from "../FiltersForm/FiltersForm";
import ListCheckbox from "../../../../components/ListCheckbox/ListCheckbox";
import CreateForm from "../CreateForm/CreateForm";
import GroupsSubjectsTable from "../GroupsSubjectsTable/GroupsSubjectsTable";
import Modal from "../../../../components/Modal/Modal";
import SearchBar from "material-ui-search-bar";
import ColumnsCheckbox from "../ColumnsCheckbox/ColumnsCheckbox";

const allColumns = [
    "id", "firstName", "lastName", "middleName", "group", "pesel", "phoneNumber", "email", "userName"
];

const columnNameTranslations = {
    id: "User ID",
    firstName: "First Name",
    lastName: "Last Name",
    middleName: "Middle Name",
    userName: "Username",
    pesel: "PESEL",
    phoneNumber: "Phone Number",
    email: "E-mail Address",
    group: "Group"
}

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const [filterParams, setFilterParams] = useState({role: props.type});
    const [filterModalShown, setFilterModalShown] = useState(false);
    const [columnModalShown, setColumnModalShown] = useState(false);
    const [createUserModalShown, setCreateUserModalShown] = useState(false);
    const [columns, setColumns] = useState(JSON.parse(sessionStorage.getItem("SMS_tableColumns")) ?? ["firstName", "lastName", "group", "pesel"]);
    const [searchValue, setSearchValue] = useState("");

    const [showGroups, setShowGroups] = useState(false);

    const handleCreateUserClicked = () =>{
        setCreateUserModalShown(true)
    }

    const handleFilterClicked = () =>{
        setFilterModalShown(true)
    }

    const handleItemsClicked = () =>{
        setShowGroups(true)
    }

    const handleColumnsClicked = () => {
        setColumnModalShown(true)
    }
    return (
        <Toolbar
            className={clsx(classes.root)}
        >
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                {props.type.charAt(0) + props.type.slice(1).toLowerCase() + "s' accounts"}
            </Typography>

            <SearchBar
                value={searchValue}
                onChange={(newValue) => setSearchValue(newValue)}
                onRequestSearch={() => {
                    props.searchUpdated(searchValue)
                }}
                onCancelSearch={() => props.searchUpdated("")}
            />

            <Tooltip title="Add new user">
                <IconButton aria-label="add">
                    <PersonAddIcon onClick={handleCreateUserClicked}/>
                </IconButton>
            </Tooltip>

            {props.type==="STUDENT" &&
            <Tooltip title="Mange groups">
                <IconButton aria-label="manage">
                    <GroupIcon onClick={handleItemsClicked}/>
                </IconButton>
            </Tooltip>
            }

            {props.type==="TEACHER" &&
            <Tooltip title="Mange subjects">
                <IconButton aria-label="manage">
                    <SchoolIcon onClick={handleItemsClicked}/>
                </IconButton>
            </Tooltip>
            }

            <Tooltip title="Columns">
                <IconButton aria-label="columns">
                    <ViewWeekIcon onClick={handleColumnsClicked}/>
                </IconButton>
            </Tooltip>

            <Tooltip title="Filter users">
                <IconButton aria-label="filter list">
                    <FilterListIcon onClick={handleFilterClicked}/>
                </IconButton>
            </Tooltip>


            <Modal setIsOpen={setCreateUserModalShown} isOpen={createUserModalShown}>
                <CreateForm type={props.type} requireRefresh={props.requireRefresh} setCreateUserModalShown={setCreateUserModalShown}/>
            </Modal>

            <Modal setIsOpen={setColumnModalShown} isOpen={columnModalShown}>
                <ColumnsCheckbox displayColumns={props.displayColumns} setDisplayColumns={props.setDisplayColumns}/>
            </Modal>

            <Modal setIsOpen={setShowGroups} isOpen={showGroups}>
                <GroupsSubjectsTable type={props.type==="STUDENT" ? "groups" : "subjects"}/>
            </Modal>

            <Modal setIsOpen={setFilterModalShown} isOpen={filterModalShown}>
                <FiltersForm onSubmit={props.handleFiltersParamsChanged} setIsActive={setFilterModalShown}/>
            </Modal>

        </Toolbar>

    );
};



export default EnhancedTableToolbar;