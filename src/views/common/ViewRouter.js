import { Switch, Route } from "react-router-dom";
import React from "react";

import HomeworkView from "../homework/HomeworkView";
import PresenceView from "../presence/PresenceView";
import TimetableView from "../timetables/TimetableView";
import GradesViewStudents from "../grades/pages/GradesViewStudents/GradesViewStudents";

import StudentManagement from "../usermanagement/pages/StudentsManagement/StudentsManagement";
import TeacherManagement from "../usermanagement/pages/TeachersManagement/TeachersManagement";
import TimetablesManagement from "../usermanagement/pages/TimetablesManagement/TimetablesManagement";
import GradesViewTeachers from "../grades/pages/GradesPageTeachers/GradesViewTeachers";
import Dashboard from "../dashboard/Dashboard";

const ViewRouter = () => {

    let role = 'TEACHER';
    return (
        <Switch>
            <Route exact path="/">
                <Dashboard role={"Mateusz"}/>
            </Route>
            <Route path="/api/homework-service">
                <HomeworkView />
            </Route>
            <Route path="/api/usermanagement-service/my-account">
                USER ACCOUNT
            </Route>
            <Route path="/api/grades-service">
                {role === 'STUDENT' ? (
                    <GradesViewStudents />
                    ) : (
                    <GradesViewTeachers />
                    )
                }
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

            </Route>
        </Switch>
    );
}

export default ViewRouter;
