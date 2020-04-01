import { getElement, addClass, removeClass } from '../util/commonUtil.js';

class DustMenu {
    constructor() {
        this.dustContentsWrap = getElement('.dust-contents-wrap');
    }

    init() {
        this.render();
        this.addMenuClickEvent();
    }

    render() {
        getElement('.dust-menu-wrap').innerHTML =
            `<div class="dust-menu-wrap">
                <ul class="dust-menu-nav">
                    ${this.getContentsMenuList()}
                </ul>
            </div>`;
    }

    getContentsMenuList() {
        return [...this.dustContentsWrap.children].reduce((acc, content) => {
            acc += `<li data-type="${content.getAttribute('data-type')}">${content.getAttribute('data-name')}</li>`;
            return acc;
        }, '');
    }

    addMenuClickEvent() {
        getElement('.dust-menu-nav').addEventListener('click', this.menuClickEventDelegation.bind(this));
    }

    menuClickEventDelegation({ target }) {
        [...this.dustContentsWrap.children].forEach(content => {
            if (content.classList.contains('active')) removeClass(content, 'active');
            if (target.getAttribute('data-type') === content.getAttribute('data-type')) addClass(content, 'active');
        })
    }
}

export default DustMenu;