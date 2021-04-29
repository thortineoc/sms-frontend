import React, {useCallback, useState} from 'react';
import "./StudentsManagement.css";
import UserManagement from "../../layouts/UsersManagement/UserManagement";

const StudentManagement = () => {
    return (
        <UserManagement type={"STUDENT"}/>
    )
}

export default StudentManagement;
