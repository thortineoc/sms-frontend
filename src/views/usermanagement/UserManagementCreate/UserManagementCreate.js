import React, { useState } from 'react'
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import './UserManagementCreate.css'

const UserManagementCreate = () => {

    const [users, setUsers] = useState([{
        firstname: '',
        secondname: '',
        lastname: ''
    }]);

    return (
        <div className="UserManagementCreate">
            <div className="UserManagmentCreate__container">
                <Formik
                    initialValues={users}
                    onSubmit={users => {
                        setTimeout(() => {
                            alert(JSON.stringify(users, null, 2));
                        }, 500);
                    }}
                >
                    { ({isSubmitting}) => (
                        <Form>
                            <div className="UserManagmentCreate__row">
                                <div className="UserManagmentCreate__col">
                                    <Field name="name" />
                                    
                                </div>
                                <div className="UserManagmentCreate__col">
                                    <Field name="surname" type="text" />
                                </div>
                                <div className="UserManagmentCreate__col">
                                    <button type="button">X</button>
                                </div>
                            </div>
                            <button type="submit" disabled={isSubmitting} className="UserManagmentCreate__new">
                                Add new account
                            </button>
                            <button type="submit" disabled={isSubmitting} className="UserManagmentCreate__submit">
                                Submit
                            </button>
                        </Form>
                    )}

                </Formik>
            </div>
        </div>
    )
}

export default UserManagementCreate;