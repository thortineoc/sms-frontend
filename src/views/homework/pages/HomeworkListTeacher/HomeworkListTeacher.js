import React, {useState} from 'react';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Link} from "react-router-dom";
import ButtonWrapper from "../../../../components/Button/ButtonWrapper";
import './HomeworkListTeacher.css';
import Modal from "../../../../components/Modal/Modal";
import AssignEditHomeworkForm from "../../components/AssignEditHomeworkForm/AssignEditHomeworkForm";
import { v4 as uuidv4 } from 'uuid';
import StyledTreeItem from "../../../../components/StyledTreeItem/StyledTreeItem";
import isAfterDeadline from "../../functions/isAfterDeadline";

const mockData = [
    {'geography': [
            {'3A': [{
                'id': 12345679,
                'title': 'write about caves',
                    'date': '10-5-2021'
            }]},
            {'2B' : [{
                'id': 12345680,
                'title': 'write about rivers',
                    'date': '12-6-2021'
            },
                    {
                        'id': 12345688,
                        'title': 'write about sees',
                        'date': '22-5-2021'
                    }]}
        ]
    },
    {'english': [
            {'1C' : [
                    {'id': 123456781,
                        'title': 'write an email',
                        'date': '23-5-2021'
                    }]}
        ]
    }
]

const useStyles = makeStyles({
    root: {
        height: 2000,
        flexGrow: 1,
        maxWidth: 450,
    },
});

const HomeworksList = () => {
    const classes = useStyles();
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    return (
        <div className="HomeworkList">

            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon style={{color: 'navy', fontWeight: 'bold'}}/>}
                defaultExpandIcon={<ChevronRightIcon style={{color: 'rgb(33,150,243)'}}/>}
            >
                {
                    mockData.map((item) => (
                        <StyledTreeItem nodeId={uuidv4()} labelText={Object.keys(item)} >
                            {Object.keys(item).map((subjectKey) => (
                                item[subjectKey].map((groupObj, groupIndex) => (
                                    <StyledTreeItem nodeId={uuidv4()} labelText={Object.keys(groupObj)}>
                                        {Object.keys(groupObj).map((groupKey) => (
                                            groupObj[groupKey].map((homework) => (
                                                    <Link to={`/api/homework/${homework['id']}`}>
                                                        <StyledTreeItem nodeId={homework['id']}
                                                                        labelText={homework['title']}
                                                                        labelInfo={homework['date']}
                                                                        bgColor={isAfterDeadline(homework['date'])[0]}
                                                                        color={isAfterDeadline(homework['date'])[1]}
                                                        />
                                                    </Link>
                                                )
                                            )
                                        ))}
                                    </StyledTreeItem>
                                ))
                            ))}
                        </StyledTreeItem>
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


