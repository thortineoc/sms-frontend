import React, {useEffect, useState} from 'react';
import callBackendGet from "../../../../utilities/CallBackendGet";
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";

const ErrorsWindow = () => {
    const [data, setData] = useState([]);
    const axiosInstance = useAxios(smsConfig.haproxyUrl);

    const fetchData = () =>{
        callBackendGet(axiosInstance, "/timetable-service/timetables/conflicts", null)
            .then(response => {
                setData(response.data)
            })
            .catch(error => console.log(error)
            )
    }

    useEffect(() => {
        fetchData()
    }, []);


    return (
        <div>
            <h3>All conflicts</h3>
            {data.length>0 ? (data.map((value, index) => {
                return (
                    <div id="homework_subject" className="EditDeleteLessonConflict__data" style={{marginBottom: "1%"}}>
                        {index+1 + ". lesson: " + (parseInt(value.lesson, 10)+1) + ", group: " + value.group + ", subject: " + value.subject}
                    </div>
                )
            })) : (<p>There are no conflicts</p>)}
        </div>
    );
};

export default ErrorsWindow;
