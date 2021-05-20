import React, {useEffect, useState} from 'react';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Link} from "react-router-dom";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import './HomeworkListTeacher.css';
import Modal from "../../../../components/Modal/Modal";
import AssignEditHomeworkForm from "../AssignEditHomeworkForm/AssignEditHomeworkForm";
import { v4 as uuidv4 } from 'uuid';
import StyledTreeItem from "../../../../components/StyledTreeItem/StyledTreeItem";
import isAfterDeadline from "../../functions/isAfterDeadline";
import useAxios from "../../../../utilities/useAxios";
import callBackendGet from "../../../../utilities/CallBackendGet";

const useStyles = makeStyles({
    root: {
        height: 2000,
        flexGrow: 1,
        maxWidth: 450,
    },
});

const HomeworkListTeacher = () => {
    const classes = useStyles();
    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const axiosInstance = useAxios('http://52.142.201.18:24020/');
    const [data, setData] = useState({});

    const fetchData = () => {
        callBackendGet(axiosInstance, 'homework-service/homework/teacher')
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.log(error))
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="HomeworkList">

            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon style={{color: 'navy'}} />}
                defaultExpandIcon={<ChevronRightIcon style={{color: 'rgb(33,150,243)'}}/>}
            >
                {
                    Object.keys(data).map((subject) => (
                        <StyledTreeItem nodeId={uuidv4()} labelText={subject}>
                            {Object.keys(data[subject]).map(group => (
                                    <StyledTreeItem nodeId={uuidv4()} labelText={group}>
                                        {
                                            data[subject][group].map(homework => (
                                                <Link to={`/api/homework/${homework.id}`}>
                                                <StyledTreeItem nodeId={uuidv4()}
                                                                labelText={homework.title}
                                                                labelInfo={homework.deadline}
                                                                bgColor={isAfterDeadline(homework.deadline)[0]}
                                                                color={isAfterDeadline(homework.deadline)[1]}
                                                                dateColor={isAfterDeadline(homework.deadline)[2]}
                                                />
                                                </Link>
                                            ))
                                        }
                                    </StyledTreeItem>
                                ))}

                        </StyledTreeItem>
                    ))
                }
            </TreeView>
            <ButtonWrapper label='Add new' onClick={() => setShowCreateDialog(true)} className="HomeworkList__button" />

            <Modal isOpen={showCreateDialog} setIsOpen={setShowCreateDialog}>
                <AssignEditHomeworkForm
                    type="ADD"
                    setIsOpen={setShowCreateDialog}
                    fetchData={fetchData}
                />
            </Modal>

        </div>
    );
}

export default HomeworkListTeacher;


