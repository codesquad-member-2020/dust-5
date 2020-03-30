export function getElement(target) {
    return document.querySelector(target);
}

export function getElements(target) {
    return document.querySelectorAll(target);
}

export function addClass(target, className) {
    target.classList.add(className);
}

export function removeClass(target, className) {
    target.classList.remove(className);
}