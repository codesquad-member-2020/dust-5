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

function clearTransition(target) {
    target.style.transition = '0s step-start';
}

function getDate(isIncludeHour) {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    if (!isIncludeHour) return year + (month[1] ? month : '0' + month[0]) + (day[1] ? day : '0' + day[0]);
    const hour = date.getHours();
    return year + (month[1] ? month : '0' + month[0]) + (day[1] ? day : '0' + day[0]) + (hour === 0 ? 24 : hour);
}

export {
    getElement,
    getElements,
    addClass,
    removeClass,
    clearTransition,
    getDate,
}