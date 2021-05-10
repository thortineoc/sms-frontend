import React, {useEffect, useState} from "react";
import '../GradesView/GradesView.css';
import GradesTable from "../../components/GradesTable/GradesTable";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import {InputLabel, MenuItem, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import SimpleSelect from "../../../../components/SimpleSelect/SimpleSelect";
import getKeycloakSubjects from "../../../../utilities/GetSubjects";
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/axios/useAxios";
import callBackendGet from "../../../../utilities/axios/CallBackendGet";
import {ref} from "yup";

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
        if(group && subject) {
            fetchData();
        }
    }, [])

    useEffect(() => {
        if(group && subject) {
            fetchData();
        }
        setRefresh(false);
    }, [refresh])

    useEffect(() => {
        if(group && subject) {
            fetchData();
        }
    }, [group, subject])

    useEffect(() => {
        setGroup(allGroups[0])
    }, [allGroups])

    useEffect(() => {
        allSubjects && setSubject(allSubjects.toString().split(',')[0])
    }, [allSubjects])

    const subjectsOptions = allSubjects ? allSubjects.toString().split(',') : [''];
    const groupsOptions = allGroups ? allGroups.toString().split(',') : [''];

    const handleRequireRefresh = () => {
        setRefresh(true);
    }

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
            <GradesTable data={data} columns={COLUMN_TITLES} role="TEACHER" subject={subject} setRefresh={handleRequireRefresh} />
        </div>
    )
}

export default GradesViewTeachers;