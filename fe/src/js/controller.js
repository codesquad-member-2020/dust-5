import { ALERT_MESSAGE, DUST_APP_RULE } from './constants/constant.js';

class Controller {
    constructor(module) {
        this.dustAppModel = module.dustAppModel;
        this.dustAppView = module.dustAppView;
        this.dustAppEventManager = module.dustAppEventManager;
    }

    runDustApp() {
        if (navigator.geolocation) {
            navigator.geolocation
                .getCurrentPosition(this.findLocationSuccess.bind(this), this.findLocationFailure, { enableHighAccuracy: true, maximumAge: 0, timeout: Infinity });
        }
        else alert(ALERT_MESSAGE.NOT_FOUND_LOCATION);
    }

    async findLocationSuccess(position) {
        if (this.checkExistDustData()) return;
        this.checkExistPrevDustData();
        if (this.checkDustDataUpdateTime()) return;

        const stationInfoApiUrl = await this.dustAppModel.getStationInfoApiUrl(position);
        const dustInfoApiUrl = await this.dustAppModel.getDustInfoApiUrl(stationInfoApiUrl);
        await this.dustAppModel.getDustData(dustInfoApiUrl);
        this.updateDustAppView();
    }

    checkExistDustData() {
        if (!this.dustAppModel.dustData) return false;
        this.updateDustAppView();
        return true;
    }

    checkExistPrevDustData() {
        const prevDustData = JSON.parse(localStorage.getItem(this.dustAppModel.prevDustDataKey));
        if (!prevDustData) return;
        this.dustAppModel.registerData(prevDustData);
        this.updateDustAppView();
    }

    checkDustDataUpdateTime() {
        if (this.dustAppModel.dustData && new Date().getMinutes() < DUST_APP_RULE.UPDATE_MINUTE) return true;
        return false;
    }

    updateDustAppView() {
        this.dustAppView.updateDustState(this.dustAppModel.displayDustData, this.dustAppModel.stationInfo);
        this.dustAppView.updateDustTimeLine(this.dustAppModel.dustData);
        this.addDustAppEvent();
    }

    addDustAppEvent() {
        this.dustAppEventManager.addDustTimelineGraphTouchEvent();
    }

    findLocationFailure() {
        alert(ALERT_MESSAGE.FIND_LOCATION_FAILURE);
    }
}

export default Controller;