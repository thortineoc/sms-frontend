import {
    Link
} from "react-router-dom";
import React from "react";

const LeftMenu = (props) => {

    return <ul>
            <li>
                <Link to="/api/homework-service">Homework assignments</Link>
            </li>
            <li>
                <Link to="/api/grades-service">Grades</Link>
            </li>
            <li>
                <Link to="/api/presence-service">Presences</Link>
            </li>
            <li>
                <Link to="/api/timetable-service">Timetables</Link>
            </li>
            <li>
                <Link to="/api/usermanagement-service">User management</Link>
            </li>
        </ul>;
}

export default LeftMenu;