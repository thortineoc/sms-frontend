import { Switch, Route, useParams } from "react-router-dom";
import React from "react";

import HomeworkView from "../homework/pages/HomeworkView/HomeworkView";
import PresenceView from "../presence/PresenceView";
import TimetableView from "../timetables/TimetableView";
import GradesView from "../grades/pages/GradesView/GradesView";

import StudentManagement from "../usermanagement/pages/StudentsManagement/StudentsManagement";
import TeacherManagement from "../usermanagement/pages/TeachersManagement/TeachersManagement";
import TimetablesManagement from "../usermanagement/pages/TimetablesManagement/TimetablesManagement";
import Dashboard from "../dashboard/Dashboard";
import HomeworkDetailsAndResponses
    from "../homework/components/HomeworkDetailsAndResponses/HomeworkDetailsAndResponses";


function HomeworkDetails() {
    let { id } = useParams();
    return (
        <HomeworkDetailsAndResponses id={id}/>
    )
}

const ViewRouter = () => {

    return (
        <Switch>
            <Route exact path="/">
                <Dashboard />
            </Route>
            <Route path="/api/homework-service">
                <HomeworkView />
            </Route>
            <Route path="/api/usermanagement-service/my-account">
                USER ACCOUNT
            </Route>
            <Route path="/api/homework/:id">
                <HomeworkDetails />
            </Route>
            <Route exact path="/api/homework-service">
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
