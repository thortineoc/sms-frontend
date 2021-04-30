import React, {useCallback, useState} from 'react';
import "./StudentsManagement.css";
import UserManagement from "../../layouts/UsersManagement/UserManagement";

const StudentManagement = () => {
    return (
        <UserManagement role="STUDENT" />
    )
}

export default StudentManagement;
