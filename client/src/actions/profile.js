import axios from 'axios';
import { setAlert } from './alert';

import { GET_PROFILE, PROFILE_ERROR } from './types';

//GET THE CURRENT USER'S PROFILE

export const getCurrentProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('./api/profile/me');
        console.log(11, res);
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
