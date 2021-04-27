import React, {useEffect} from 'react';
import {Checkbox, FormControl, FormControlLabel, FormGroup} from "@material-ui/core";
import {elementType} from "prop-types";
import formik, { Formik, Field, Form, FieldArray } from "formik";
import { useFormik } from 'formik';

const all = [
    {id: 'firstName', label: 'First Name'},
    {id: 'lastName',  label: 'Last Name'},
    {id: 'pesel', label: 'Pesel'},
    {id: 'userName', label: 'Username'},
    {id: 'group', label: 'Group'},
    {id: 'middleName', label: 'Middle name'},
    {id: 'email', label: 'E-mail'},
    {id: 'phoneNumber', label: 'Phone no.'},
    {id: 'id', label: 'Id'},
]

const data = [
    {id: 'firstName', label: 'First Name'},
    {id: 'lastName',  label: 'Last Name'},
    {id: 'pesel', label: 'Pesel'},
    {id: 'userName', label: 'Username'},
    {id: 'group', label: 'Group'},
]

const isItemInData = (item) => {
    for(const element in data){
        if(data.hasOwnProperty(element)){

            if(data[element].id===item.id){
                return true;
            }
        }

    }
    return false;
}

const ColumnsCheckbox = (props) => {
    // return (
    //     <FormControl onSubmit={values => console.log(values)}>
    //     <FormGroup onSubmit={values => console.log(values)}>
    //         {all.map(a=>(
    //             <FormControlLabel
    //                 control={<Checkbox name="id" checked={isItemInData(a)} />}
    //                 label={a.label}
    //             />
    //         ))}
    //         <button type="submit"  className="UserManagementCreate__submit">
    //             Submit
    //         </button>
    //     </FormGroup>
    //
    //     </FormControl>
    // )

    return (
        <Formik
            initialValues={{
                checked: [],
            }}
            onSubmit={(values) => {
                alert(JSON.stringify(values, null, 2));
            }}>
            {({ values }) => (
                <Form>
                    {all.map(a=>(
                        <FormControlLabel
                            control={<Checkbox name="checked" value={Formik.values} />}
                            label={a.label}
                        />


                    ))}
                    <button type="submit"  className="UserManagementCreate__submit">
                                    Submit
                            </button>
                </Form>
            )}
        </Formik>
    )
}

export default ColumnsCheckbox;