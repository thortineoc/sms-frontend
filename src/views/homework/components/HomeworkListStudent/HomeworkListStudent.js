import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import StyledTreeItem from "../../../../components/StyledTreeItem/StyledTreeItem";
import isAfterDeadline from "../../functions/isAfterDeadline";
import useAxios from "../../../../utilities/useAxios";
import callBackendGet from "../../../../utilities/CallBackendGet";
import smsConfig from "../../../../utilities/configuration";

const useStyles = makeStyles({
    root: {
        height: 2000,
        flexGrow: 1,
        maxWidth: 450,
    },
});

const HomeworkListStudent = () => {
    const classes = useStyles();
    const axiosInstance = useAxios(smsConfig.haproxyUrl);
    const [data, setData] = useState({});

    const fetchData = () => {
        callBackendGet(axiosInstance, 'homework-service/homework/student', null)
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
                defaultExpandIcon={<ChevronRightIcon style={{color: 'rgb(33,150,243)'}} />}
            >
                {
                    Object.keys(data).map((subject) => (
                        <StyledTreeItem nodeId={uuidv4()} labelText={subject}>
                            {data[subject].map((homework) => (
                                        <Link to={`/api/homework/${homework.id}`}>
                                            <StyledTreeItem nodeId={homework.id}
                                                            labelText={homework.title}
                                                            labelInfo={homework.deadline}
                                                            bgColor={isAfterDeadline(homework.deadline)[0]}
                                                            color={isAfterDeadline(homework.deadline)[1]}
                                                            dateColor={isAfterDeadline(homework.deadline)[2]}
                                            />
                                        </Link>
                                )
                            )}
                        </StyledTreeItem>
                    ))
                }
            </TreeView>

        </div>
    );
}

export default HomeworkListStudent;