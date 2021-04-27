import React, {useCallback, useEffect, useState} from 'react';
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/useAxios";
import callBackendPost from "../../../../utilities/CallBackendPost";
import Button from "../../../../components/Button/Button";
import SearchField from "../../../../components/SearchField/SearchField";
import {SearchIcon} from "@heroicons/react/solid";
import Modal from "../../components/Modal/Modal";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import ListCheckbox from "../../../../components/ListCheckbox/ListCheckbox";
import CreateForm from "../../components/CreateForm/CreateForm";
import GroupsSubjectsTable from "../../components/GroupsSubjectsTable/GroupsSubjectsTable";
import Details from "../../components/Details/Details";
import EditForm from "../../components/EditForm/EditForm";

const flatten = (users) => {
    return users.map(user => {
        if (!!user["customAttributes"]) {
            return {...user["customAttributes"], ...user};
        } else {
            return user;
        }
    });
}
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
const removeEmptyStrings = (obj) => {
    return Object.keys(obj)
        .filter((k) => obj[k] !== "")
        .reduce((a, k) => ({ ...a, [k]: obj[k] }), {});
}

const UserManagement = (props) => {
    const [users, setUsers] = useState({});
    const [filterParams, setFilterParams] = useState({role: props.type});
    const [filterModalShown, setFilterModalShown] = useState(false);
    const [columnModalShown, setColumnModalShown] = useState(false);
    const [createUserModalShown, setCreateUserModalShown] = useState(false);
    const [columns, setColumns] = useState(JSON.parse(sessionStorage.getItem("SMS_tableColumns")) ?? ["firstName", "lastName", "group", "pesel"]);
    const [detailsModalShown, setDetailsModalShown] = useState(false);
    const [detailsUser, setDetailsUser] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [showGroups, setShowGroups] = useState(false);

    const {keycloak, initialized} = useKeycloak();
    const axiosInstance = useAxios('http://52.142.201.18:24020/');

    useEffect( () => {
        fetchData();
    }, [initialized]);

    const fetchData = () => {
        let params = removeEmptyStrings(filterParams)
        console.log(params)
        callBackendPost(axiosInstance, "usermanagement-service/users/filter", params)
            .then(response => {
                if(response.status===200){
                    console.log(flatten(response.data));
                    setUsers(flatten(response.data))
                } else if(response.status===204){
                    setUsers({})
                }

            })
            .catch(error => console.log(error))
    }

    if (!initialized) {
        return <div>Loading...</div>
    }
    if (!!initialized && !keycloak.authenticated) {
        keycloak.login();
    }

    return (
        <div className="StudentManagement">
            <h1 className="StudentManagement__header">{props.type+"s' accounts"}</h1>

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
                            <SearchIcon className="SearchIcon" onClick={fetchData} />
                        </div>
                    </div>
                </div>
                <div className="CreationButtons">
                    <Button label='New account' onClick={() => setCreateUserModalShown(true)} />
                    <Button label={"Manage " + (props.type === "STUDENT" ? "groups" : "subjects")} onClick={() => setShowGroups(true)} />
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
                                     fetchData();
                                     console.log(values);
                                     //runBackend(axiosInstance, "/usermanagement-service/users/filter", values);
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
                fetchData();
                //runBackend(axiosInstance, "/usermanagement-service/users/filter", filterParams);
            }} >
                <CreateForm type={props.type} setCreateUserModalShown={setCreateUserModalShown} />
            </Modal>}

            {showGroups && <Modal onClose={() => setShowGroups(false)}>
                <GroupsSubjectsTable type={props.type === "STUDENT" ? "groups" : "subjects"} />
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
                {showEdit && <EditForm user={detailsUser} />}

            </Modal>
            }
        </div>
    );
};

export default UserManagement;
