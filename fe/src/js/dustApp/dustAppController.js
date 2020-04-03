import { ALERT_MESSAGE, DUST_APP_RULE } from '../constants/constant.js';

class DustAppController {
    constructor(module) {
        this.dustAppModel = module.dustAppModel;
        this.dustAppView = module.dustAppView;
        this.dustAppEventManager = module.dustAppEventManager;
    }

    runDustApp() {
        this.dustAppModel.init();
        this.dustAppEventManager.init();
        this.traceUserLocation();
    }

    traceUserLocation() {
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

        await this.dustAppModel.getDustData(position);
        this.updateDustAppView();
    }

    async findLocationFailure() {
        // alert(ALERT_MESSAGE.FIND_LOCATION_FAILURE);
        if (this.checkExistDustData()) return;
        this.checkExistPrevDustData();
        if (this.checkDustDataUpdateTime()) return;

        const position = {
            coords: {
                longitude: '127.033353',
                latitude: '37.491076',
            }
        }
        await this.dustAppModel.getDustData(position);
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
        if (this.checkDatakeyCondition() && new Date().getMinutes() < DUST_APP_RULE.UPDATE_MINUTE) return true;
        return false;
    }

    checkDatakeyCondition() {
        const prevDustDataKey = this.dustAppModel.prevDustDataKey;
        if (!prevDustDataKey) return false;

        const dustDatakey = this.dustAppModel.dustDataKey;
        const baseKeyLength = 10;
        if (dustDatakey.substr(baseKeyLength) - prevDustDataKey.substr(baseKeyLength) === 1) return true;
        return false;
    }

    updateDustAppView() {
        this.dustAppView.updateDustState(this.dustAppModel.displayDustData, this.dustAppModel.stationInfo);
        this.dustAppView.updateDustTimeLine(this.dustAppModel.dustData);
    }

    addDustAppEvent() {
        this.dustAppEventManager.addDustTimelineGraphTouchEvent();
    }
}

export default DustAppController;