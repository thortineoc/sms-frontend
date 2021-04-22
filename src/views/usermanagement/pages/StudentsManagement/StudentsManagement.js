import React, {useState} from 'react';
import DisplayTable from "../../components/DisplayTable/DisplayTable";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import axios from "axios";
import "./StudentsManagement.css";
import Modal from "../../components/Modal/Modal";
import CreateForm from "../../components/CreateForm/CreateForm";
import ListCheckbox from "../../../../components/ListCheckbox/ListCheckbox";

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

const StudentManagement = () => {
    let [filterParams, setFilterParams] = useState({});
    let [filterModalShown, setFilterModalShown] = useState(false);
    let [columnModalShown, setColumnModalShown] = useState(false);
    let [userModalShown, setUserModalShown] = useState(false);
    let [columns, setColumns] = useState(["id", "firstName", "lastName", "group", "pesel"]);

    return (
        <div className="StudentManagement">
            <div className="ActionButtons">
                <div className="ActionButtons_genericButton">
                    <button onClick={() => setFilterModalShown(true)}>Filters</button>
                </div>
                <div className="ActionButtons_genericButton">
                    <button onClick={() => setColumnModalShown(true)}>Columns</button>
                </div>
                <div className="ActionButtons_genericButton">
                    <button onClick={() => setUserModalShown(true)}>Create student</button>
                </div>
            </div>
            {filterModalShown && <Modal configuration={"RIGHT"}
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
            {columnModalShown && <Modal configuration={"RIGHT"}
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
            {userModalShown && <Modal contentConfiguration={"TRANSPARENT"}
                                      onClose={() => setUserModalShown(false)}>
                <CreateForm />
            </Modal>}
            <DisplayTable onRowClick={onRowClick}
                          tableContent={getData_mock()}
                          columns={columns}/>
        </div>
    );

    function onRowClick(userId) {
        alert("clicked row " + userId);
    }

    async function getData() {
        alert(JSON.stringify(filterParams, null, 2));
        await axios.get(getQueryUrl());
    }

    function getQueryUrl() {
        let baseUrl = "http://52.142.201.18:24020/usermanagement-service/users";
        return baseUrl;
    }
};

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
            firstName: "Angelika",
            lastName: "Kubicka",
            phoneNumber: "234567643"
        },
        {
            id: 3,
            firstName: "Michał",
            lastName: "Stadryniak",
            email: "some-email@some-website.com",
        }
    ];
}

export default StudentManagement;
