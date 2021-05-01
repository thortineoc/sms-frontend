import { Formik, Form } from "formik";
import "./FiltersForm.css";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import Button from "../../../../components/Button/Button";
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

                    }}>
                {({values, isSubmitting}) => (
                    <Form>
                        <h3>Filters</h3>
                        <FormFields className="FiltersForm_fields"/>
                        <div className="FiltersForm__button-wrapper">
                            <Button label="Apply" type="submit" disabled={isSubmitting} />
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
                        <TextFieldWrapper name="firstName" placeholder={columnNames["firstName"]}/>
                    </td>
                    <td className="TextField_cell">
                        <TextFieldWrapper name="lastName" placeholder={columnNames["lastName"]}/>
                    </td>
                </tr>
                <tr className="TextField_row">
                    <td className="TextField_cell">
                        <TextFieldWrapper name="middleName" placeholder={columnNames["middleName"]}/>
                    </td>
                    <td className="TextField_cell">
                        <TextFieldWrapper name="userName" placeholder={columnNames["userName"]}/>
                    </td>
                </tr>
                <tr className="TextField_row">
                    <td className="TextField_cell">
                        <TextFieldWrapper name="id" placeholder={columnNames["id"]}/>
                    </td>
                    <td className="TextField_cell">
                        <TextFieldWrapper name="phoneNumber" placeholder={columnNames["phoneNumber"]}/>
                    </td>
                </tr>
                <tr className="TextField_row">
                    <td className="TextField_cell">
                        <TextFieldWrapper name="email" placeholder={columnNames["email"]}/>
                    </td>
                    <td className="TextField_cell">
                        <TextFieldWrapper name="group" placeholder={columnNames["group"]}/>
                    </td>
                </tr>
                <tr className="TextField_row">
                    <td className="TextField_cell">
                        <TextFieldWrapper name="pesel" placeholder={columnNames["pesel"]}/>
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