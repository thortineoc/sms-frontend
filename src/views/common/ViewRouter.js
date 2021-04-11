import UserManagementView from "../usermanagement/UserManagementView";
import HomeworkView from "../homework/HomeworkView";
import PresenceView from "../presence/PresenceView";
import TimetableView from "../timetables/TimetableView";
import GradesView from "../grades/GradesView";

import {
    Switch,
    Route,
} from "react-router-dom";
import React from "react";

const ViewRouter = (props) => {
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
            <Route path="/api/usermanagement-service">
                <UserManagementView />
            </Route>
            <Route path="/api/presence-service">
                <PresenceView />
            </Route>
        </Switch>
    );
}

export default ViewRouter;
