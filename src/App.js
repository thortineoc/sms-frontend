import React from 'react';
import ViewRouter from "./views/common/ViewRouter";
import {BrowserRouter as Router} from "react-router-dom";
import {ReactKeycloakProvider} from '@react-keycloak/web'

import keycloak from './utilities/keycloak.js'
import LeftMenu from "./components/LeftMenu/LeftMenu";

const App = () => {
    return (<ReactKeycloakProvider
        authClient={keycloak}>
        <div className="App">
            <Router>
                <LeftMenu>
                    <ViewRouter/>
                </LeftMenu>
            </Router>
        </div>
    </ReactKeycloakProvider>);
};

export default App;
