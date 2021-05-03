import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {getQueriesForElement, render, fireEvent, waitFor, screen, getByText} from "@testing-library/react";
import UserManagement from "./views/usermanagement/layouts/UsersManagement/UserManagement";
import userEvent from '@testing-library/user-event'

it('renders without crashing', () => {
    render(<App />);
});
/*
it('can login', () => {
    render(<UserManagement />);
    //tu już nie działa
});
*/