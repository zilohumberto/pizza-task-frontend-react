import { url_users_user } from '../constants/api_url'
import {deleteOrder} from './order_cookie_helper'

const SECURITY_KEY_TOKEN = "TOKEN_PIZZA";

export function setToken(token, User) {
    const data = {token, User}
    localStorage.setItem(SECURITY_KEY_TOKEN, JSON.stringify(data));
}

export function getToken() {
    const data = localStorage.getItem(SECURITY_KEY_TOKEN);
    return data !== null ? JSON.parse(data): null;
}

export function deleteToken() {
    localStorage.removeItem(SECURITY_KEY_TOKEN);
    deleteOrder()
    window.location.reload(false);
}


export function validateToken(token) {

    return new Promise((resolve, reject) => {
        fetch(url_users_user,
        {
            method: 'get', 
            headers: new Headers({
                'Authorization': `Token  ${token}`,
                'Content-Type': 'application/json'
            }), 
        })                   
        .then(res => res.json())
        .catch(error => {
            reject(null);
        })
        .then(data => {
            if(data[0] !== null) {
                resolve(data[0]);
            } else {
                reject(null);
            }
            
        })
    })
}

