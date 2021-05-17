import UploadFile from "../../../../components/UploadFIle/UploadFile";
import React, {useState} from "react";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import useAxios from "../../../../utilities/useAxios";
import {useKeycloak} from "@react-keycloak/web";
import axios from "axios";
import callBackendPut from "../../../../utilities/CallBackendPut";
import callBackendPost from "../../../../utilities/CallBackendPost";
import {Form} from "formik";


const UploadAnswers = (props) =>{
    const [selectedFile, setSelectedFile] = useState(null);
    const[error, setError] = useState("");
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const {keycloak, initialized} = useKeycloak();
    const kcToken = keycloak?.token ?? '';

    const attachFile = (id) => {
        if(selectedFile){
            const headers = {
                'Content-Type': 'multipart/form-data',
                Authorization: initialized ? `Bearer ${kcToken}` : undefined,
            }
            let formData = new FormData();
            formData.append("file", selectedFile);
            axios.post("http://52.142.201.18:24020/homework-service/files/upload/" + id + "/ANSWER", formData, {
                headers: headers})
                .then(response => {
                    if(response.status>204) {
                        setError("Cannot upload file.")
                    } else {
                        window.alert("Success")
                    }
                })
                .catch(error => setError("Cannot upload file."))
        }
    }

    const createAnswer = () =>{
        setError("")
        callBackendPost(axiosInstance, "homework-service/answer/"+props.id)
            .then(response => {
                attachFile(response.data.id)
            })
            .catch(error=>{
                console.log(error)
                setError("Cannot create this assignment")
            })
    }

    return (
        <div style={{borderRadius: "10px", marginTop: "10px", boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.1)", padding: "30px"}}>
            <h3>Upload your answer</h3>
            {(error.length>0 ? <p>{error}</p> : <div/>)}
            <UploadFile selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
            <ButtonWrapper label={"submit"} style={{marginTop: "10px"}} onClick={createAnswer}/>
        </div>
    )

}

export default UploadAnswers;