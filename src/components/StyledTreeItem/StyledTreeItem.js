import {makeStyles} from "@material-ui/core/styles";
import TreeItem from "@material-ui/lab/TreeItem";
import React from "react";
import Typography from "@material-ui/core/Typography";

const useTreeItemStyles = makeStyles((theme) => ({
    label: {
        fontWeight: 'inherit',
        color: 'inherit',
    },
    labelRoot: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(1, 1),
        fontSize: 18
    },
    labelText: {
        fontWeight: 'inherit',
        flexGrow: 1,
    },
    labelInfo: {
        color: props => props.dateColor,
    }
}));

export default function StyledTreeItem(props) {
    const classes = useTreeItemStyles(props);
    const { labelText, labelInfo, bgColor, color, dateColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <Typography variant="" className={classes.labelText} >
                        {labelText}
                    </Typography>
                    <Typography className={classes.labelInfo}>
                        {labelInfo && labelInfo.substring(0,10)}
                    </Typography>
                </div>
            }
            style={{
                backgroundColor: bgColor,
                color
            }}
            classes={{
                label: classes.label,
            }}
            {...other}
        />
    )
}
