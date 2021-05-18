import UploadFile from "../../../../components/UploadFIle/UploadFile";
import React, {useState} from "react";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import useAxios from "../../../../utilities/useAxios";
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";
import callBackendPut from "../../../../utilities/CallBackendPut";
import callBackendPost from "../../../../utilities/CallBackendPost";
import {Form} from "formik";
import {Grid, Link} from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import callBackendDelete from "../../../../utilities/CallBackendDelete";


const UploadAnswers = (props) => {
    const [selectedFile, setSelectedFile] = useState([]);
    const [error, setError] = useState("");
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const {keycloak, initialized} = useKeycloak();
    const kcToken = keycloak?.token ?? '';
    const [showEdit, setShowEdit] = useState(false)

    const updateHomework = () => {
        setError("")
        if(selectedFile.length===0 && props.homeworkData.answer.files.length===0){
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
            .then(()=>{
                itemsToUpdate.splice(index, 1);
                homeworkToUpdate.answer.files=itemsToUpdate
                props.setHomeworkData(homeworkToUpdate)
            })
            .catch(error=>console.log(error))
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
            axios.post("http://52.142.201.18:24020/homework-service/files/upload/" + id + "/ANSWER", formData, {
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
                    </>
                ) : (
                    <>
                        <h3>Upload tour answer</h3>
                        {(error.length > 0 ? <p>{error}</p> : <div/>)}
                        <UploadFile selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
                        <ButtonWrapper label={"submit"} style={{marginTop: "3%"}} onClick={createAnswer}/>
                    </>
                )}

                {props.homeworkData.answer ? (props.homeworkData.answer.review ? <p>This assignment is reviewed</p> :
                    <p>This assignment is not reviewed yet</p>) : (<p>This assignment is not reviewed yet</p>)}

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
                <UploadFile selectedFile={selectedFile} setSelectedFile={setSelectedFile} style={{marginBottom: "2%"}}/>
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