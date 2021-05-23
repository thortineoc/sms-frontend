import React, {useState, createContext, useEffect} from "react";

const mockedData = [
    [
        {
            'subject': 'geography',
            'lesson': 2
        },

        {
            'subject': 'english',
            'lesson': 4
        }
    ],
    [
        {
            'subject': 'biology',
            'lesson': 3
        },

        {
            'subject': 'chemistry',
            'lesson': 5
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
        <ClassesContext.Provider value={classes}>
            {children}
        </ClassesContext.Provider>
    )
}