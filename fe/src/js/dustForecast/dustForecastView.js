import { getElement } from '../util/commonUtil.js';
import { COMMON_RULE } from '../constants/constant.js';

class DustForecastView {
    constructor() {
        this.dustForecastImgSet = null;
        this.infoText = null;
        this.gradeText = null;
    }

    render() {
        getElement('.dust-contents-wrap').innerHTML +=
            `<div class="dust-forecast-wrap" data-name="예보" data-type="dust-forecast-content">
                <h2 class="dust-forecast-title">미세먼지 예보</h2>
                <div class="dust-forecast-img-set"></div>
                <div class="dust-forecast-progress">
                    <button class="progress-button">▶</button>
                    <div class="progress-bar">
                        <div class="bar"></div>
                        <div class="bar-button"></div>
                    </div>
                </div>
                <div class="dust-forecast-info">
                    <p class="info-text"></p>
                    <p class="grade-text"></p>
                </div>
            </div>`
    }

    setViewElements() {
        this.dustForecastImgSet = getElement('.dust-forecast-img-set');
        this.infoText = getElement('.info-text');
        this.gradeText = getElement('.grade-text');
    }

    injectImgSet(imgData) {
        this.dustForecastImgSet.innerHTML = imgData.reduce((acc, imgUrl, index) => {
            acc += `<img class="${index === 0 ? COMMON_RULE.ACTIVE_KEY : ''}" src="${imgUrl}">`
            return acc;
        }, '');
    }

    updateInfoText(infoTextData, index = 0) {
        this.infoText.innerHTML = infoTextData[index];
    }

    updateGradeText(gradeTextData, index = 0) {
        this.gradeText.innerHTML = gradeTextData[index];
    }
}

export default DustForecastView;