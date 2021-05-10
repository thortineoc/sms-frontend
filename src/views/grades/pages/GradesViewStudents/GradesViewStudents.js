import React, {useEffect, useState} from "react";
import '../GradesView/GradesView.css';
import GradesTable from "../../components/GradesTable/GradesTable";
import callBackendGet from "../../../../utilities/CallBackendGet";
import useAxios from "../../../../utilities/useAxios";

const COLUMN_TITLES = [
    'Subjects',
    'Grades',
    'Mean',
    'Final grade'
]

const GradesViewStudents = () => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [data, setData] = useState({});

    const fetchData = () => {
        callBackendGet(axiosInstance, 'grades-service/grades/student', null)
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <div className="GradesView">
            <GradesTable data={data} columns={COLUMN_TITLES} role="STUDENT" />
        </div>
    )
}

export default GradesViewStudents;