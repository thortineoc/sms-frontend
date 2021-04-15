import React from 'react';
import LeftMenu from "./components/LeftMenu/LeftMenu";
import ViewRouter from "./views/common/ViewRouter";
import {BrowserRouter as Router} from "react-router-dom";

const App = () => {
    return (
        <div>
            <Router>
                <LeftMenu/>
                <ViewRouter/>
            </Router>
        </div>
    );
};

export default App;
