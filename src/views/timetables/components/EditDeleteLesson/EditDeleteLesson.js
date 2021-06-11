import React, {useState} from "react";
import "./EditDeleteLesson.css"
import {Form, Formik} from "formik";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import {Grid, IconButton} from "@material-ui/core";
import * as Yup from "yup";
import Modal from "../../../../components/Modal/Modal";
import DialogBox from "../../../../components/DialogBox/DialogBox";
import callBackendDelete from "../../../../utilities/CallBackendDelete";
import useAxios from "../../../../utilities/useAxios";
import smsConfig from "../../../../utilities/configuration";
import callBackendPost from "../../../../utilities/CallBackendPost";


const validationSchema = Yup.object({
    room: Yup.string().required('Required')
})

const EditDeleteLesson = ({setIsOpen, lesson, refresh, setRefresh}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const axiosInstance = useAxios(smsConfig.haproxyUrl);

    const onSubmit = (values) => {
        let val = values;
        delete val.teacher;
        delete val.conflicts;

        let data = {
            lessons: [val]
        }

        callBackendPost(axiosInstance, "/timetable-service/timetables", data)
            .then(()=>{
                setRefresh(true);
                setIsOpen(false);
            })
            .catch(error => console.log(error))
    }

    const deleteLesson = () => {
        callBackendDelete(axiosInstance, "/timetable-service/timetables/id/"+lesson.id)
            .then(()=>{
                setRefresh(true);
                setIsOpen(false);
            })
            .catch(error => console.log(error))

    }

    return (
        <>
            {(lesson.conflicts.length>0) &&
            <div>
                <div className="EditDeleteLessonConflict__label">Conflicts</div>
                <div id="homework_subject" className="EditDeleteLessonConflict__data">
                    {lesson.conflicts.map((value, index, array)=>{
                        return (
                            <div>
                                {index+1 + ". lesson: " + (parseInt(value.lesson, 10)+1) + ", group: " + value.group + ", subject: " + value.subject}
                            </div>
                        )
                    })}
                </div>
            </div>}
            <div>
                <div className="EditDeleteLesson__label">Subject</div>
                <div id="homework_subject" className="EditDeleteLesson__data">
                    {lesson.subject}
                </div>
            </div>
            <div>
                <div className="EditDeleteLesson__label">Teacher</div>
                <div id="homework_subject" className="EditDeleteLesson__data">
                    {lesson.teacher}
                </div>
            </div>
            <div>

                {lesson.room ? (
                    <>
                        <div className="EditDeleteLesson__label">Room</div>
                        <div id="homework_subject" className="EditDeleteLesson__data">
                            {lesson.room}
                        </div>
                    </>
                ) : (

                    <Formik
                        initialValues={lesson}
                        validationSchema={validationSchema}
                        validateOnChange={false}
                        onSubmit={onSubmit}
                    >
                        {
                            formik => {
                                return (
                                    <Form>
                                        <div>
                                            {formik.errors && formik.errors.submit &&
                                            <div className="error">{formik.errors.submit}</div>}
                                            <Grid container spacing={5} style={{marginTop: "2px"}}>
                                                <Grid item xs={9}>
                                                    <TextFieldWrapper
                                                        label="Room"
                                                        name="room"
                                                        type="text"
                                                    />
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <ButtonWrapper type="submit" label="Save"
                                                                   disabled={formik.isSubmitting}/>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    </Form>)
                            }}
                    </Formik>
                )}
                <div/>
            </div>
            <ButtonWrapper label={"Delete"} style={{marginTop: "3%", float: "right"}} onClick={()=>setShowDeleteDialog(true)}/>
            <Modal isOpen={showDeleteDialog} setIsOpen={setShowDeleteDialog}>
                <DialogBox
                    deleteFunction={deleteLesson}
                    setDisplayDialog={setShowDeleteDialog}
                    prompt={"lesson"}
                    isModal={true}
                />
            </Modal>
        </>
    )
}

export default EditDeleteLesson;