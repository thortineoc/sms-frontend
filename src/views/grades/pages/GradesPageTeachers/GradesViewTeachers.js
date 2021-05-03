import React, {useEffect, useState} from "react";
import '../GradesViewCommonStyles/GradesView.css';
import GradesTable from "../../components/GradesTable/GradesTable";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import {Select} from "@material-ui/core";

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

const options = ['1a', '1b', '1c'];

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