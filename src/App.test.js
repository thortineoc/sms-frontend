import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {getQueriesForElement, render, fireEvent, waitFor, screen} from "@testing-library/react";
import UserManagement from "./views/usermanagement/layouts/UsersManagement/UserManagement";

it('renders without crashing', () => {
    render(<App />);
});

it('can login', () => {
    render(UserManagement);
});

it('goes to grades view', () => {
   render(<App />);

   fireEvent.click(screen.getByText('Grades'));
});

it('goes to homework view', () => {
   render(<App />);

   fireEvent.click(screen.getByText('Homework'));
});

it('goes to presences view', () => {
   render(<App />);

   fireEvent.click(screen.getByText('Presences'));
});

it('goes to timetables view', () => {
   render(<App />);

   fireEvent.click(screen.getByText('Timetables'));
});