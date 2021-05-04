import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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

    const renderMenu = () => {
        switch (role) {
            case 'ADMIN':
                return (
                    <List>
                        <ListItem button key="profile_key">
                            <ListItemIcon><AccountBox/></ListItemIcon>
                            <ListItemText primary="User profile"/>
                        </ListItem>
                        <Divider/>
                        <>
                            <Link onClick={() => setCurrentView("Student management")}
                                  className="Link_noDecoration" to="/api/usermanagement-service/students"
                                  role={role}>
                                <ListItem button key="students_key">
                                    <ListItemIcon><People/></ListItemIcon>
                                    <ListItemText primary="Student management"/>
                                </ListItem>
                            </Link>
                            <Link onClick={() => setCurrentView("Teacher management")}
                                  className="Link_noDecoration" to="/api/usermanagement-service/teachers">
                                <ListItem button key="teachers_key">
                                    <ListItemIcon><School/></ListItemIcon>
                                    <ListItemText primary="Teacher management"/>
                                </ListItem>
                            </Link>
                            <Link onClick={() => setCurrentView("Timetable management")}
                                  className="Link_noDecoration" to="/api/usermanagement-service/timetables">
                                <ListItem button key="timetables_key">
                                    <ListItemIcon><TableChart/></ListItemIcon>
                                    <ListItemText primary="Timetable management"/>
                                </ListItem>
                            </Link>
                        </>
                        <Divider/>
                    </List>

                )
            case "TEACHER":
            case "STUDENT":
                return (
                    <List>
                        <ListItem button key="profile_key">
                            <ListItemIcon><AccountBox/></ListItemIcon>
                            <ListItemText primary="User profile"/>
                        </ListItem>
                        <Divider/>
                        <>
                            <Link onClick={() => setCurrentView("Timetables")}
                                  className="Link_noDecoration" to="/api/timetable-service" role={role}>
                                <ListItem button key="timetables_key">
                                    <ListItemIcon><TableChart/></ListItemIcon>
                                    <ListItemText primary="Timetables"/>
                                </ListItem>
                            </Link>
                            <Link onClick={() => setCurrentView("Homework")}
                                  className="Link_noDecoration" to="/api/homework-service">
                                <ListItem button key="homeworks_key">
                                    <ListItemIcon><Assignment/></ListItemIcon>
                                    <ListItemText primary="Homework"/>
                                </ListItem>
                            </Link>
                            <Link onClick={() => setCurrentView("Grades")}
                                  className="Link_noDecoration" to="/api/grades-service">
                                <ListItem button key="grades_key">
                                    <ListItemIcon><ListAlt/></ListItemIcon>
                                    <ListItemText primary="Grades"/>
                                </ListItem>
                            </Link>
                            <Link onClick={() => setCurrentView("Presence")}
                                  className="Link_noDecoration" to="/api/presence-service">
                                <ListItem button key="presences_key">
                                    <ListItemIcon><FormatListNumbered/></ListItemIcon>
                                    <ListItemText primary="Presences"/>
                                </ListItem>
                            </Link>
                        </>
                        <Divider/>
                    </List>
                )
            default:
                return ("")
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>

            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.drawerContainer}>


                    {renderMenu()}

                    <List>
                        <Link className="Link_noDecoration" to="/">
                            <ListItem button key="logout_key">
                                <ListItemIcon><ExitToApp/></ListItemIcon>
                                <ListItemText onClick={logOut}
                                              primary={initialized && keycloak.authenticated ? "Log out" : "Log in"}/>
                            </ListItem>
                        </Link>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                {props.children}
            </main>
        </div>
    );
}

