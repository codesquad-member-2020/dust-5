import { URL } from '../constants/url.js';
import { LOCAL_STORAGE_KEY } from '../constants/constant.js';

class DustAppModel {
    constructor() {
        this.dustData = null;
        this.displayDustData = null;
        this.stationInfo = null;
        this.dustDataKey = null;
        this.prevDustDataKey = localStorage.getItem(LOCAL_STORAGE_KEY.PREV_DUST_DATA);
    }

    init() {
        this.makeDustDataKey();
        const dustData = JSON.parse(localStorage.getItem(this.dustDataKey));
        this.registerData(dustData);
    }

    makeDustDataKey() {
        this.dustDataKey = `${LOCAL_STORAGE_KEY.DUST_DATA}${this.getDatakeyDate()}`;
    }

    getDatakeyDate() {
        const date = new Date();
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString();
        const day = date.getDate().toString();
        const hour = date.getHours();
        return year + (month[1] ? month : '0' + month[0]) + (day[1] ? day : '0' + day[0]) + (hour === 0 ? 24 : hour);
    }

    registerData(data, displayDataIndex = 0) {
        this.dustData = data;
        this.displayDustData = data ? data[displayDataIndex] : null;
        this.stationInfo = data ? localStorage.getItem(LOCAL_STORAGE_KEY.DUST_STATION) : null;
    }

    getDustData(position) {
        return fetch(`${URL.DEV.DUST_INFO_API}x=${position.coords.longitude}&y=${position.coords.latitude}`)
            .then(res => res.json())
            .then(this.setDustData.bind(this));
    }

    setDustData(json) {
        this.registerData(json.contents.forecast);
        localStorage.removeItem(this.prevDustDataKey);
        localStorage.setItem(LOCAL_STORAGE_KEY.DUST_STATION, json.contents.station);
        localStorage.setItem(LOCAL_STORAGE_KEY.PREV_DUST_DATA, `${this.dustDataKey}`);
        localStorage.setItem(`${this.dustDataKey}`, JSON.stringify(json.contents.forecast));
    }
}

export default DustAppModel;