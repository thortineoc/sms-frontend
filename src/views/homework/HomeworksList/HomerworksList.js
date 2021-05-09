import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

const mockData = [
    {'geography': [
            {'3A': ['read about rocks', 'write about caves']},
            {'2B' : ['write about rivers']}
        ]
    },
    {'english': [
            {'1C' : ['write an email']}
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

    return (
        <TreeView
            className={classes.root}
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
        >
            {

                mockData.map((item, subjectIndex) => (
                    <TreeItem nodeId={subjectIndex} label={Object.keys(item)}>
                        {Object.keys(item).map((subjectKey) => (
                            item[subjectKey].map((groupObj, groupIndex) => (
                                <TreeItem nodeId={1000 + groupIndex} label={Object.keys(groupObj)}>
                                    {Object.keys(groupObj).map((groupKey) => (
                                        groupObj[groupKey].map((homework, homeworkIndex) => (
                                                <TreeItem nodeId={2000 + homeworkIndex} label={homework}/>
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
    );
}

export default HomeworksList;