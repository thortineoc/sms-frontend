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
import TimetableGeneration from "../../components/TimetableGeneration/TimetableGeneration";

const TimetablesManagement = () => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [allGroups, setAllGroups] = useState([]);
    const [group, setGroup] = useState('');
    const [showManageTime, setShowManageTime] = useState(false);
    const [showGenerator, setShowGenerator] = useState(false);

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
                    <ButtonWrapper label="Get generated" onClick={() => setShowGenerator(true)} className="TimetablesManagement__button"/>
                    <ButtonWrapper label="Lessons time" onClick={() => setShowManageTime(true)} className="TimetablesManagement__button"/>
                </div>
            </div>

            <Timetable type="admin" />

            {showManageTime && (
                <Modal isOpen={showManageTime} setIsOpen={setShowManageTime}>
                    <ManageTimeWindow
                        setIsOpen={setShowManageTime}
                    />
                </Modal>
            )}
            {showGenerator && (
                <Modal isOpen={showGenerator} setIsOpen={setShowGenerator}>
                    <TimetableGeneration
                        setIsOpen={setShowGenerator}
                    />
                </Modal>
            )}
        </div>
    )
}

export default TimetablesManagement;