import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import {Link} from "react-router-dom";

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

    const handleClick = (id) => {

    }

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
                                <TreeItem nodeId={1000 + groupIndex + 100 * subjectIndex} label={Object.keys(groupObj)}>
                                    {Object.keys(groupObj).map((groupKey) => (
                                        groupObj[groupKey].map((homework, homeworkIndex) => (
                                                <Link to="/api/grades-service">
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
    );
}

export default HomeworksList;