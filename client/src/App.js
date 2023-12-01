import React, { Fragment, useEffect } from 'react';
import PrivateRoute from './components/routing/PrivateRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import ReactDOM from 'react-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
//REDUX
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

//In React Router version 6,
//the < Switch > component has been deprecated
//and replaced with the < Routes > component.
//The < Routes > component in React Router v6 provides
//a more declarative and flexible approach to routing
//compared to the deprecated < Switch > component.

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <section className="conatiner">
                <Router>
                    <Fragment>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Landing />} />
                        </Routes>

                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route
                                exact
                                path="/register"
                                element={<Register />}
                            />
                            <Route
                                path="/dashboard"
                                element={<PrivateRoute component={Dashboard} />}
                            />
                        </Routes>
                    </Fragment>
                </Router>
            </section>
        </Provider>
    );
};

export default App;
