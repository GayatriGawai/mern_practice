import axios from 'axios';

import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

//GET THE CURRENT USER'S PROFILE

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('./api/profile/me');
        //console.log(11, res.data);
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

//create or update profile
export const createProfile =
    (formData, history, edit = false) =>
    async (dispatch) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const res = await axios.post('./api/profile', formData, config);
            console.log('Response from server:', res);

            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            });
            console.log(44, res.data);

            dispatch(setAlert(edit ? 'Profile updated' : 'Profile Created'));

            if (!edit) {
                history.push('/dashboard');
            }
        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) =>
                    dispatch(setAlert(error.msg, 'danger'))
                );
            }
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: err.response.statusText,
                    status: err.response.status, //its for the HTTP status
                },
            });
        }
    };
