import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import StyledTreeItem from "../../../../components/StyledTreeItem/StyledTreeItem";
import isAfterDeadline from "../../functions/isAfterDeadline";

const mockData = [
    {'geography': [
            {
                    'id': 12345679,
                    'title': 'write about caves'
            },
            {
                    'id': 12345680,
                    'title': 'write about rivers'
            }, {
                        'id': 12345688,
                        'title': 'write about sees'
            }
        ]
    },
    {'english': [
        {'id': 123456781,
            'title': 'write an email'
        }]
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
        <div className="HomeworkList">

            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                {
                    mockData.map((item) => (
                        <StyledTreeItem nodeId={uuidv4()} label={Object.keys(item)}>
                            {Object.keys(item).map((subject) => (
                                item[subject].map((homework) => (
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
                }
            </TreeView>

        </div>
    );
}

export default HomeworksList;