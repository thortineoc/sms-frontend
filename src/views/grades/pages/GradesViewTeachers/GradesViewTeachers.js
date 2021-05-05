import React, {useEffect, useState} from "react";
import '../GradesView/GradesView.css';
import GradesTable from "../../components/GradesTable/GradesTable";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import SimpleSelect from "../../../../components/SimpleSelect/SimpleSelect";
import getKeycloakSubjects from "../../../../utilities/GetSubjects";
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/useAxios";
import callBackendGet from "../../../../utilities/CallBackendGet";
import {ref} from "yup";

let mockData = [{
    'student': {
        firstName: 'John',
        lastName: 'Doe'
    },
    'grades':
     {
        'regular': [
            {
                id: 1,
                subject: 'maths',
                teacherId: '123',
                studentId: '1234',
                grade: 5,
                description: 'za prace domowa',
                weight: 2
            },
            {
                id: 2,
                subject: 'maths',
                teacherId: '123',
                studentId: '1234',
                grade: 5,
                description: 'za prace domowa',
                weight: 2
            },
            {
                id: 3,
                subject: 'maths',
                teacherId: '123',
                studentId: '1234',
                grade: 5,
                description: 'za prace domowa',
                weight: 2
            },
            {
                id: 4,
                subject: 'maths',
                teacherId: '123',
                studentId: '1234',
                grade: 1,
                description: 'za prace domowa',
                weight: 4
            },

            {
                id: 5,
                subject: 'maths',
                teacherId: '123',
                studentId: '1234',
                grade: 4.75,
                description: 'za sprawdzian',
                weight: 1
            },
        ],
        'final': {
            id: 6,
            subject: 'maths',
            teacherId: '123',
            studentId: '1234',
            grade: 4.75,
            description: '',
            weight: 1
        }
    },
},
    {
        'student': {
            firstName: 'Julia',
            lastName: 'Doeeoeoe'
        },
        'grades':
            {
                'regular': [
                    {
                        id: 7,
                        subject: 'maths',
                        teacherId: '123',
                        studentId: '1234',
                        grade: 2.75,
                        description: 'za prace domowa',
                        weight: 3
                    },
                    {
                        id: 8,
                        subject: 'maths',
                        teacherId: '123',
                        studentId: '1234',
                        grade: 2,
                        description: 'za prace domowa',
                        weight: 4
                    },
                    {
                        id: 9,
                        subject: 'maths',
                        teacherId: '123',
                        studentId: '1234',
                        grade: 4.75,
                        description: 'za sprawdzian',
                        weight: 1
                    },
                ],
                'final': {}
            },
    }

]

const COLUMN_TITLES = [
    'Students',
    'Grades',
    'Mean',
    'Final grade'
]

const GradesViewTeachers = () => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [data, setData] = useState([]);
    const [subject, setSubject] = useState('');
    const [group, setGroup] = useState('');
    const [allSubjects, setAllSubjects] = useState('');
    const [allGroups, setAllGroups] = useState('');
    const [refresh, setRefresh] = useState(false);
    const {keycloak, initialized} = useKeycloak();
    useEffect(() => {
         if (!!initialized) {
           getKeycloakSubjects(keycloak, setAllSubjects);
       }
    }, [keycloak, initialized])

    const fetchGroups = () => {
        callBackendGet(axiosInstance, "usermanagement-service/groups", null)
            .then(response => {
                setAllGroups(response.data);
            })
            .catch(error => console.log(error))
    }

    const fetchData = () => {
        const url = `grades-service/grades/group/${group}/subject/${subject}`;
        callBackendGet(axiosInstance, url, null)
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchGroups();
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
        setRefresh(false);
    }, [refresh])

    useEffect(() => {
        fetchData();
    }, [group, subject])

    const subjectsOptions = allSubjects ? allSubjects.toString().split(',') : ['opcja', 'opcja2'];
    const groupsOptions = allGroups ? allGroups.toString().split(',') : ['opcja3', 'opcja4'];

    return (
        <div className="GradesView">
            <div className="GradesView__selects">
                <SimpleSelect label="Subjects"
                              options={subjectsOptions}
                              value={subject}
                              setValue={setSubject}
                />
                <SimpleSelect label="Groups"
                              options={groupsOptions}
                              value={group}
                              setValue={setGroup}
                />
            </div>
            <GradesTable data={data} columns={COLUMN_TITLES} role="TEACHER" subject={subject} setRefresh={setRefresh} />
        </div>
    )
}

export default GradesViewTeachers;