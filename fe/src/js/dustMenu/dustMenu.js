import { getElement, addClass, removeClass } from '../util/commonUtil.js';
import { COMMON_RULE, DUST_MENU_RULE } from '../constants/constant.js';

class DustMenu {
    constructor() {
        this.dustContentsWrap = getElement('.dust-contents-wrap');
        this.currSelectContent = null;
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
        const firstContentStyle = `style="background-color: ${DUST_MENU_RULE.SELECTED_MENU_COLOR};"`
        return [...this.dustContentsWrap.children].reduce((acc, content, index) => {
            if (index === 0) this.currSelectContent = content.getAttribute('data-type');
            acc += `<li ${index === 0 ? firstContentStyle : ''} data-type="${content.getAttribute('data-type')}">${content.getAttribute('data-name')}</li>`;
            return acc;
        }, '');
    }

    addMenuClickEvent() {
        getElement('.dust-menu-nav').addEventListener('click', this.menuClickEventDelegation.bind(this));
    }

    menuClickEventDelegation({ target }) {
        this.changeMenuHighlight(target);
        this.changeActiveContent(target);
        this.currSelectContent = target.getAttribute('data-type');
    }

    changeMenuHighlight(target) {
        if (this.currSelectContent === target.getAttribute('data-type')) return;
        [...target.parentElement.children].forEach(menu => {
            if (!menu.style.backgroundColor) menu.style.backgroundColor = DUST_MENU_RULE.SELECTED_MENU_COLOR;
            else menu.style.backgroundColor = '';
        });
    }

    changeActiveContent(target) {
        [...this.dustContentsWrap.children].forEach(content => {
            if (content.classList.contains(COMMON_RULE.ACTIVE_KEY)) removeClass(content, COMMON_RULE.ACTIVE_KEY);
            if (target.getAttribute('data-type') === content.getAttribute('data-type')) addClass(content, COMMON_RULE.ACTIVE_KEY);
        });
    }
}

export default DustMenu;