import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import ReactDOM from 'react-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';

//REDUX
import { Provider } from 'react-redux';
import store from './store';

//In React Router version 6,
//the < Switch > component has been deprecated
//and replaced with the < Routes > component.
//The < Routes > component in React Router v6 provides
//a more declarative and flexible approach to routing
//compared to the deprecated < Switch > component.

const App = () => (
    <Provider store={store}>
        <Router>
            <Fragment>
                <Navbar />
                <Alert />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </Fragment>
        </Router>
    </Provider>
);

export default App;
