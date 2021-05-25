import React, {useEffect, useState} from 'react';
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import callBackendGet from "../../../../utilities/CallBackendGet";

const ManageTimeWindow = ({setIsOpen}) => {
    const [code, setCode] = useState(null);
    const axiosInstance = useAxios(smsConfig.haproxyUrl);

    const fetchData = () => {
        callBackendGet(axiosInstance, "/timetable-service/config", null)
            .then(response => {
                setCode(response.status);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <h3>Set breaks length</h3>
            <p>{code}</p>
        </div>
    );
};

export default ManageTimeWindow;