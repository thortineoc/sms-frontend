import { Switch, Route, useParams } from "react-router-dom";
import React from "react";

import HomeworkListView from "../homework/pages/HomeworkListView/HomeworkListView";
import PresenceView from "../presence/PresenceView";
import TimetableView from "../timetables/pages/TimetableView/TimetableView";
import GradesView from "../grades/pages/GradesView/GradesView";

import StudentManagement from "../usermanagement/pages/StudentsManagement/StudentsManagement";
import TeacherManagement from "../usermanagement/pages/TeachersManagement/TeachersManagement";
import Dashboard from "../dashboard/Dashboard";
import HomeworkDisplayView from "../homework/pages/HomeworkDisplayView/HomeworkDisplayView";
import TimetablesManagement from "../timetables/pages/TimetablesManagement/TimetablesManagement";
import UserProfile from "../profile/profile";

function HomeworkDetails() {
    let { id } = useParams();
    return (
        <HomeworkDisplayView id={id} />
    )
}

const ViewRouter = () => {

    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <Route path="/api/homework-service">
                <HomeworkListView />
            </Route>
            <Route path="/api/usermanagement-service/my-account">
                <UserProfile/>
            </Route>
            <Route path="/api/homework/:id">
                <HomeworkDetails />
            </Route>
            <Route exact path="/api/homework-service">
                <HomeworkListView />
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
