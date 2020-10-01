import { HOST } from '../constants';
import { normalizeRooms } from '../utils';
import { SET_PAYMENT } from './user';

export const SET_LISTINGS = 'SET_LISTINGS';

export function setListings(rooms) {
    return {
        type: SET_LISTINGS,
        rooms,
    }
}

export function getListings() {
    return (dispatch, getState) => {
        const accessToken = getState().user.accessToken;

        return fetch(`${HOST}/api/v1/listings?access_token=${accessToken}`)
        .then(response => response.json())
        .then(json => {
            if (json.is_success) {
                dispatch(setListings(normalizeRooms(json.rooms)));
            } else {
                alert(json.error);
            }
        })
        .catch(e => alert(e));
    }
}