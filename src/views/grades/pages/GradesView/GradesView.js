import React, {useEffect, useState} from "react";
import './GradesView.css';
import GradesTable from "../../components/GradesTable/GradesTable";
import GradesTableRow from "../../components/GradesTableRow/GradesTableRow";
import DisplayTable from "../../../usermanagement/components/DisplayTable/DisplayTable";

let mockData = {
    'maths' : [
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

    'geography': [
        {
            id: 3,
            subject: 'geography',
            teacherId: '1235',
            studentId: '1234',
            grade: 4.5,
            description: 'za prace domowa',
            weight: 2
        }
    ],

    'biology': [
        {
            id: 4,
            subject: 'biology',
            teacherId: '12352312',
            studentId: '1234',
            grade: 3,
            description: 'za prace domowa',
            weight: 4
        }
    ],

    'english': [
    ]
}

const COLUMN_TITLES = [
    'Subjects',
    'Grades',
    'Mean',
    'Final grade'
]


const GradesView = (props) => {
    const [data, setData] = useState({});

    useEffect(() => {
        setData(mockData);
    }, [])


    return (
        <div className="GradesView">
            <GradesTable data={data} columns={COLUMN_TITLES} />
        </div>
    )
}

export default GradesView;