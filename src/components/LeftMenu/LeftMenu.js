import { Link } from "react-router-dom";
import React from "react";
import './LeftMenu.css'

const LeftMenu = () => {
    let role = 'admin';

    return (
        <div className="LeftMenu">
            {role === 'admin' ? (
                <nav>
                    <Link to="/api/usermanagement-service/account-creator">Create accounts</Link>
                    <Link to="/api/usermanagement-service/all-users">Display and manage accounts</Link>
                    <Link to="/api/usermanagement-service/timetables-creator">Manage timetables</Link>
                </nav>
            ) : (
                <nav>
                    <Link to="/api/timetable-service">Timetables</Link>
                    <Link to="/api/homework-service">Homework</Link>
                    <Link to="/api/grades-service">Grades</Link>
                    <Link to="/api/presence-service">Presences</Link>
                </nav>
            )}
        </div>
    );
}

export default LeftMenu;