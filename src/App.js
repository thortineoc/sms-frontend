import React from 'react';
import LeftMenu from "./components/LeftMenu/LeftMenu";
import ViewRouter from "./views/common/ViewRouter";
import {BrowserRouter as Router} from "react-router-dom";
import {ReactKeycloakProvider} from '@react-keycloak/web'

import keycloak from './keycloak'

const App = () => {
    return (<ReactKeycloakProvider
        authClient={keycloak}>
        <div className="App">
            <Router>
                <LeftMenu/>
                <ViewRouter/>
            </Router>
        </div>
    </ReactKeycloakProvider>);
};

export default App;
