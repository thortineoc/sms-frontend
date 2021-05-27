import React, {useState} from "react";
import "./EditDeleteLesson.css"
import {Form, Formik} from "formik";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import {Grid, IconButton} from "@material-ui/core";
import * as Yup from "yup";
import Modal from "../../../../components/Modal/Modal";
import DialogBox from "../../../../components/DialogBox/DialogBox";


const validationSchema = Yup.object({
    room: Yup.string().required('Required')
})

const EditDeleteLesson = ({setIsOpen, lesson}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const onSubmit = (values) => {
        console.log(values)
        setIsOpen(false)
    }

    const deleteLesson = () => {
        console.log("delete lesson")
        setIsOpen(false)
    }

    return (
        <>
            {(true) &&
            <div>
                <div className="EditDeleteLessonConflict__label">Conflict</div>
                <div id="homework_subject" className="EditDeleteLessonConflict__data">
                    This lesson has a conflict with:...
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