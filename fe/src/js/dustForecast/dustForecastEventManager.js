import { DUST_FORECAST_RULE } from '../constants/constant.js';

const option = {
    barWidth: 0,
    imagesLength: 0,
    imageRangeWidth: 0,
    prevIndex: 0,
    currIndex: 0,
    state: DUST_FORECAST_RULE.STATE.PAUSE.STATE_TEXT,
}

class DustForecastEventManager {
    constructor(module) {
        this.dustForecastModel = module.dustForecastModel;
        this.dustForecastView = module.dustForecastView;
        this.playSetTimeout = null;
    }

    init() {
        this.setOptions();
        this.dustForecastView.bar.style.width = option.barWidth - (option.imageRangeWidth / 2) + 'px';
        this.dustForecastView.progressButton.addEventListener('touchend', this.touchendEventHandle.bind(this));
        this.dustForecastView.barButton.addEventListener('touchmove', this.touchmoveEventHandle.bind(this));
    }

    setOptions() {
        option.barWidth = this.dustForecastView.bar.offsetWidth;
        option.imagesLength = this.dustForecastModel.forecastImages.length;
        option.imageRangeWidth = parseInt(option.barWidth / option.imagesLength);
    }

    touchendEventHandle() {
        switch (option.state) {
            case DUST_FORECAST_RULE.STATE.PAUSE.STATE_TEXT: {
                option.state = DUST_FORECAST_RULE.STATE.PLAY.STATE_TEXT;
                this.dustForecastView.progressButton.innerHTML = DUST_FORECAST_RULE.STATE.PAUSE.ICON;
                requestAnimationFrame(this.playAnimation.bind(this));
            }
                break;
            case DUST_FORECAST_RULE.STATE.PLAY.STATE_TEXT: {
                option.state = DUST_FORECAST_RULE.STATE.PAUSE.STATE_TEXT;
                this.dustForecastView.progressButton.innerHTML = DUST_FORECAST_RULE.STATE.PLAY.ICON;
                clearTimeout(this.playSetTimeout);
                this.dustForecastView.clearTransition(this.dustForecastView.barButton);
            }
                break;
        }
    }

    touchmoveEventHandle({ target, changedTouches }) {
        if (option.state !== DUST_FORECAST_RULE.STATE.PAUSE.STATE_TEXT) return;
        const clientX = changedTouches[0].clientX - this.dustForecastView.bar.getBoundingClientRect().left;
        let toLeft = 0;
        toLeft = Math.min(option.imageRangeWidth * (option.imagesLength - 1), Math.max(clientX, 0));
        target.style.left = toLeft + "px";

        option.prevIndex = option.currIndex;
        option.currIndex = parseInt(toLeft / option.imageRangeWidth);
        this.dustForecastView.updateForecastImage(option);
    }

    resetAnimation() {
        this.dustForecastView.resetForecastView(option);
    }

    playAnimation() {
        if (option.currIndex === option.imagesLength) {
            this.dustForecastView.clearTransition(this.dustForecastView.barButton);
            setTimeout(this.resetAnimation.bind(this), DUST_FORECAST_RULE.IMAGE_CHANGE_INTERVAL);
            this.playSetTimeout = setTimeout(this.playAnimation.bind(this), DUST_FORECAST_RULE.IMAGE_CHANGE_INTERVAL);
            return;
        }
        this.dustForecastView.updateForecastImage(option);
        this.dustForecastView.updateForecastBarButton(option);
        option.prevIndex = option.currIndex;
        option.currIndex++;
        this.playSetTimeout = setTimeout(this.playAnimation.bind(this), DUST_FORECAST_RULE.IMAGE_CHANGE_INTERVAL);
    }
}

export default DustForecastEventManager;