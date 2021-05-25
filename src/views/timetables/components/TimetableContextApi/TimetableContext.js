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
            'subject': 'English',
            'teacher': "aa",
        }
    ],
    [
        {
            'subject': 'Biology',
            'teacher': 'bb',
            'room': 122
        },

        {
            'subject': 'Chemistry',
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