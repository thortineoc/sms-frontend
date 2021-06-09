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
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ErrorIcon from '@material-ui/icons/Error';
import ErrorsWindow from "../../components/ErrorsWindow/ErrorsWindow";

const TimetablesManagement = () => {
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [allGroups, setAllGroups] = useState([]);
    const [group, setGroup] = useState('');
    const [showManageTime, setShowManageTime] = useState(false);
    const [showGenerator, setShowGenerator] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

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
                    <SupervisedUserCircleIcon
                        fontSize="large"
                        onClick={() => setShowGenerator(true)}
                        style={{cursor: "pointer", margin: '2%', color: 'gray'}}
                    />
                    <WatchLaterIcon
                        fontSize="large"
                        onClick={() => setShowManageTime(true)}
                        style={{cursor: "pointer", margin: '2%', color: 'gray'}}
                    />
                    <ErrorIcon
                        fontSize="large"
                        onClick={() => setShowErrors(true)}
                        style={{cursor: "pointer", margin: '2%', color: 'gray'}}
                    />
                    <ButtonWrapper label="Generate"  className="TimetablesManagement__button"/>
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
                        group={group}
                    />
                </Modal>
            )}
            {showErrors && (
                <Modal isOpen={showErrors} setIsOpen={setShowErrors}>
                    <ErrorsWindow
                        setIsOpen={setShowErrors}
                    />
                </Modal>
            )}
        </div>
    )
}

export default TimetablesManagement;