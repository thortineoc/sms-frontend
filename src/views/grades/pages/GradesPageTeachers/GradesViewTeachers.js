import React, {useEffect, useState} from "react";
import '../GradesViewCommonStyles/GradesView.css';
import GradesTable from "../../components/GradesTable/GradesTable";

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
                        id: 1,
                        subject: 'maths',
                        teacherId: '123',
                        studentId: '1234',
                        grade: 2.75,
                        description: 'za prace domowa',
                        weight: 3
                    },
                    {
                        id: 1,
                        subject: 'maths',
                        teacherId: '123',
                        studentId: '1234',
                        grade: 2,
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
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(mockData);
    }, [])


    return (
        <div className="GradesView">
            <GradesTable data={data} columns={COLUMN_TITLES} role="TEACHER"/>
        </div>
    )
}

export default GradesViewTeachers;