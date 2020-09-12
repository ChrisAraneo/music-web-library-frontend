import { store } from ".";

// DEFAULT STATE
const defaultState = {
    isPending: false,
    notifications: []
}

// ACTION TYPES
const FETCH_PENDING = "FETCH_PENDING";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_ERROR = "FETCH_ERROR";
const NOTIFICATION_ERROR = "NOTIFICATION_ERROR";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

// ACTION CREATORS
export const actionFetchPending = () => ({
    type: FETCH_PENDING
});
export const actionFetchSuccess = (success?: any) => ({
    type: FETCH_SUCCESS,
    success
});
export const actionFetchError = (error?: any) => ({
    type: FETCH_ERROR,
    error
});
export const actionNotificationError = (error?: any) => ({
    type: NOTIFICATION_ERROR,
    error
});
export const actionRemoveNotification = (id: string) => ({
    type: REMOVE_NOTIFICATION,
    id
});

// REDUCER
export default function reducer(
    state = defaultState,
    action: any
) {
    switch (action.type) {
        case FETCH_PENDING: {
            return {
                isPending: true,
                notifications: [...state.notifications]
            };
        }
        case FETCH_SUCCESS: {
            const id = new Date().toISOString();
            const type = "success";
            const { success } = action;
            if (success) {
                return {
                    isPending: false,
                    notifications: [...state.notifications, {
                        title: success.title,
                        message: success.message,
                        id,
                        type
                    }]
                };
            } else {
                return {
                    isPending: false,
                    notifications: [...state.notifications]
                };
            }
        }
        case FETCH_ERROR: {
            const id = new Date().toISOString();
            const type = "error";
            const { error } = action;
            if (error) {
                return {
                    isPending: false,
                    notifications: [...state.notifications, {
                        title: error.error,
                        message: error.message,
                        id,
                        type
                    }]
                };
            } else {
                return {
                    isPending: false,
                    notifications: [...state.notifications]
                };
            }
        }
        case NOTIFICATION_ERROR: {
            const id = new Date().toISOString();
            const type = "error";
            const { error } = action;
            if (error) {
                return {
                    isPending: state.isPending,
                    notifications: [...state.notifications, {
                        title: error.error,
                        message: error.message,
                        id,
                        type
                    }]
                };
            } else {
                return {
                    isPending: false,
                    notifications: [...state.notifications]
                };
            }
        }
        case REMOVE_NOTIFICATION: {
            const { id } = action;
            const { notifications } = state;
            return {
                isPending: state.isPending,
                notifications: notifications.filter((item: any) => {
                    if (item && item?.id != id) {
                        return item;
                    }
                })
            };
        }
        default: {
            return state;
        }
    }
}

// PUBLIC ASYNC FUNCTIONS TO USE
export function addSuccessNotification(title: string, message: string) {
    store.dispatch(actionFetchSuccess({ title, message }));
}
export function addValidationErrorNotification(title: string, message: string) {
    store.dispatch(actionNotificationError({ error: title, message }));
}
export function removeNotification(id: string) {
    store.dispatch(actionRemoveNotification(id));
}