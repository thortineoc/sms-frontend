import React, { useEffect, useState} from 'react';
import "./GroupsSubjectsTable.css"
import {Form, Formik} from "formik";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import TextFieldWrapper from "../../../../components/TextFieldWrapper/TextFieldWrapper";
import * as Yup from "yup";
import {useKeycloak} from "@react-keycloak/web";
import useAxios from "../../../../utilities/axios/useAxios";
import callBackendPost from "../../../../utilities/axios/CallBackendPost";
import callBackendGet from "../../../../utilities/axios/CallBackendGet";
import callBackendDelete from "../../../../utilities/axios/CallBackendDelete";
import {lighten, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    table: {
        minWidth: 300,
    },


    title: {
        flex: '1 1 100%',
        margin: "5px",
    },

    error:{
        margin: '5px'
    }
});


const initialValues = {
    item: ''
}

const validationSchema = Yup.object({
    item: Yup.string().required('Required'),
})

const GroupsSubjectsTable = (props) => {

    const [array, setArray] = useState([]);
    const [errorMessage, setErrorMessage] = useState("Loading...")
    const {keycloak, initialized} = useKeycloak();
    const axiosInstance = useAxios('http://52.142.201.18:24020/');

    useEffect( () => {
        fetchData();
    }, [initialized]);

    const fetchData = () => {
        callBackendGet(axiosInstance, "usermanagement-service/" + props.role, null)
            .then(response => {
                if (response.status === 200) {
                    setArray(response.data)
                    setErrorMessage("");
                } else if(response.status === 204) {
                    setErrorMessage("There are no items.");
                    setArray([])
                } else{
                    setErrorMessage("There was an error during fetching the data.");
                }
            })
            .catch(error => console.log(error))
    }

    const onDelete = async (index) => {
        const itemsToUpdate = [...array]
        setErrorMessage("");
        callBackendDelete(axiosInstance, "usermanagement-service/" + props.role + "/" + itemsToUpdate[index], null)
            .then(response => {
                if (response.status === 204) {
                    setErrorMessage("");
                    fetchData();
                } else {
                    setErrorMessage("Cannot delete this item.");
                }
            })
            .catch(error => {
                console.log(error);
                setErrorMessage("Cannot delete this item");
            })
    }

    const onSubmit = async (values, {resetForm}) => {
        let itemsToUpdate = [...array]
        if (itemsToUpdate.includes(values.item)) {
            resetForm();
            setErrorMessage("This item already exists.");
        } else {
            setErrorMessage("");
            callBackendPost(axiosInstance, "usermanagement-service/" + props.role + "/" + values.item, null)
                .then(response => {
                    if (response.status === 204) {
                        setErrorMessage("");
                        fetchData();
                    } else {
                        setErrorMessage("There was an error during creating this item.");
                    }
                })
                .catch(error => console.log(error))

            resetForm();
        }
    }
    const classes = useStyles();

    return (

        <div>
            <h3>{props.role.charAt(0).toUpperCase() + props.role.slice(1)}</h3>
            {errorMessage.length>0 ? (
                <Typography className={classes.error} variant="p" id="tableTitle" component="div">
                    {errorMessage}
                </Typography>
            ):(
                <div/>
            )}
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableBody>
                    {array.map((row, index) => (
                        <TableRow key={row}>
                            <TableCell component="th" scope="row">
                                {row}
                            </TableCell>
                            <TableCell align="right">
                                <IconButton size={"small"}>
                                    <DeleteIcon onClick={() => onDelete(index)}/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Formik
                initialValues={initialValues}
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
                                    <div className="GroupsSubjectsTable__input">
                                        <TextFieldWrapper
                                            label={"Add " + props.role}
                                            name={"item"}
                                            type="text"
                                        />
                                        <div className="CreateForm__button-wrapper">
                                            <ButtonWrapper type="submit" label="Add new"/>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        )
                    }
                }
            </Formik>
        </div>);


}


export default GroupsSubjectsTable;