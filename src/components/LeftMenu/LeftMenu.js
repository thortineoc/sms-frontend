import React, {useEffect, useState} from 'react';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import {useKeycloak} from "@react-keycloak/web";
import getKeycloakRoles from "../../utilities/GetRoles";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';


import './LeftMenu.css';
import {AppBar, createMuiTheme, ListItemIcon, Toolbar, Typography, useTheme} from "@material-ui/core";
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
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import {blue} from "@material-ui/core/colors";

const drawerWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: blue
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentLogout: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function LeftMenu(props) {
    const classes = useStyles();
    const {keycloak, initialized} = useKeycloak();
    const [role, setRole] = useState("");
    const [currentView, setCurrentView] = useState("School Management System");
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!!initialized) {
            getKeycloakRoles(keycloak, setRole)
        }
    }, [keycloak, initialized])

    const logOut = () => {
        const options = {redirectUri: "/"};
        setCurrentView("School Management System")
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
                    <>
                        <List>
                            <Link onClick={() => setCurrentView("User profile")}
                                  className="Link_noDecoration" to="/api/usermanagement-service/my-account"
                                  role={role}>
                                <ListItem button key="profile_key">
                                    <ListItemIcon><AccountBox/></ListItemIcon>
                                    <ListItemText primary="User profile"/>
                                </ListItem>
                            </Link>
                            <Link onClick={() => setCurrentView("Dashboard")}
                                  className="Link_noDecoration" to="/"
                                  role={role}>
                                <ListItem button key="dashboard_key">
                                    <ListItemIcon><DashboardIcon/></ListItemIcon>
                                    <ListItemText primary="Dashboard"/>
                                </ListItem>
                            </Link>
                        </List>
                        <Divider/>
                        <List>
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
                        </List>
                        <Divider/>
                    </>
                )
            case "TEACHER":
            case "STUDENT":
                return (
                    <>
                        <List>
                            <Link onClick={() => setCurrentView("User profile")}
                                  className="Link_noDecoration" to="/api/usermanagement-service/my-account"
                                  role={role}>
                                <ListItem button key="profile_key">
                                    <ListItemIcon><AccountBox/></ListItemIcon>
                                    <ListItemText primary="User profile"/>
                                </ListItem>
                            </Link>
                            <Link onClick={() => setCurrentView("Dashboard")}
                                  className="Link_noDecoration" to="/"
                                  role={role}>
                                <ListItem button key="dashboard_key">
                                    <ListItemIcon><DashboardIcon/></ListItemIcon>
                                    <ListItemText primary="Dashboard"/>
                                </ListItem>
                            </Link>
                        </List>
                        <Divider/>
                        <List>
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
                        </List>
                        <Divider/>
                    </>
                )
            default:
                return ("")
        }
    }

return (
    <div className={classes.root}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar
                color={"primary"}
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    {initialized && keycloak.authenticated ? (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <MenuIcon/>
                            </IconButton>) :
                        (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={logOut}
                                edge="start"
                                className={clsx(classes.menuButton, open && classes.hide)}
                            >
                                <ExitToApp/>
                            </IconButton>
                        )}

                    <Typography variant="h6" noWrap>
                        {currentView}
                    </Typography>
                </Toolbar>
            </AppBar>
            {initialized && keycloak.authenticated && (
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >

                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </div>
                    <div className={classes.drawerContainer}>
                        <Divider/>
                        {renderMenu()}
                        <List>
                            <Link className="Link_noDecoration" to="/" onClick={logOut}>
                                <ListItem button key="logout_key">
                                    <ListItemIcon><ExitToApp/></ListItemIcon>
                                    <ListItemText
                                                  primary={initialized && keycloak.authenticated ? "Log out" : "Log in"}/>
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                </Drawer>)}
        </ThemeProvider>

        {initialized && keycloak.authenticated ? (
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        ) : (
            <main
                className={clsx(classes.contentLogout)}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        )}

    </div>
);
}

