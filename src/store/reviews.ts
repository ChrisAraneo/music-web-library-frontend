import Review from "../model/Review";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";
import { addSuccessNotification } from "./fetching";
import { API_URI } from "../config";

// DEFAULT STATE
const defaultState: Array<Review> = [];

// ACTION TYPES
const SET_REVIEW = "SET_REVIEW";
const SET_REVIEWS = "SET_REVIEWS";
const DELETE_REVIEW = "DELETE_REVIEW";

// ACTION CREATORS
const actionSetReview = (review: Review) => ({
    type: SET_REVIEW,
    review
});
const actionSetReviews = (reviews: Review[]) => ({
    type: SET_REVIEWS,
    reviews
});
const actionDeleteReview = (id: number) => ({
    type: DELETE_REVIEW,
    id
});

// REDUCER
export default function reducer(
    state = defaultState,
    action: any
) {
    switch (action.type) {
        case SET_REVIEW: {
            const { review } = action;
            return setSingleObject(state, review, review.reviewID);
        }
        case SET_REVIEWS: {
            const { reviews } = action;
            return setMultipleObjects(state, reviews, "reviewID");
        }
        case DELETE_REVIEW: {
            return deleteSingleObject(state, action.id);
        }
        default: {
            return state;
        }
    }
}

// PUBLIC ASYNC FUNCTIONS TO USE 
export function getReviewList() {
    store.dispatch(requestGet(`${API_URI}/reviews`, actionSetReviews));
}
export function getReview(reviewID: number) {
    store.dispatch(requestGet(`${API_URI}/reviews/${reviewID}`, actionSetReview));
}
export function postReview(albumID: number, title: string, content: string, captcha: string, successCallback?: any) {
    const body: any = {
        title,
        content
    };

    store.dispatch(requestPost(
        `${API_URI}/reviews/${albumID}`,
        {
            headers: {
                "Captcha-Response": captcha
            },
            body: JSON.stringify(body)
        },
        (result) => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            addSuccessNotification("Opublikowano recenzję", "Pomyślnie opublikowano recenzję albumu muzycznego");
            return actionSetReview(result);
        })
    );
}
export function updateReview(review: Review, captcha: string, successCallback: any) {
    const body: any = {
        'reviewID': review?.reviewID,
        'title': review?.title,
        'content': review?.content,
        'album': review?.album
    };

    if (review?.user?.userID) {
        body['user'] = review?.user?.userID;
    }

    store.dispatch(requestPut(
        `${API_URI}/reviews/${review?.reviewID}`,
        {
            headers: {
                "Captcha-Response": captcha
            },
            body: JSON.stringify(body)
        },
        (result) => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            addSuccessNotification("Zapisano zmiany", "Pomyślnie zapisano zmiany.");
            return actionSetReview(result);
        })
    );
}
export function deleteReview(reviewID: number, successCallback: any) {
    store.dispatch(requestDelete(
        `${API_URI}/reviews/${reviewID}`,
        {},
        () => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            return actionDeleteReview(reviewID);
        })
    );
}