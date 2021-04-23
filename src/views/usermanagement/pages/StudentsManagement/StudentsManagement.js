import React, {useState} from 'react';
import DisplayTable from "../../components/DisplayTable/DisplayTable";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import axios from "axios";
import "./StudentsManagement.css";
import Modal from "../../components/Modal/Modal";
import CreateForm from "../../components/CreateForm/CreateForm";
import ListCheckbox from "../../../../components/ListCheckbox/ListCheckbox";
import Details from "../../components/Details/Details";

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
    const [filterParams, setFilterParams] = useState({});
    const [filterModalShown, setFilterModalShown] = useState(false);
    const [columnModalShown, setColumnModalShown] = useState(false);
    const [userModalShown, setUserModalShown] = useState(false);
    const [columns, setColumns] = useState(["id", "firstName", "lastName", "group", "pesel"]);
    const [detailsModalShown, setDetailsModalShown] = useState(false);
    const [detailsUserId, setDetailsUserId] = useState(0);

    return (
        <div className="StudentManagement">
            <h1 className="StudentManagement__header">Students</h1>
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
            <div className="CreationButtons">

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
            {userModalShown && <Modal onClose={() => setUserModalShown(false)}>
                <CreateForm />
            </Modal>}

            {detailsModalShown &&
            <Modal
                onClose={() => setDetailsModalShown(false)}

            >
                <Details userId={detailsUserId} />
            </Modal>
            }

            <DisplayTable onRowClick={onRowClick}
                          tableContent={getData_mock()}
                          columns={columns}/>
        </div>
    );

    function onRowClick(userId) {
        setDetailsModalShown(true);
        setDetailsUserId(userId);
        //alert("clicked row " + userId);
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
