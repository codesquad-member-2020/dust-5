import { getElements, addClass, removeClass } from '../util/commonUtil.js';
import { COMMON_RULE, DUST_FORECAST_RULE } from '../constants/constant.js';

const option = {
    barWidth: 0,
    imagesLength: 0,
    imageRangeWidth: 0,
}

class DustForecastEventManager {
    constructor(module) {
        this.dustForecastModel = module.dustForecastModel;
        this.dustForecastView = module.dustForecastView;
    }

    init() {
        option.barWidth = this.dustForecastView.bar.offsetWidth
        option.imagesLength = this.dustForecastModel.forecastImages.length;
        option.imageRangeWidth = parseInt(option.barWidth / option.imagesLength);
        this.dustForecastView.progressButton.addEventListener('touchend', () => {
            this.resetImageActive();
            requestAnimationFrame(this.runAnimation.bind(this, 1));
        });
    }

    runAnimation(idx) {
        if (idx === option.imagesLength) return;
        removeClass(this.dustForecastView.dustForecastImgSet.children[idx - 1], COMMON_RULE.ACTIVE_KEY);
        addClass(this.dustForecastView.dustForecastImgSet.children[idx], COMMON_RULE.ACTIVE_KEY);

        setTimeout(() => {
            requestAnimationFrame(this.runAnimation.bind(this, ++idx));
        }, DUST_FORECAST_RULE.IMAGE_CHANGE_INTERVAL)
    }

    resetImageActive() {
        getElements('.dust-forecast-img-set img').forEach(img => {
            if (!img.classList.contains(COMMON_RULE.ACTIVE_KEY)) return;
            removeClass(img, COMMON_RULE.ACTIVE_KEY);
        });
    }
}

export default DustForecastEventManager;