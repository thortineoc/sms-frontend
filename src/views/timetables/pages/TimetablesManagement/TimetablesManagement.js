import React, {useEffect, useState} from 'react';
import useAxios from "../../../../utilities/useAxios";
import callBackendGet from "../../../../utilities/CallBackendGet";
import SimpleSelect from "../../../../components/SimpleSelect/SimpleSelect";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import Modal from "../../../../components/Modal/Modal";
import ManageTimeWindow from "../../components/ManageTimeWindow/ManageTimeWindow";
import './TimetablesManagement.css';
import Timetable from "../../components/Timetable/Timetable";
import smsConfig from "../../../../utilities/configuration";

const TimetablesManagement = () => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [allGroups, setAllGroups] = useState([]);
    const [group, setGroup] = useState('');
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchGroups();
    }, [])

    const fetchGroups = () => {
        callBackendGet(axiosInstance, "usermanagement-service/groups", null)
            .then(response => {
                setAllGroups(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        setGroup(allGroups[0])
    }, [allGroups])

    const groupsOptions = allGroups ? allGroups.toString().split(',') : [''];

    return (
        <div className="TimetablesManagement">
            <div className="TimetablesManagement__top-row">
                <SimpleSelect
                    label="Groups"
                    options={groupsOptions}
                    value={group}
                    setValue={setGroup}
                />
                <div className="TimetablesManagement__button-group">
                    <ButtonWrapper label="Get generated" className="TimetablesManagement__button"/>
                    <ButtonWrapper label="Lessons time" onClick={() => setShow(true)} className="TimetablesManagement__button"/>
                </div>
            </div>

            <Timetable />

            {show && (
                <Modal isOpen={show} setIsOpen={setShow}>
                    <ManageTimeWindow
                        setIsOpen={setShow}
                    />
                </Modal>
            )}
        </div>
    )
}

export default TimetablesManagement;