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
import FiltersForm from "../../FiltersForm/FiltersForm";
import CreateForm from "../../CreateForm/CreateForm";
import GroupsSubjectsTable from "../../GroupsSubjectsTable/GroupsSubjectsTable";
import Modal from "../../../../../components/Modal/Modal";
import SearchBar from "material-ui-search-bar";
import ColumnsCheckbox from "../../ColumnsCheckbox/ColumnsCheckbox";
import './EnhancedTableToolbar.css';
import useToolbarStyles from "../../../../../utilities/tablesCommons/useToolbarStyles";

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const [filterModalShown, setFilterModalShown] = useState(false);
    const [columnModalShown, setColumnModalShown] = useState(false);
    const [createUserModalShown, setCreateUserModalShown] = useState(false);
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
                {/*{props.role.charAt(0) + props.role.slice(1).toLowerCase() + "s' accounts"}*/}
            </Typography>

            <SearchBar
                value={searchValue}
                onChange={(newValue) => setSearchValue(newValue)}
                onRequestSearch={() => {
                    props.searchUpdated(searchValue)
                }}
                onCancelSearch={() => props.searchUpdated("")}
            />

            <Tooltip title="Add new user" onClick={handleCreateUserClicked}>
                <IconButton
                    id="add_user"
                    aria-label="add"
                >
                    <PersonAddIcon />
                </IconButton>
            </Tooltip>

            {props.role === "STUDENT" &&
            <Tooltip title="Mange groups" onClick={handleItemsClicked} >
                <IconButton
                    id="manage_groups"
                    aria-label="manage"
                    className="Toolbar__icon"
                >
                    <GroupIcon />
                </IconButton>
            </Tooltip>
            }

            {props.role === "TEACHER" &&
            <Tooltip title="Mange subjects" onClick={handleItemsClicked}>
                <IconButton
                    id="manage_subjects"
                    aria-label="manage"
                >
                    <SchoolIcon />
                </IconButton>
            </Tooltip>
            }

            <Tooltip title="Columns" onClick={handleColumnsClicked}>
                <IconButton
                    id="columns"
                    aria-label="columns"
                >
                    <ViewWeekIcon />
                </IconButton>
            </Tooltip>

            <Tooltip title="Filter users" onClick={handleFilterClicked}>
                <IconButton
                    id="filter_users"
                    aria-label="filter list"
                >
                    <FilterListIcon />
                </IconButton>
            </Tooltip>


            <Modal setIsOpen={setCreateUserModalShown} isOpen={createUserModalShown}>
                <CreateForm role={props.role} requireRefresh={props.requireRefresh} setCreateUserModalShown={setCreateUserModalShown}/>
            </Modal>

            <Modal setIsOpen={setColumnModalShown} isOpen={columnModalShown}>
                <ColumnsCheckbox
                    displayColumns={props.displayColumns}
                    setDisplayColumns={props.setDisplayColumns}
                    fetchData={props.fetchData}
                    setIsActive={setColumnModalShown}
                />
            </Modal>

            <Modal setIsOpen={setShowGroups} isOpen={showGroups}>
                <GroupsSubjectsTable role={props.role === "STUDENT" ? "groups" : "subjects"}/>
            </Modal>

            <Modal setIsOpen={setFilterModalShown} isOpen={filterModalShown}>
                <FiltersForm
                    onSubmit={props.handleFiltersParamsChanged}
                    setIsActive={setFilterModalShown}
                    initValues={props.filterParams}
                    role={props.role}
                />
            </Modal>

        </Toolbar>

    );
};



export default EnhancedTableToolbar;