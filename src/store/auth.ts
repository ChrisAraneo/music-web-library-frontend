import { store } from './index';
import { requestPost } from '../service/requests';
import Role from '../model/Role';

// DEFAULT STATE
const defaultState: {
    usernameOrEmail: string,
    token: string | null,
    roles: Array<Role>,
    signUp: {
        success: boolean | null,
        message: string | null
    }
} = {
    usernameOrEmail: "",
    token: null,
    roles: [],
    signUp: {
        success: null,
        message: null
    }
}

// ACTION TYPES
const SIGN_UP_INIT = "SIGN_UP_INIT";
const SIGN_UP = "SIGN_UP";
const SIGN_IN = "SIGN_IN";
const SIGN_OUT = "SIGN_OUT";

// ACTION CREATORS
export const actionSignUpInit = ({
    type: SIGN_UP_INIT
});
export const actionSignUp = (
    result: { success: string, message: string }
) => ({
    type: SIGN_UP,
    signUp: result
});
export const actionSignIn = (
    result: { accessToken: string, tokenType: string, userRoles: Array<any> },
    usernameOrEmail: string
) => ({
    type: SIGN_IN,
    usernameOrEmail,
    result
});
export const actionSignOut = ({
    type: SIGN_OUT
});

// REDUCER
export default function reducer(
    state = defaultState,
    action: any
) {
    switch (action.type) {
        case SIGN_UP_INIT: {
            return {
                ...state,
                signUp: {
                    success: null,
                    message: null
                }
            };
        }
        case SIGN_UP: {
            return {
                ...state,
                signUp: action.signUp
            };
        }
        case SIGN_IN: {
            return {
                usernameOrEmail: action.usernameOrEmail,
                token: action.result.accessToken,
                roles: action.result.userRoles,
                signUp: {
                    success: null,
                    message: null
                }
            };
        }
        case SIGN_OUT: {
            return {
                ...state,
                usernameOrEmail: "",
                token: null,
                roles: []
            };
        }
        default: {
            return state;
        }
    }
}

// PUBLIC ASYNC FUNCTIONS TO USE
export function signUpInit() {
    store.dispatch(actionSignUpInit);
}

export function signUp(
    name: string,
    username: string,
    email: string,
    password: string
) {
    store.dispatch(requestPost(`http://localhost:8080/api/signup`, {
        body: JSON.stringify({ name, username, email, password })
    }, actionSignUp));
}

export function signIn(usernameOrEmail: string, password: string, successCallback?: any) {
    store.dispatch(requestPost(`http://localhost:8080/api/signin`, {
        body: JSON.stringify({ usernameOrEmail, password })
    }, (result) => {
        if (typeof successCallback === "function") {
            successCallback();
        }
        return actionSignIn(result, usernameOrEmail);
    }));
}

export function signOut() {
    store.dispatch(actionSignOut);
}