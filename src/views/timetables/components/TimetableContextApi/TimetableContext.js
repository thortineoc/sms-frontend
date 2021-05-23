import React, {useState, createContext, useEffect} from "react";

const mockedData = [
    [
        null,
        {
            'subject': 'geography',
            'lesson': 2,
            'room': 5
        },
        null,
        {
            'subject': 'english',
            'lesson': 4,
            'room': 10
        }
    ],
    [
        {
            'subject': 'biology',
            'lesson': 3,
            'room': 122
        },

        {
            'subject': 'chemistry',
            'lesson': 5,
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