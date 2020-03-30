function getElement(target) {
    return document.querySelector(target);
}

function getElements(target) {
    return document.querySelectorAll(target);
}

function addClass(target, className) {
    target.classList.add(className);
}

function removeClass(target, className) {
    target.classList.remove(className);
}

export {
    getElement,
    getElements,
    addClass,
    removeClass,
}