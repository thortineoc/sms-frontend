import React, {useState} from 'react';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
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
import Typography from "@material-ui/core/Typography";

const mockData = [
    {'geography': [
            {'3A': [{
                'id': 12345679,
                'title': 'write about caves',
                    'date': '12-05-2021'
            }]},
            {'2B' : [{
                'id': 12345680,
                'title': 'write about rivers',
                    'date': '12-06-2021'
            },
                    {
                        'id': 12345688,
                        'title': 'write about sees',
                        'date': '22-05-2021'
                    }]}
        ]
    },
    {'english': [
            {'1C' : [
                    {'id': 123456781,
                        'title': 'write an email',
                        'date': '23-05-2021'
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

const useTreeItemStyles = makeStyles((theme) => ({
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 0),
        fontSize: 18
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
    labelInfo: {
        color: 'gray'
    }
}));

function StyledTreeItem(props) {
    const classes = useTreeItemStyles();
    const { labelText, labelInfo, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <Typography variant="" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography className={classes.labelInfo}>
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                label: classes.label,
            }}
            {...other}
        />
    );
}


const HomeworksList = () => {
    const classes = useStyles();
    const [showCreateDialog, setShowCreateDialog] = useState(false);

    return (
        <div className="HomeworkList">

            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon style={{color: 'navy'}}/>}
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


