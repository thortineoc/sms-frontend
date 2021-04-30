import React from 'react';
import {Dialog, DialogContent, DialogTitle, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    dialogWrapper : {
        width: 540,
        padding: theme.spacing(2)
    }
}))

const Modal = ({children, isOpen, setIsOpen}) => {
    const classes = useStyles();

    return (
        <Dialog open={isOpen}
                onClose={() => setIsOpen(false)} classes={{paper: classes.dialogWrapper}}>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export default Modal;
