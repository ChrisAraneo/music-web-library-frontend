import { AppActions } from "../actions/merge";
import { fetchPending, fetchSuccess, fetchError } from "../actions/fetching";

export default function fetchData(
    url: string,
    actionSuccess: (arg: any) => AppActions,
    // actionError: (arg: AppActions) => any
) {
    console.log("FetchData...")
    return (dispatch: any) => {
        dispatch(fetchPending());
        fetch(url)
            .then(result => result.json())
            .then(result => {
                if (result.error) {
                    throw (result.error);
                }
                dispatch(fetchSuccess());
                dispatch(actionSuccess(result));
                return result;
            })
            .catch(error => {
                dispatch(fetchError(error));
                // dispatch(actionError(error));
            })
    }
}