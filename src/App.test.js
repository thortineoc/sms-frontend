import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {getQueriesForElement} from "@testing-library/react";

const render = (component)=>{
    const div = document.createElement('div');
    ReactDOM.render(component, div);
    return getQueriesForElement(div);
}

it('renders without crashing', () => {
    render(<App />);
});