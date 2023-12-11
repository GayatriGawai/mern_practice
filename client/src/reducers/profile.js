import {
    CLEAR_PROFILE,
    GET_PROFILE,
    GET_PROFILES,
    GET_REPOS,
    PROFILE_ERROR,
    UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    totalPages: 0,
    currentPage: 1,
    loading: true,
    error: {},
};
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload.profiles || [],
                loading: false,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false,
            };

        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                loading: false,
            };
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false,
            };
        default:
            return state;
    }
}
