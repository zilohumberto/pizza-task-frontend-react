const SECURITY_KEY = "PIZZA";

export function setToken(token) {
    localStorage.setItem(SECURITY_KEY, token);
}

export function getToken() {
    return localStorage.getItem(SECURITY_KEY);
}

export function deleteToken() {
    localStorage.removeItem(SECURITY_KEY);
}