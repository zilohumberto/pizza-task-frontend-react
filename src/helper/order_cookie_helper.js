const SECURITY_KEY_ORDER = "ORDER_ID_PIZZA";

export function setOrder(order) {
    localStorage.setItem(SECURITY_KEY_ORDER, JSON.stringify(order));
}

export function getOrder() {
    const data = localStorage.getItem(SECURITY_KEY_ORDER);
    return data !== null ? JSON.parse(data): null;
}

export function deleteOrder() {
    localStorage.removeItem(SECURITY_KEY_ORDER);
}