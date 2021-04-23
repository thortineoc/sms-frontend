import React from 'react'
import { Formik, Field, Form, FieldArray } from "formik";
import './CreateStudentsForm.css'

const initialValue = {
    users: [{
        firstname: '',
        secondname: '',
        lastname: '',
    }],
    group: '1A'
};

const CreateStudentsForm = () => {
    return (
        <div className="UserManagementCreate">
            <div className="UserManagementCreate__container">
                <Formik
                    initialValues={initialValue}
                    onSubmit={users => {
                        setTimeout(() => {
                            alert(JSON.stringify(users, null, 2));
                        }, 500);
                    }}
                >
                    { ({ values, isSubmitting}) => (
                        <Form>
                            <Field as="select" name="group" >
                                <option value="1A">1A</option>
                                <option value="1B">1B</option>
                                <option value="1C">1C</option>
                            </Field>
                            <FieldArray name="users">
                                {({ push, remove }) => (
                                    <>
                                        {values.users && values.users.length > 0 && values.users.map((user, index) => (
                                        <div className="UserManagementCreate__row">
                                            <div className="UserManagementCreate__col">
                                                <Field name={`users[${index}].firstname`}>
                                                    {({ field, form }) => (
                                                        <input {...field} type="text" placeholder="Joe" />
                                                    )
                                                    }
                                                </Field>
                                            </div>
                                            <div className="UserManagementCreate__col">
                                                <Field name={`users[${index}].lastname`} type="text" />
                                            </div>
                                            <div className="UserManagementCreate__col">
                                                <button
                                                    type="button"
                                                    onClick={() => remove(index)}
                                                >
                                                    X
                                                </button>
                                            </div>
                                        </div>
                                        ))}
                                        <button type="button"
                                                onClick={() => push({firstname: '', secondname: '', lastname: ''})}
                                                className="UserManagementCreate__new"
                                        >
                                            +
                                        </button>
                                        <button type="submit" disabled={isSubmitting} className="UserManagementCreate__submit">
                                            Submit
                                        </button>
                                    </>
                                )}
                            </FieldArray>

                        </Form>
                    )}

                </Formik>
            </div>
        </div>
    )
}

export default CreateStudentsForm;