import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import getKeycloakRoles from "../../utilities/GetRoles";

import './LeftMenu.css';
import {AppBar, ListItemIcon, Toolbar, Typography} from "@material-ui/core";
import {
    AccountBox,
    Assignment,
    ExitToApp,
    FormatListNumbered,
    ListAlt,
    People,
    School,
    TableChart
} from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        paddingLeft: drawerWidth,
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

export default function LeftMenu(props) {
    const classes = useStyles();

    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState("");
    const [currentView, setCurrentView] = useState("Student management");

    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)
        }
    }, [keycloak, initialized])

    const logOut = () => {
        const options = {redirectUri: "/"};
        if (initialized && keycloak.authenticated) {
            keycloak.logout(options);
        } else {
            keycloak.login();
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline />

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.drawerContainer}>

                <List>
                    <ListItem button key="profile_key">
                        <ListItemIcon><AccountBox/></ListItemIcon>
                        <ListItemText primary="User profile" />
                    </ListItem>
                    <Divider />
                    {role === 'ADMIN' ? (
                        <>
                            <ListItem button key="students_key">
                                <ListItemIcon><People/></ListItemIcon>
                                <Link onClick={() => setCurrentView("Student management")}
                                      className="Link_noDecoration" to="/api/usermanagement-service/students" role={role}>
                                    <ListItemText primary="Student management" />
                                </Link>
                            </ListItem>
                            <ListItem button key="teachers_key">
                                <ListItemIcon><School/></ListItemIcon>
                                <Link onClick={() => setCurrentView("Teacher management")}
                                      className="Link_noDecoration" to="/api/usermanagement-service/teachers">
                                    <ListItemText primary="Teacher management" />
                                </Link>
                            </ListItem>
                            <ListItem button key="timetables_key">
                                <ListItemIcon><TableChart/></ListItemIcon>
                                <Link onClick={() => setCurrentView("Timetable management")}
                                      className="Link_noDecoration" to="/api/usermanagement-service/timetables">
                                    <ListItemText primary="Timetable management" />
                                </Link>
                            </ListItem>
                        </>
                    ) : (
                        <>
                            <ListItem button key="timetables_key">
                                <ListItemIcon><TableChart/></ListItemIcon>
                                <Link onClick={() => setCurrentView("Timetables")}
                                      className="Link_noDecoration" to="/api/timetables-service" role={role}>
                                    <ListItemText primary="Timetables" />
                                </Link>
                            </ListItem>
                            <ListItem button key="homeworks_key">
                                <ListItemIcon><Assignment/></ListItemIcon>
                                <Link onClick={() => setCurrentView("Homework")}
                                      className="Link_noDecoration" to="/api/homework-service/teachers">
                                    <ListItemText primary="Homework" />
                                </Link>
                            </ListItem>
                            <ListItem button key="grades_key">
                                <ListItemIcon><ListAlt/></ListItemIcon>
                                <Link onClick={() => setCurrentView("Grades")}
                                      className="Link_noDecoration" to="/api/grades-service/timetables">
                                    <ListItemText primary="Grades" />
                                </Link>
                            </ListItem>
                            <ListItem button key="presences_key">
                                <ListItemIcon><FormatListNumbered/></ListItemIcon>
                                <Link onClick={() => setCurrentView("Presence")}
                                      className="Link_noDecoration" to="/api/presence-service/timetables">
                                    <ListItemText primary="Presences" />
                                </Link>
                            </ListItem>
                        </>
                    )}
                </List>
                <Divider />
                <List>
                    <ListItem button key="logout_key">
                        <ListItemIcon><ExitToApp/></ListItemIcon>
                        <Link className="Link_noDecoration" to="/">
                            <ListItemText onClick={logOut} primary={initialized && keycloak.authenticated ? "Log out" : "Log in"} />
                        </Link>
                    </ListItem>
                </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                {props.children}
            </main>
        </div>
    );
}

