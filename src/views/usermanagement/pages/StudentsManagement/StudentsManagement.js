import React from 'react';
import DisplayTable from "../../components/DisplayTable/DisplayTable";
import ActionButton from "../../../../components/ActionButton/ActionButton";
import axios from "axios";

const StudentManagement = () => {
    return (
        <div className="StudentManagement">
            <DisplayTable searchParams={{}}
                          tableContent={getData_mock()}
                          columns={["id", "phoneNumber", "firstName", "lastName", "email"]}/>
        </div>
    );
};

async function getData() {
    await axios.get("http://52.142.201.18:24020/usermanagement-service/users");
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
            email: "idk@idk.com",
            phoneNumber: "234567643"
        },
        {
            id: 3,
            firstName: "Michał",
            lastName: "Stadryniak",
            email: "some-email@some-website.com",
            phoneNumber: "995488333"
        }
    ];
}

export default StudentManagement;
