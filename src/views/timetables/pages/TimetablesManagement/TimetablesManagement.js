import React, {useEffect, useState} from 'react';
import useAxios from "../../../../utilities/useAxios";
import callBackendGet from "../../../../utilities/CallBackendGet";
import SimpleSelect from "../../../../components/SimpleSelect/SimpleSelect";
import Modal from "../../../../components/Modal/Modal";
import ManageTimeWindow from "../../components/ManageTimeWindow/ManageTimeWindow";
import './TimetablesManagement.css';
import Timetable from "../../components/Timetable/Timetable";
import smsConfig from "../../../../utilities/configuration";
import TimetableGeneration from "../../components/TimetableGeneration/TimetableGeneration";
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ErrorIcon from '@material-ui/icons/Error';
import ImportExportRoundedIcon from '@material-ui/icons/ImportExportRounded';
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
                    <ImportExportRoundedIcon
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
                </div>
            </div>

            <Timetable type="ADMIN" group={group} />

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