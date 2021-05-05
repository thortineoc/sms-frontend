import React, {useEffect, useState} from "react";
import '../GradesView/GradesView.css';
import GradesTable from "../../components/GradesTable/GradesTable";
import callBackendGet from "../../../../utilities/CallBackendGet";
import useAxios from "../../../../utilities/useAxios";

let mockData = {
    'maths' : {
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
                id: 1,
                subject: 'maths',
                teacherId: '123',
                studentId: '1234',
                grade: 5,
                description: 'za prace domowa',
                weight: 2
            },
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
                id: 1,
                subject: 'maths',
                teacherId: '123',
                studentId: '1234',
                grade: 1,
                description: 'za prace domowa',
                weight: 4
            },

            {
                id: 2,
                subject: 'maths',
                teacherId: '123',
                studentId: '1234',
                grade: 4.75,
                description: 'za sprawdzian',
                weight: 1
            },
        ],
        'final': {
            id: 2,
            subject: 'maths',
            teacherId: '123',
            studentId: '1234',
            grade: 4.75,
            description: 'za sprawdzian',
            weight: 1
        }
    },

    'geography': {
        'regular': [
            {
                id: 3,
                subject: 'geography',
                teacherId: '1235',
                studentId: '1234',
                grade: 4.5,
                description: 'za prace domowa',
                weight: 2
            }],
        'final': {}
    },

    'biology':  {
        'regular' : [
            {
                id: 4,
                subject: 'biology',
                teacherId: '12352312',
                studentId: '1234',
                grade: 3,
                description: 'za prace domowa',
                weight: 3
            },
            {
                id: 4,
                subject: 'biology',
                teacherId: '12352312',
                studentId: '1234',
                grade: 3.5,
                description: 'za prace domowa',
                weight: 2
            },
        ],
        'final' : {
            id: 4,
            subject: 'biology',
            teacherId: '12352312',
            studentId: '1234',
            grade: 3,
            description: '',
            weight: 1
        }
    },
    'english' : {
        'regular' : [],
        'final': {}
    }
}

const COLUMN_TITLES = [
    'Subjects',
    'Grades',
    'Mean',
    'Final grade'
]


const GradesViewStudents = () => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [data, setData] = useState({});
    const [refresh, setRefresh] = useState(false);

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
            <GradesTable data={data} columns={COLUMN_TITLES} role="STUDENT" setRefresh={setRefresh} />
        </div>
    )
}

export default GradesViewStudents;