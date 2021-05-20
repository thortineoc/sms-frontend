import React from 'react';
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import "./DeleteDialog.css"
import useAxios from "../../../../utilities/useAxios";
import callBackendDelete from "../../../../utilities/CallBackendDelete";
import { useHistory } from "react-router-dom";

const DeleteDialog = ({id, setDisplayDialog, type, fetchData}) => {
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    let history = useHistory();

    const deleteAnswer = () => {
        callBackendDelete(axiosInstance, "homework-service/answer/"+id)
            .then(()=> {
                    setDisplayDialog(false);
                    fetchData();
                }
            )
            .catch(error => console.log(error))
    }

    const deleteAssignment = () => {
        callBackendDelete(axiosInstance, "homework-service/homework/"+id)
            .then(()=> {
                    setDisplayDialog(false);
                    history.push('/api/homework-service')
                }
            )
            .catch(error => console.log(error))
    }

    const handleAccept = () => {
        if(type==="answer"){
            deleteAnswer();
        } else {
            deleteAssignment();
        }
    }

    const handleCancel = () => {
        setDisplayDialog(false);
    }

    return (
        <div className="DeleteDialogBox">
            <strong>Are you sure that you want to delete this {type}?</strong>
            <div className="DeleteDialogBox__options">
                <ButtonWrapper label='Yes' onClick={handleAccept}/>
                <ButtonWrapper label='No' onClick={handleCancel}/>
            </div>
        </div>
    );
};

export default DeleteDialog;
