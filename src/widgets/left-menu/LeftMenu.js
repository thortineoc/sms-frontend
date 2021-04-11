import {
    Link
} from "react-router-dom";
import React from "react";

const LeftMenu = (props) => {

    return <ul>
            <li>
                <Link to="/homework-service">Homework assignments</Link>
            </li>
            <li>
                <Link to="/grades-service">Grades</Link>
            </li>
            <li>
                <Link to="/presence-service">Presences</Link>
            </li>
            <li>
                <Link to="/timetable-service">Timetables</Link>
            </li>
            <li>
                <Link to="/usermanagement-service">User management</Link>
            </li>
        </ul>;
}

export default LeftMenu;