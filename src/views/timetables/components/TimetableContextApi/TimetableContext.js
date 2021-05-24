import React, {useState, createContext, useEffect} from "react";

const mockedData = [
    [
        null,
        {
            'subject': 'Geography',
            'teacher': 'John Doe',
            'room': 5,
        },
        null,
        {
            'subject': 'english',
            'teacher': "aa",
            'room': 10
        }
    ],
    [
        {
            'subject': 'biology',
            'teacher': 'bb',
            'room': 122
        },

        {
            'subject': 'chemistry',
            'teacher': 'dlugieimie dlugienazwisko',
            'room': 512
        }
    ],

]

export const ClassesContext = createContext();

export const ClassesProvider = ({children}) => {
    const [classes, setClasses] = useState([]);
    useEffect(() => {
        setClasses(mockedData);
    },[])

    return (
        <ClassesContext.Provider value={[classes, setClasses]}>
            {children}
        </ClassesContext.Provider>
    )
}