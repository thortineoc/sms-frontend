import React, {useCallback, useState} from 'react';
import DisplayTable from "../../components/DisplayTable/DisplayTable";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import "./StudentsManagement.css";
import Modal from "../../components/Modal/Modal";
import CreateForm from "../../components/CreateForm/CreateForm";
import ListCheckbox from "../../../../components/ListCheckbox/ListCheckbox";
import Details from "../../components/Details/Details";
import Button from "../../../../components/Button/Button";
import EditForm from "../../components/EditForm/EditForm";
import {useKeycloak} from "@react-keycloak/web";
import callBackendPost from "../../../../utilities/CallBackendPost";
import useAxios from "../../../../utilities/useAxios";
import GroupsSubjectsTable from "../../components/GroupsSubjectsTable/GroupsSubjectsTable";
import SearchField from "../../../../components/SearchField/SearchField";
import {SearchIcon} from "@heroicons/react/solid";
import UserManagement from "../../layouts/UsersManagement/UserManagement";

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

const allColumns = [
    "id", "firstName", "lastName", "middleName", "group", "pesel", "phoneNumber", "email", "userName"
];

let firstLoad = true;

const StudentManagement = () => {
    /*
    const [users, setUsers] = useState({});
    const [filterParams, setFilterParams] = useState({role: "STUDENT"});
    const [filterModalShown, setFilterModalShown] = useState(false);
    const [columnModalShown, setColumnModalShown] = useState(false);
    const [createUserModalShown, setCreateUserModalShown] = useState(false);
    const [columns, setColumns] = useState(JSON.parse(sessionStorage.getItem("SMS_tableColumns")) ?? ["firstName", "lastName", "group", "pesel"]);
    const [detailsModalShown, setDetailsModalShown] = useState(false);
    const [detailsUser, setDetailsUser] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [showGroups, setShowGroups] = useState(false);
*/




/*

    return (
        <div className="StudentManagement">
            <h1 className="StudentManagement__header">Students' accounts</h1>

            <div className="ButtonsGroup">
                <div className="TableButtons">
                    <Button label='Filters' onClick={() => setFilterModalShown(true)} />
                    <Button label='Columns' onClick={() => setColumnModalShown(true)} />
                    <div className="StudentManagement__SearchField">
                        <SearchField disabled={!filterParams["search"]}
                                     onChange={(event) => {
                                         setFilterParams({...filterParams, search: event.target.value});
                                     }}
                        />
                        <div className="SearchIcon-wrapper">
                            <SearchIcon className="SearchIcon" onClick={() => runBackend(axiosInstance, "/usermanagement-service/users/filter", filterParams)} />
                        </div>
                    </div>
                </div>
                <div className="CreationButtons">
                    <Button label='New account' onClick={() => setCreateUserModalShown(true)} />
                    <Button label='Manage groups' onClick={() => setShowGroups(true)} />
                </div>
            </div>
            {filterModalShown && <Modal configuration={"LEFT"}
                                        contentConfiguration={"TOP"}
                                        fitContent={true}
                                        opaqueBackground={false}
                                        onClose={() => setFilterModalShown(false)}>
                <div>
                    <FiltersForm initValues={filterParams}
                                 onSubmit={values => {
                                     runBackend(axiosInstance, "/usermanagement-service/users/filter", values);
                                     setFilterModalShown(false);
                                     setFilterParams(values);
                                 }} />
                </div>
            </Modal>}
            {columnModalShown && <Modal configuration={"LEFT"}
                                        contentConfiguration={"TOP"}
                                        opaqueBackground={false}
                                        fitContent={true}
                                        onClose={() => setColumnModalShown(false)} >
                <div>
                    <ListCheckbox initValues={columns}
                                  items={allColumns}
                                  itemTranslations={columnNameTranslations}
                                  onApply={newColumns => {
                                      sessionStorage.setItem("SMS_tableColumns", JSON.stringify(newColumns));
                                      setColumns(newColumns);
                                      setColumnModalShown(false);
                                  }} />
                </div>
            </Modal>}

            {createUserModalShown && <Modal onClose={() => {
                setCreateUserModalShown(false);
                runBackend(axiosInstance, "/usermanagement-service/users/filter", filterParams);
            }} >
                <CreateForm type='groups' setCreateUserModalShown={setCreateUserModalShown} />
            </Modal>}

            {showGroups && <Modal onClose={() => setShowGroups(false)}>
                <GroupsSubjectsTable type="groups" />
            </Modal>}

            {detailsModalShown &&
            <Modal
                onClose={() => {
                    setDetailsModalShown(false);
                    setShowEdit(false)
                }}
            >
                {!showEdit && <Details
                    user={detailsUser}
                    showEdit={showEdit}
                    setShowEdit={setShowEdit}
                    setDetailsModalShown={setDetailsModalShown}
                /> }
                {showEdit && <EditForm user={detailsUser} groups={groups_mock} />}

            </Modal>
            }

            <DisplayTable onRowClick={onRowClick}
                          tableContent={users}
                          columns={columns} />
        </div>
    );

    function onRowClick(user) {
        setDetailsModalShown(true);
        setDetailsUser(user);
    }

 */

    return (
        <UserManagement type={"STUDENT"}/>
    )
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

const removeEmptyStrings = (obj) => {
    return Object.keys(obj)
        .filter((k) => obj[k] !== "")
        .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
}


export default StudentManagement;
