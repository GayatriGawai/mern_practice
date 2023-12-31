import axios from 'axios';

import { setAlert } from './alert';

import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_REPOS,
} from './types';

//GET THE CURRENT USER'S PROFILE

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/me');
        //console.log(11, res.data);
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({ type: CLEAR_PROFILE });

        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status, //its for the HTTP status
            },
        });
    }
};
// GET ALL PROFILES
export const getProfiles = (page) => async (dispatch) => {
    dispatch({
        type: CLEAR_PROFILE,
    });
    try {
        const res = await axios.get(`/api/profile?page=${page}`);

        dispatch({
            type: GET_PROFILES,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status, //its for the HTTP status
            },
        });
    }
};

//In case we want a ID from the user we need to pass the path in `` instead of using ''
// GET PROFILE by ID
export const getProfileById = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status, //its for the HTTP status
            },
        });
    }
};
//Get github Repo

export const getGithubRepos = (username) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);

        dispatch({
            type: GET_REPOS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response.statusText,
                status: err.response.status, //its for the HTTP status
            },
        });
    }
};

//Create or update profile
export const createProfile =
    (formData, history, edit = false) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios.post('/api/profile', formData, config);
            console.log('Response from server:', res);

            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
            console.log(44, res.data);

            dispatch(
                setAlert(
                    edit ? 'Profile updated' : 'Profile Created',
                    'success'
                )
            );

            if (!edit) {
                history.push('/dashboard');
            }
        } catch (err) {
            const errors = err.response?.data?.errors;
            //console.error(err.message);

            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert(error.msg, 'danger'))
                );
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response?.statusText,
                    status: err.response?.status, //its for the HTTP status
                },
            });
        }
    };

// ADD EXPERIENCE

export const addExperience = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.put(
            '/api/profile/experience',
            formData,
            config
        );
        console.log('Response from server:', res);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        console.log(44, res.data);

        dispatch(setAlert('Experience added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response?.data?.errors;
        //console.error(err.message);

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText,
                status: err.response?.status, //its for the HTTP status
            },
        });
    }
};

// ADD EDUCATION

export const addEducation = (formData, history) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.put('/api/profile/education', formData, config);
        console.log('Response from server:', res);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });
        console.log(44, res.data);

        dispatch(setAlert('Education added', 'success'));

        history.push('/dashboard');
    } catch (err) {
        const errors = err.response?.data?.errors;
        //console.error(err.message);

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText,
                status: err.response?.status, //its for the HTTP status
            },
        });
    }
};

//Delete experience

export const deleteExperience = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Experience removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText,
                status: err.response?.status, //its for the HTTP status
            },
        });
    }
};

//Delete Education

export const deleteEducation = (id) => async (dispatch) => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data,
        });

        dispatch(setAlert('Education removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {
                msg: err.response?.statusText,
                status: err.response?.status, //its for the HTTP status
            },
        });
    }
};

//Delete account & profile

export const deleteAccount = () => async (dispatch) => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
        try {
            await axios.delete('/api/profile');
            dispatch({
                type: CLEAR_PROFILE,
            });
            dispatch({
                type: ACCOUNT_DELETED,
            });

            dispatch(setAlert('Your account has been permenantly deleted'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response?.statusText,
                    status: err.response?.status, //its for the HTTP status
                },
            });
        }
    }
};
