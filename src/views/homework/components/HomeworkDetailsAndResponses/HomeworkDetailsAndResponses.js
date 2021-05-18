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

const homeworkMock = {
    title: "Example homework",
    group: "3A",
    subject: "Polish",
    deadline: "10/10/2021",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    toEvaluate: true,
    answers: [{
        review: "REVIEW lorem ipsum dolor sit amet",
        files: [{
            filename: "filename_xd",
            uri: "/what/is/it"
        },
            {
                filename: "filename_xd2",
                uri: "/what/is/it2"
            }],
        grade: {
            grade: "4"
        },
        user: {
            id: "rafal1",
            firstName: "Rafal",
            lastName: "Carlos"
        },
        lastUpdatedTime: "21-21-2021",
        createdTime: "11-21-2021"
    },
        {
            review: "REVIEW lorem ipsum dolor sit amet",
            files: [{
                id: "1234",
                filename: "filename_xd",
                uri: "/what/is/it"
            },
                {
                    filename: "filename_xd2",
                    uri: "/what/is/it2"
                }],
            // grade: {
            //     grade: "4"
            // },
            user: {
                id: "rafal2",
                firstName: "Rafal",
                lastName: "Brzozowski"
            },
            lastUpdatedTime: "21-21-2021",
            createdTime: "11-21-2021"
        }
    ],
}

const homeworkEmpty = {
    title: "",
    group: "",
    subject: "",
    deadline: "",
    description: "",
    toEvaluate: true,
    answers: [],
    files: [],
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
                console.log(response.data);
                setHomeworkData(response.data);
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
                        {homeworkData.deadline.split("T")[0]}
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
                onSubmit={() => setShowEdit(false)}
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

            {/*{(role==="TEACHER" && homeworkData.answers.length>0) &&*/}
            {/*<AnswersTable*/}
            {/*    answers={homeworkData.answers}*/}
            {/*    subject={homeworkData.subject}*/}
            {/*    group={homeworkData.group}*/}
            {/*    toGrade={homeworkData.toEvaluate}/>}*/}
            <Modal isOpen={showDeleteDialog} setIsOpen={setShowDeleteDialog}>
                <DeleteDialog setDisplayDialog={setShowDeleteDialog}/>
            </Modal>
        </div>

    )
}

export default HomeworkDetailsAndResponses;