import { getElement, addClass, removeClass } from '../util/commonUtil.js';
import { COMMON_RULE } from '../constants/constant.js';

class DustForecastView {
    constructor() {
        this.dustForecastImageSet = null;
        this.infoText = null;
        this.gradeText = null;
        this.progressButton = null;
        this.bar = null;
        this.barButton = null;
    }

    render() {
        getElement('.dust-contents-wrap').innerHTML +=
            `<div class="dust-forecast-wrap" data-name="예보" data-type="dust-forecast-content">
                <h2 class="dust-forecast-title">미세먼지 예보</h2>
                <div class="dust-forecast-image-set"></div>
                <div class="dust-forecast-progress">
                    <button title="모바일웹으로 변경 후 새로고침 해주세요! f12 -> ctrl + shift + m (Chrome)" class="progress-button">👉</button>
                    <div class="progress-bar">
                        <div class="bar"></div>
                        <div style="left: 0px;" class="bar-button"></div>
                    </div>
                </div>
                <div class="dust-forecast-info">
                    <p class="info-text"></p>
                    <p class="grade-text"></p>
                </div>
            </div>`
    }

    setViewElements() {
        this.dustForecastImageSet = getElement('.dust-forecast-image-set');
        this.infoText = getElement('.info-text');
        this.gradeText = getElement('.grade-text');
        this.progressButton = getElement('.progress-button');
        this.bar = getElement('.progress-bar .bar');
        this.barButton = getElement('.progress-bar .bar-button');
    }

    injectImgSet(imgData) {
        this.dustForecastImageSet.innerHTML = imgData.reduce((acc, imgUrl, index) => {
            acc += `<img class="${index === 0 ? COMMON_RULE.ACTIVE_KEY : ''}" src="${imgUrl}">`
            return acc;
        }, '');
    }

    injectInfoText(infoTextData, index = 0) {
        this.infoText.innerHTML = infoTextData[index];
    }

    injectGradeText(gradeTextData, index = 0) {
        this.gradeText.innerHTML = gradeTextData[index];
    }

    updateForecastImage(option) {
        removeClass(this.dustForecastImageSet.children[option.prevIndex], COMMON_RULE.ACTIVE_KEY);
        addClass(this.dustForecastImageSet.children[option.currIndex], COMMON_RULE.ACTIVE_KEY);
    }

    updateForecastBarButton(option) {
        if (parseInt(this.barButton.style.left) > option.imageRangeWidth * option.currIndex) return;
        if (option.currIndex !== 0) this.barButton.style.transition = '0.5s linear';
        this.barButton.style.left = option.imageRangeWidth * option.currIndex + "px";
    }

    resetForecastView(option) {
        option.currIndex = 0;
        this.barButton.style.left = '0px';
        removeClass(this.dustForecastImageSet.children[option.imagesLength - 1], COMMON_RULE.ACTIVE_KEY);
        addClass(this.dustForecastImageSet.children[option.currIndex], COMMON_RULE.ACTIVE_KEY);
    }
}

export default DustForecastView;