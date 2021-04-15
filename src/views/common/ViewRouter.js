import { Switch, Route } from "react-router-dom";
import React from "react";

import HomeworkView from "../homework/HomeworkView";
import PresenceView from "../presence/PresenceView";
import TimetableView from "../timetables/TimetableView";
import GradesView from "../grades/GradesView";

import UserManagementCreate from "../usermanagement/UserManagementCreate/UserManagementCreate";
import UserManagementDisplay from "../usermanagement/UserManagementDisplay/UserManagementDisplay";
import UserManagementTimetables from "../usermanagement/UserManagmentTimetables/UserManagementTimetables";

const ViewRouter = () => {
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
            <Route path="/api/usermanagement-service/account-creator">
                <UserManagementCreate />
            </Route>
            <Route path="/api/usermanagement-service/all-users">
                <UserManagementDisplay />
            </Route>
            <Route path="/api/usermanagement-service/timetables-creator">
                <UserManagementTimetables />
            </Route>
        </Switch>
    );
}

export default ViewRouter;
