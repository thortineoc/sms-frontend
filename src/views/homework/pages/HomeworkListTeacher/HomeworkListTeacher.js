import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {Link} from "react-router-dom";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import './HomeworkListTeacher.css';
import Modal from "../../../../components/Modal/Modal";
import AssignEditHomeworkForm from "../../components/AssignEditHomeworkForm/AssignEditHomeworkForm";
import { v4 as uuidv4 } from 'uuid';

const mockData = [
    {'geography': [
            {'3A': [{
                'id': 12345679,
                'title': 'write about caves'
            }]},
            {'2B' : [{
                'id': 12345680,
                'title': 'write about rivers'
            },
                    {
                        'id': 12345688,
                        'title': 'write about sees'
                    }]}
        ]
    },
    {'english': [
            {'1C' : [
                    {'id': 123456781,
                        'title': 'write an email'
                    }]}
        ]
    }
]

const useStyles = makeStyles({
    root: {
        height: 240,
        flexGrow: 1,
        maxWidth: 400,
    },
});

const HomeworksList = () => {
    const classes = useStyles();
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    return (
        <div className="HomeworkList">

            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {
                    mockData.map((item) => (
                        <TreeItem nodeId={uuidv4()} label={Object.keys(item)}>
                            {Object.keys(item).map((subjectKey) => (
                                item[subjectKey].map((groupObj, groupIndex) => (
                                    <TreeItem nodeId={uuidv4()} label={Object.keys(groupObj)}>
                                        {Object.keys(groupObj).map((groupKey) => (
                                            groupObj[groupKey].map((homework, homeworkIndex) => (
                                                    <Link to={`/api/homework/${homework['id']}`}>
                                                        <TreeItem nodeId={homework['id']} label={homework['title']}/>
                                                    </Link>
                                                )
                                            )
                                        ))}
                                    </TreeItem>
                                ))
                            ))}
                        </TreeItem>
                    ))
                }
            </TreeView>
            <ButtonWrapper label='Add new' onClick={() => setShowCreateDialog(true)} className="HomeworkList__button" />

            <Modal isOpen={showCreateDialog} setIsOpen={setShowCreateDialog}>
                <AssignEditHomeworkForm
                    type="ADD"
                />
            </Modal>

        </div>
    );
}

export default HomeworksList;