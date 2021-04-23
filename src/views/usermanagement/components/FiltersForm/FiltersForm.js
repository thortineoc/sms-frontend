import { Formik, Form } from "formik";
import "./FiltersForm.css";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import {useState} from "react";

const defaultInitValues = {
    username: "",
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
    username: "Username",
    firstName: "First Name",
    lastName: "Last Name",
    middleName: "Middle Name",
    pesel: "PESEL",
    phoneNumber: "Phone Number",
    email: "E-mail Address",
    group: "Group"
}

const FiltersForm = ({initValues = defaultInitValues, onSubmit}) => {
    return (
        <div className="FiltersForm">
            <Formik initialValues={initValues}
                    onSubmit={values => onSubmit(values)}>
                {({values, isSubmitting}) => (
                    <Form>
                        <FormFields className="FiltersForm_fields"/>
                        <button type="submit" disabled={isSubmitting} className="FiltersForm_submit">
                            Apply
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

const FormFields = () => {
    return (
        <table>
            <tr className="TextField_row">
                <TextFieldDoubleWrapper name="firstName"/>
                <TextFieldDoubleWrapper name="lastName"/>
            </tr>
            <tr className="TextField_row">
                <TextFieldDoubleWrapper name="middleName"/>
                <TextFieldDoubleWrapper name="username"/>
            </tr>
            <tr className="TextField_row">
                <TextFieldDoubleWrapper name="id"/>
                <TextFieldDoubleWrapper name="phoneNumber"/>
            </tr>
            <tr className="TextField_row">
                <TextFieldDoubleWrapper name="email"/>
                <TextFieldDoubleWrapper name="group"/>
            </tr>
            <tr className="TextField_row">
                <TextFieldDoubleWrapper name="pesel"/>
                <td className="TextField_cell"/>
                <td className="ClearButton_mock"/>
            </tr>
        </table>
    )
}

const TextFieldDoubleWrapper = ({name, ...rest}) => {
    let [hasText, setHasText] = useState(false);
    let [shouldReset, setShouldReset] = useState(false);

    return (
        <>
            <td className="TextField_cell">
                <TextFieldWrapper onChange={e => setHasText(e.target.value)}
                                  name={name}
                                  resetValue={shouldReset}
                                  setResetValue={() => {
                                      setShouldReset(false);
                                      setHasText(false);
                                  }}
                                  placeholder={columnNames[name] ?? "unknown"} {...rest} />
            </td>
            <td>
                <ClearButton onClick={() => setShouldReset(true)}
                             disabled={!hasText}/>
            </td>
        </>
    );
};

const ClearButton = ({disabled, onClick}) => {
    return (
        <button className="ClearButton"
                type="reset"
                disabled={disabled}
                onClick={onClick}>X</button>
    );
}

export default FiltersForm;