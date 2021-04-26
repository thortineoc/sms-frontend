import { Switch, Route } from "react-router-dom";
import React from "react";

import HomeworkView from "../homework/HomeworkView";
import PresenceView from "../presence/PresenceView";
import TimetableView from "../timetables/TimetableView";
import GradesView from "../grades/GradesView";

import StudentManagement from "../usermanagement/pages/StudentsManagement/StudentsManagement";
import TeacherManagement from "../usermanagement/pages/TeachersManagement/TeachersManagement";
import TimetablesManagement from "../usermanagement/pages/TimetablesManagement/TimetablesManagement";
import {useKeycloak} from "@react-keycloak/web";

const ViewRouter = () => {

    const {keycloak, initialized} = useKeycloak();
    if (!initialized) {
        return <div>Loading...</div>
    }
    if (!!initialized && !keycloak.authenticated) {
        keycloak.login();
    }
    return (
        <Switch>
            <Route path="/api/homework-service">
                <HomeworkView />
            </Route>
            <Route path="/api/grades-service">
                <GradesView />
            </Route>
            <Route path="/api/timetable-service">
                <TimetableView />
            </Route>
            <Route path="/api/presence-service">
                <PresenceView />
            </Route>
            <Route path="/api/usermanagement-service/students">
                <StudentManagement />
            </Route>
            <Route path="/api/usermanagement-service/teachers">
                <TeacherManagement />
            </Route>
            <Route path="/api/usermanagement-service/timetables">
                <TimetablesManagement />
            </Route>
        </Switch>
    );
}

export default ViewRouter;
