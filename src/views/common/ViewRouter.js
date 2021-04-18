import { Switch, Route } from "react-router-dom";
import React from "react";

import HomeworkView from "../homework/HomeworkView";
import PresenceView from "../presence/PresenceView";
import TimetableView from "../timetables/TimetableView";
import GradesView from "../grades/GradesView";

import CreateStudentsForm from "../usermanagement/components/CreateStudentsForm/CreateStudentsForm";
import StudentManagement from "../usermanagement/pages/StudentsManagement/StudentsManagement";
import TeacherManagement from "../usermanagement/pages/TeachersManagement/TeachersManagement";
import TimetablesManagement from "../usermanagement/pages/TimetablesManagement/TimetablesManagement";
import CreateForm from "../usermanagement/components/CreateForm/CreateForm";
import EditForm from "../usermanagement/components/EditForm/EditForm";

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
            <Route path="/api/usermanagement-service/students">
                <StudentManagement />
            </Route>
            <Route path="/api/usermanagement-service/teachers">
                <TeacherManagement />
            </Route>
            <Route path="/api/usermanagement-service/timetables">
                <TimetablesManagement />
            </Route>
            <Route path="/api/usermanagement-service/temp">
                <EditForm />
            </Route>
        </Switch>
    );
}

export default ViewRouter;
