import UploadFile from "../../../../components/UploadFIle/UploadFile";
import React, {useState} from "react";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import useAxios from "../../../../utilities/useAxios";
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";
import callBackendPost from "../../../../utilities/CallBackendPost";
import {Grid, Link} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import callBackendDelete from "../../../../utilities/CallBackendDelete";
import Modal from "../../../../components/Modal/Modal";
import Grade from "../../../grades/components/Grade/Grade";
import "./UploadAnswer.css"
import DialogBox from "../../../../components/DialogBox/DialogBox";
import smsConfig from "../../../../utilities/configuration";


const UploadAnswers = (props) => {
    const [selectedFile, setSelectedFile] = useState([]);
    const [error, setError] = useState("");
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const {keycloak, initialized} = useKeycloak();
    const kcToken = keycloak?.token ?? '';
    const [showEdit, setShowEdit] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const updateHomework = () => {
        setError("")
        if (selectedFile.length === 0 && props.homeworkData.answer.files.length === 0) {
            setError("You need to upload a file")
        } else {
            attachFile(props.homeworkData.answer.id)
            setShowEdit(false)
        }
    }

    const deleteExistingFile = (index) => {
        let homeworkToUpdate = {...props.homeworkData}
        let itemsToUpdate = [...homeworkToUpdate.answer.files]
        callBackendDelete(axiosInstance, "/homework-service/files/" + itemsToUpdate[index].id)
            .then(() => {
                itemsToUpdate.splice(index, 1);
                homeworkToUpdate.answer.files = itemsToUpdate
                props.setHomeworkData(homeworkToUpdate)
            })
            .catch(error => console.log(error))
    }

    const deleteAnswer = () => {
        callBackendDelete(axiosInstance, "homework-service/answer/"+props.homeworkData.answer.id)
            .then(()=> {
                    setShowDeleteDialog(false);
                    props.fetchHomeworkData();
                }
            )
            .catch(error => console.log(error))
    }

    const attachFile = (id) => {
        selectedFile.forEach(function (file) {
            console.log(file)
            const headers = {
                'Content-Type': 'multipart/form-data',
                Authorization: initialized ? `Bearer ${kcToken}` : undefined,
            }
            let formData = new FormData();
            formData.append("file", file);
            axios.post(smsConfig.haproxyUrl + "homework-service/files/upload/" + id + "/ANSWER", formData, {
                headers: headers
            })
                .then(response => {
                    console.log("ok")
                    props.fetchHomeworkData()
                })
                .catch(error => setError("Cannot upload file."))
        })
        setSelectedFile([])
    }

    const createAnswer = () => {
        setError("")
        if (selectedFile.length === 0) {
            setError("You need to upload a file")
        } else {
            callBackendPost(axiosInstance, "homework-service/answer/" + props.homeworkData.id)
                .then(response => {
                    attachFile(response.data.id)
                })
                .catch(error => {
                    console.log(error)
                    setError("Cannot create this assignment")
                })
        }
    }

    const getReview = (answer) => {
        if (answer.grade || answer.review) {
            return (
                <>
                    <h3>Review</h3>
                    <Grid container direction="row" alignItems="center" style={{marginTop: "2%", width: "100%"}}>
                        {answer.grade ?
                            <Grid item>
                                <Grade role={"STUDENT"} value={props.homeworkData.answer.grade} type="regular"/>
                            </Grid> : <></>}
                        {answer.review ?
                            <Grid item xs={8}>
                                <div className="Review__data__student">
                                    {answer.review}
                                </div>
                            </Grid>
                            : <></>}
                    </Grid>
                </>
            )
        } else {
            return (
                <>
                    <ButtonWrapper label={"Delete"} onClick={() => setShowDeleteDialog(true)}
                                   style={{marginTop: "2%", marginLeft: "2%"}}/>
                    <p>This assignment is not reviewed yet</p>
                    <Modal isOpen={showDeleteDialog} setIsOpen={setShowDeleteDialog}>
                        <DialogBox
                            deleteFunction={deleteAnswer}
                            setDisplayDialog={setShowDeleteDialog}
                            prompt={"answer"}
                            isModal={true}
                        />
                    </Modal>
                </>
            )
        }
    }


    const getCreateOrDetails = () => {
        return (
            <>
                {props.homeworkData.answer ? (
                    <>
                        <h3>Here is your answer:</h3>
                        <Grid container direction="column" alignItems="left" style={{marginTop: "2%"}}>
                            {props.homeworkData.answer.files.map(file => {
                                return (
                                    <Grid item>
                                        <Grid container direction="row" alignItems="center">
                                            <Grid item>
                                                <AttachFileIcon/>
                                            </Grid>
                                            <Grid item>
                                                <Link href={file.uri} color="inherit">
                                                    {file.filename}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <ButtonWrapper onClick={() => setShowEdit(true)} label={"Edit"} style={{marginTop: "2%"}}/>
                        {getReview(props.homeworkData.answer)}

                    </>
                ) : (
                    <>
                        <h3>Upload your answer</h3>
                        {(error.length > 0 ? <p>{error}</p> : <div/>)}
                        <UploadFile selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
                        <ButtonWrapper id="Submit" label={"submit"} style={{marginTop: "3%"}} onClick={createAnswer}/>
                    </>
                )}
            </>
        )
    }

    const getEditForm = () => {
        return (
            <>
                <h3>Here is your answer:</h3>
                {(error.length > 0 ? <p>{error}</p> : <div/>)}
                <Grid container direction="column" alignItems="left" style={{marginTop: "2%"}}>
                    {props.homeworkData.answer.files.map((file, index) => {
                        return (
                            <Grid item>
                                <Grid container direction="row" alignItems="center">
                                    <Grid item>
                                        <IconButton size={"small"} onClick={() => deleteExistingFile(index)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        {file.filename}
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    })}
                </Grid>
                <UploadFile selectedFile={selectedFile} setSelectedFile={setSelectedFile}
                            style={{marginBottom: "2%"}}/>
                <ButtonWrapper label={"Save"} onClick={() => updateHomework()} style={{marginTop: "3%"}}/>
            </>
        )

    }

    return (
        <div style={{
            borderRadius: "10px",
            marginTop: "10px",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)",
            padding: "30px"
        }}>
            {showEdit ? getEditForm() : getCreateOrDetails()}
        </div>
    )
}
export default UploadAnswers;