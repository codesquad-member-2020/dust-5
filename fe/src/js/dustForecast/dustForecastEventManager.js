import { DUST_FORECAST_RULE } from '../constants/constant.js';

const option = {
    barWidth: 0,
    imagesLength: 0,
    imageRangeWidth: 0,
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
                requestAnimationFrame(this.playAnimation.bind(this, option.currIndex));
            }
                break;
            case DUST_FORECAST_RULE.STATE.PLAY.STATE_TEXT: {
                option.state = DUST_FORECAST_RULE.STATE.PAUSE.STATE_TEXT;
                this.dustForecastView.progressButton.innerHTML = DUST_FORECAST_RULE.STATE.PLAY.ICON;
                this.pauseAnimation();
            }
                break;
        }
    }

    resetAnimation() {
        this.dustForecastView.resetForecastView(option);
    }

    playAnimation(index) {
        if (index === option.imagesLength) {
            this.dustForecastView.barButton.style.transition = '0s step-start';
            setTimeout(this.resetAnimation.bind(this), DUST_FORECAST_RULE.IMAGE_CHANGE_INTERVAL);
            this.playSetTimeout = setTimeout(this.playAnimation.bind(this, option.currIndex), DUST_FORECAST_RULE.IMAGE_CHANGE_INTERVAL);
            return;
        }
        this.dustForecastView.updateForecastView(option, index);
        option.currIndex++;
        this.playSetTimeout = setTimeout(this.playAnimation.bind(this, option.currIndex), DUST_FORECAST_RULE.IMAGE_CHANGE_INTERVAL);
    }

    pauseAnimation() {
        clearTimeout(this.playSetTimeout);
    }
}

export default DustForecastEventManager;