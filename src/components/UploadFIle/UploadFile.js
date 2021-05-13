import ButtonWrapper from "../Button/ButtonWrapper";
import {Grid, IconButton, Typography} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";

const UploadFile = (props) => {

    return(
        <Grid container direction="row" alignItems="center" style={{marginTop: "2%"}}>
            <Grid item>
                <input
                    accept="*"
                    id="contained-button-file"
                    style={{display: "none"}}
                    type="file"
                    onClick={(e) => {
                        e.target.value = null
                    }}
                    onChange={(e) => props.setSelectedFile(e.target.files[0])}
                />
                <label htmlFor="contained-button-file">
                    <ButtonWrapper variant="contained" color="primary" component="span" label={"UPLOAD FILE"}/>
                </label>
            </Grid>
            <Grid item style={{marginLeft: "2%"}}>
                {props.selectedFile ? (
                    <IconButton onClick={() => props.setSelectedFile(null)} size={"small"}>
                        <DeleteIcon/>
                    </IconButton>
                ) : ""}
            </Grid>
            <Grid item>
                {props.selectedFile ? (
                    <Typography>
                        {props.selectedFile.name}
                    </Typography>
                ) : ""}
            </Grid>
        </Grid>
    )
};

export default UploadFile;