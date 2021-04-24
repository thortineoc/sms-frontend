import React, {useState} from 'react';
import DisplayTable from "../../components/DisplayTable/DisplayTable";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import axios from "axios";
import "./StudentsManagement.css";
import Modal from "../../components/Modal/Modal";
import CreateForm from "../../components/CreateForm/CreateForm";
import ListCheckbox from "../../../../components/ListCheckbox/ListCheckbox";
import Details from "../../components/Details/Details";
import Button from "../../../../components/Button/Button";
import EditForm from "../../components/EditForm/EditForm";
import {useKeycloak} from "@react-keycloak/web";
import GroupsSubjectsTable from "../../components/GroupsSubjectsTable/GroupsSubjectsTable";

const columnNameTranslations = {
    id: "User ID",
    firstName: "First Name",
    lastName: "Last Name",
    middleName: "Middle Name",
    username: "Username",
    pesel: "PESEL",
    phoneNumber: "Phone Number",
    email: "E-mail Address",
    group: "Group"
}

const allColumns = [
    "id", "firstName", "lastName", "middleName", "group", "pesel", "phoneNumber", "email", "username"
];

const StudentManagement = ({role}) => {
    const {keycloak, initialized} = useKeycloak();
    const [filterParams, setFilterParams] = useState({});
    const [filterModalShown, setFilterModalShown] = useState(false);
    const [columnModalShown, setColumnModalShown] = useState(false);
    const [createUserModalShown, setCreateUserModalShown] = useState(false);
    const [columns, setColumns] = useState(["id", "firstName", "lastName", "group", "pesel"]);
    const [detailsModalShown, setDetailsModalShown] = useState(false);
    const [detailsUser, setDetailsUser] = useState({});
    const [showEdit, setShowEdit] = useState(false);
    const [showGroups, setShowGroups] = useState(false);

    if (!initialized) {
        return <div>Loading...</div>
    }
    if (!!initialized && !keycloak.authenticated && role !== "ADMIN") {
        keycloak.login();
    }

    return (
        <div className="StudentManagement">
            <h1 className="StudentManagement__header">Students' accounts</h1>
            <div className="ButtonsGroup">

                <div className="TableButtons">
                    <Button label='Filters' onClick={() => setFilterModalShown(true)} />
                    <Button label='Columns' onClick={() => setColumnModalShown(true)} />
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
                        setFilterParams(values);
                        setFilterModalShown(false);
                    }} />
                </div>
            </Modal>}
            {columnModalShown && <Modal configuration={"LEFT"}
                                        contentConfiguration={"TOP"}
                                        opaqueBackground={false}
                                        fitContent={true}
                                        onClose={() => setColumnModalShown(false)}>
                <div>
                    <ListCheckbox initValues={columns}
                                  items={allColumns}
                                  itemTranslations={columnNameTranslations}
                                  onApply={newColumns => {
                                      setColumns(newColumns);
                                      setColumnModalShown(false);
                                  }}/>
                </div>
            </Modal>}

            {createUserModalShown && <Modal onClose={() => setCreateUserModalShown(false)}>
                <CreateForm type='groups' setCreateUserModalShown={setCreateUserModalShown}/>
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
                          tableContent={getData_mock()}
                          columns={columns}/>
        </div>
    );

    function onRowClick(user) {
        setDetailsModalShown(true);
        setDetailsUser(user);
    }

    async function getData() {
        alert(JSON.stringify(filterParams, null, 2));
        await axios.get(getQueryUrl());
    }

    function getQueryUrl() {
        let baseUrl = "http://52.142.201.18:24020/usermanagement-service/users";
        return baseUrl;
    }
}

function getData_mock() {
    return [
        {
            id: 1,
            firstName: "Tomasz",
            lastName: "Wojna",
            email: "twojna@interia.pl",
            phoneNumber: "506590639"
        },
        {
            id: 2,
            userName: ':))',
            firstName: "Angelika",
            lastName: "Kubicka",
            role: 'STUDENT',
            pesel: 12345678900,
            customAttributes: {
                email: 'ak@wp.pl',
                group: '1B',
                phoneNumber: "234567643",
                middleName: "Noemi",
                subjects: []
            }
        },
        {
            id: 3,
            firstName: "Michał",
            lastName: "Stadryniak",
            email: "some-email@some-website.com",
        }
    ];
}

const groups_mock = [
    "",
    "1A",
    "1B",
    "1C",
    "1Z"
]

export default StudentManagement;
