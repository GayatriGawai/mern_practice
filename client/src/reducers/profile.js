import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {},
};
export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(12, type, payload);
    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null,
            };
        default:
            return state;
    }
}