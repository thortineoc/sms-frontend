import React, {useEffect, useState} from "react";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import Modal from "../../../../components/Modal/Modal";
import AnswersTable from "../AnswersTable/AnswersTable";
import "./HomeworkDetailsAndResponses.css"
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import getKeycloakRoles from "../../../../utilities/GetRoles";
import {useKeycloak} from "@react-keycloak/web";
import {Form, Formik} from "formik";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import SelectFieldWrapper from "../../../../components/SelectFieldWrapper/SelectFieldWrapper";
import DatepickerWrapper from "../../../../components/DatepickerWrapper/DatepickerWrapper";
import callBackendGet from "../../../../utilities/CallBackendGet";
import useAxios from "../../../../utilities/useAxios";
import getKeycloakSubjects from "../../../../utilities/GetSubjects";
import {Grid, IconButton, Link} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import UploadFile from "../../../../components/UploadFIle/UploadFile";
import callBackendPut from "../../../../utilities/CallBackendPut";
import axios from "axios";
import UploadAnswer from "../UploadAnswer/UploadAnswer";


const homeworkEmpty = {
    title: "",
    group: "",
    subject: "",
    deadline: "",
    description: "",
    toEvaluate: true,
    answers: [],
    files: []
}

const HomeworkDetailsAndResponses = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState("");
    const[error, setError] = useState("");
    const [groups, setGroups] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [homeworkData, setHomeworkData] = useState(homeworkEmpty);
    const [selectedFile, setSelectedFile] = useState([]);
    const kcToken = keycloak?.token ?? '';

    useEffect(() => {
        if (!!initialized) {
            getKeycloakSubjects(keycloak, setAllSubjects);
            fetchGroups();
            fetchHomeworkData();
        }
    }, [keycloak, initialized])

    const fetchGroups = () => {
        callBackendGet(axiosInstance, "usermanagement-service/groups", null)
            .then(response => {
                console.log(response.data);
                setGroups(response.data);
            })
            .catch(error => console.log(error))
    }

    const fetchHomeworkData = () => {
        callBackendGet(axiosInstance, "homework-service/homework/" + props.id, null)
            .then(response => {
                if(response.status===200){
                    console.log(response.data);
                    setHomeworkData(response.data);
                }
            })
            .catch(error => console.log(error))
    }


    const handleClick = () => {
        setShowEdit(true)
    }

    const deleteExistingFile = (index) => {
        let homeworkToUpdate = {...homeworkData}
        let itemsToUpdate = [...homeworkToUpdate.files]
        console.log("should delete file with id: " + itemsToUpdate[index].id)

        itemsToUpdate.splice(index, 1);
        homeworkToUpdate.files=itemsToUpdate
        setHomeworkData(homeworkToUpdate)
    }

    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)
        }
    }, [keycloak, initialized])

    const attachFile = (id) => {
        selectedFile.forEach(function(file){
            console.log(file)
            const headers = {
                'Content-Type': 'multipart/form-data',
                Authorization: initialized ? `Bearer ${kcToken}` : undefined,
            }
            let formData = new FormData();
            formData.append("file", file);
            axios.post("http://52.142.201.18:24020/homework-service/files/upload/" + id + "/HOMEWORK", formData, {
                headers: headers})
                .then(response => {
                    if(response.status>204) {
                        setError("Cannot upload file.")
                    } else {
                        props.setIsOpen(false)
                    }
                })
                .catch(error => setError("Cannot upload file."))
        })
        setSelectedFile([])
    }

    const updateHomework = (values, setSubmitting, setValues) => {
        callBackendPut(axiosInstance, "homework-service/homework", values)
            .then(response => {
                attachFile(response.data.id)
                setShowEdit(false)
                fetchHomeworkData()
            })
            .catch(error=>{
                console.log(error)
                setError("Cannot create this assignment")
                setSubmitting(false)
                setValues(values)
            })

    }

    const detailsPage = () =>{
        return (
            <div className="HomeworkDetailsAndResponses">
                {role==="TEACHER" &&
                <ButtonWrapper label={"Delete"} onClick={() => setShowDeleteDialog(true)} className="HomeworkDetails__button"/>}
                <h3>Homework details</h3>

                <div className="DetailsHomework__field">
                    <div className="DetailsHomework__label">Title</div>
                    <div className="DetailsHomework__data" onClick={role==="TEACHER" ? handleClick : undefined } style={role==="TEACHER" ? {cursor: "pointer"} : undefined}>
                        {homeworkData.title}
                    </div>
                </div>

                <div className="DetailsHomework__field">
                    <div className="DetailsHomework__label">Description</div>
                    <div className="DetailsHomework__data" onClick={role==="TEACHER" ? handleClick : undefined } style={role==="TEACHER" ? {cursor: "pointer"} : undefined}>
                        {homeworkData.description}
                    </div>
                </div>

                <div className="DetailsHomework__field">
                    <div className="DetailsHomework__label">Group</div>
                    <div className="DetailsHomework__data_small" onClick={role==="TEACHER" ? handleClick : undefined } style={role==="TEACHER" ? {cursor: "pointer"} : undefined}>
                        {homeworkData.group}
                    </div>
                </div>

                <div className="DetailsHomework__field">
                    <div className="DetailsHomework__label">Subject</div>
                    <div className="DetailsHomework__data_small" onClick={role==="TEACHER" ? handleClick : undefined } style={role==="TEACHER" ? {cursor: "pointer"} : undefined}>
                        {homeworkData.subject}
                    </div>
                </div>

                <div className="DetailsHomework__field">
                    <div className="DetailsHomework__label">Deadline</div>
                    <div className="DetailsHomework__data_small" onClick={role==="TEACHER" ? handleClick : undefined } style={role==="TEACHER" ? {cursor: "pointer"} : undefined}>
                        {homeworkData.deadline  ? (homeworkData.deadline.split("T")[0]) : ""}
                    </div>
                </div>

                <Grid container direction="column" alignItems="left" style={{marginTop: "2%"}}>
                    {homeworkData.files.map(file=>{
                        return(
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
                        )})}
                </Grid>


            </div>
        )
    }

    const editPage = () => {
        return (
            <div className="HomeworkDetailsAndResponses">
            <Formik
                initialValues={homeworkData}
                //validationSchema={validationSchema}
                validateOnChange={false}
                onSubmit={(values, setSubmitting, setValues) => updateHomework(values, setSubmitting, setValues)}
            >
                {
                    formik => {
                        return (
                            <Form>
                                <ButtonWrapper type="submit" label="Save" disabled={formik.isSubmitting} className="HomeworkDetails__button"/>
                                <h3>Modify assignment</h3>
                                {(error.length>0 ? <p>{error}</p> : <div/>)}
                                <div>
                                    {formik.errors && formik.errors.submit &&
                                    <div className="error">{formik.errors.submit}</div>}

                                    <TextFieldWrapper
                                        label="Title"
                                        name="title"
                                        type="text"
                                        style={{marginBottom: "2%", width: "70%"}}
                                    />

                                    <TextFieldWrapper
                                        label="Description"
                                        name="description"
                                        type="text"
                                        multiline
                                        rowsMax={6}
                                        style={{marginBottom: "2%", width: "70%"}}
                                    />

                                    <SelectFieldWrapper
                                        label="Group"
                                        name="group"
                                        options={groups}
                                        style={{marginBottom: "2%", width: "30%"}}
                                    />

                                    <SelectFieldWrapper
                                        label="Subject"
                                        name="subject"
                                        options={allSubjects.toString().split(',')}
                                        style={{marginBottom: "2%", width: "30%"}}
                                    />


                                    <DatepickerWrapper
                                        name={"deadline"}
                                        label={"Deadline"}
                                        style={{marginBottom: "2%", width: "30%"}}
                                    />

                                    <Grid container direction="column" alignItems="left" style={{marginTop: "2%"}}>
                                        {homeworkData.files.map((file, index)=>{
                                            return(
                                                <Grid item>
                                                    <Grid container direction="row" alignItems="center">
                                                        <Grid item>
                                                            <IconButton size={"small"} onClick={()=>deleteExistingFile(index)}>
                                                                <DeleteIcon/>
                                                            </IconButton>
                                                        </Grid>
                                                        <Grid item>
                                                                {file.filename}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            )})}
                                    </Grid>
                                    <UploadFile selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
            </div>
        )
    }

    return (
        <div>
            {showEdit ? editPage() : detailsPage()}
            {(role==="STUDENT" && homeworkData.answer!==undefined)&&
                <UploadAnswer homeworkData={homeworkData} fetchHomeworkData={fetchHomeworkData}/>
            }
            {role==="TEACHER"  &&
            <AnswersTable
                answers={homeworkData.answers}
                subject={homeworkData.subject}
                group={homeworkData.group}
                toGrade={homeworkData.toEvaluate}/>}
            <Modal isOpen={showDeleteDialog} setIsOpen={setShowDeleteDialog}>
                <DeleteDialog setDisplayDialog={setShowDeleteDialog}/>
            </Modal>
        </div>

    )
}

export default HomeworkDetailsAndResponses;