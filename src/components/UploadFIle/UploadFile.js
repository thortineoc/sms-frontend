import ButtonWrapper from "../Button/ButtonWrapper";
import {Grid, IconButton, Typography} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {useEffect} from "react";


const UploadFile = (props) => {

    useEffect(() => {
        console.log(props.selectedFile)
    },[props.selectedFile])

    const deleteFile = (key) =>{
        const itemsToUpdate = [...props.selectedFile]
        itemsToUpdate.splice(key, 1);
        props.setSelectedFile(itemsToUpdate)
    }

    return(
        <Grid container direction="column" alignItems="left" style={{marginTop: "2%", marginBottom: "2%"}}>
            <Grid item>
                <input
                    accept="*"
                    id="contained-button-file"
                    style={{display: "none"}}
                    type="file"
                    multiple
                    onClick={(e) => {
                        e.target.value = null
                    }}
                    onChange={(e) => props.setSelectedFile(Array.from(e.target.files))}
                />
                <label htmlFor="contained-button-file">
                    <ButtonWrapper variant="contained" color="primary" component="span" label={"ATTACH FILE"}/>
                </label>
            </Grid>
            {props.selectedFile.map((file, index) => {
                return (
                <Grid item>
                    <Grid container direction="row" alignItems="left" style={{marginTop: "2%"}}>
                        <Grid item>
                            <IconButton onClick={() => deleteFile(index)} size={"small"}>
                                <DeleteIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography>
                                {file.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                )})}

        </Grid>
    )
};

export default UploadFile;