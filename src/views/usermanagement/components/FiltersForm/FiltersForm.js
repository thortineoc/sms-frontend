import { Formik, Form } from "formik";
import "./FiltersForm.css";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import React from "react";

const defaultInitValues = {
    userName: "",
    firstName: "",
    lastName: "",
    middleName: "",
    phoneNumber: "",
    pesel: "",
    id: "",
    email: "",
    group: "",
};

const columnNames = {
    id: "User ID",
    userName: "Username",
    firstName: "First Name",
    lastName: "Last Name",
    middleName: "Middle Name",
    pesel: "PESEL",
    phoneNumber: "Phone Number",
    email: "E-mail Address",
    group: "Group"
}

const FiltersForm = ({initValues = defaultInitValues, onSubmit, setIsActive}) => {
    console.log(initValues)
    console.log(defaultInitValues)
    return (
        <div className="FiltersForm">
            <Formik initialValues={initValues}
                    onSubmit={values => {
                        onSubmit(values);
                        setIsActive(false);
                    }}
                    onReset={() => {
                        onSubmit(defaultInitValues);
                        setIsActive(false);
                    }}
            >
                {({values, isSubmitting}) => (
                    <Form>
                        <h3>Filters</h3>
                        <FormFields className="FiltersForm_fields"/>
                        <div className="FiltersForm__button-wrapper">
                            <ButtonWrapper label="Reset" type="reset" disabled={isSubmitting} style={{margin:"5px"}}/>
                            <ButtonWrapper label="Apply" type="submit" disabled={isSubmitting} style={{margin:"5px"}}/>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const FormFields = () => {
    return (
        <table>
            <tbody>
                <tr className="TextField_row">
                    <td className="TextField_cell">
                        <TextFieldWrapper
                            name="firstName"
                            label={columnNames["firstName"]}
                            type="text"/>
                    </td>
                    <td className="TextField_cell">
                        <TextFieldWrapper
                            name="lastName"
                            label={columnNames["lastName"]}
                            type="text"/>
                    </td>
                </tr>
                <tr className="TextField_row">
                    <td className="TextField_cell">
                        <TextFieldWrapper
                            name="middleName"
                            label={columnNames["middleName"]}
                            type="text"/>
                    </td>
                    <td className="TextField_cell">
                        <TextFieldWrapper
                            name="userName"
                            label={columnNames["userName"]}
                            type="text"/>
                    </td>
                </tr>
                <tr className="TextField_row">
                    <td className="TextField_cell">
                        <TextFieldWrapper
                            name="id"
                            label={columnNames["id"]}
                            type="text"/>
                    </td>
                    <td className="TextField_cell">
                        <TextFieldWrapper
                            name="phoneNumber"
                            label={columnNames["phoneNumber"]}
                            type="text"/>
                    </td>
                </tr>
                <tr className="TextField_row">
                    <td className="TextField_cell">
                        <TextFieldWrapper
                            name="email"
                            label={columnNames["email"]}
                            type="text"/>

                    </td>
                    <td className="TextField_cell">
                        <TextFieldWrapper
                            name="group"
                            label={columnNames["group"]}
                            type="text"/>
                    </td>
                </tr>
                <tr className="TextField_row">
                    <td className="TextField_cell">
                        <TextFieldWrapper
                            name="pesel"
                            label={columnNames["pesel"]}
                            type="text"/>
                    </td>
                    <td className="TextField_cell"/>
                    <td className="ClearButton_mock"/>
                </tr>
            </tbody>
        </table>
    )
}

const ClearButton = ({disabled, onClick}) => {
    return (
        <button className="ClearButton"
                type="reset"
                disabled={disabled}
                onClick={onClick}>X</button>
    );
}

export default FiltersForm;