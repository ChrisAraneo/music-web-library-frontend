import Review from "../model/Review";
import { requestGet, requestPut, requestDelete, requestPost } from "../service/requests";
import { store } from './index';
import { setSingleObject, setMultipleObjects, deleteSingleObject } from "./functions";
import Album from "../model/Album";
import User from "../model/User";

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
    store.dispatch(requestGet(`http://localhost:8080/api/reviews`, actionSetReviews));
}
export function getReview(id: number) {
    store.dispatch(requestGet(`http://localhost:8080/api/reviews/${id}`, actionSetReview));
}
export function postReview(albumID: number, title: string, content: string, captcha: string, successCallback?: any) {
    const details: any = {
        'title': title,
        'content': content
    };

    let formBody = [];
    for (const property in details) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    store.dispatch(requestPost(
        `http://localhost:8080/api/reviews/${albumID}`,
        {
            headers: {
                "Content-Type": `application/x-www-form-urlencoded; charset=UTF-8`,
                "Captcha-Response": captcha
            },
            body: formBody.join("&")
        },
        (result) => {
            if (typeof successCallback === "function") {
                successCallback();
            }
            return actionSetReview(result);
        })
    );
}
export function updateReview(id: number) {
    store.dispatch(requestPut(`http://localhost:8080/api/reviews/${id}`, {}, actionSetReview));
}
export function deleteReview(id: number) {
    store.dispatch(requestDelete(`http://localhost:8080/api/reviews/${id}`, {},
        () => actionDeleteReview(id)));
}