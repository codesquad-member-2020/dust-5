import { URL, API_KEY } from '../constants/url.js';
import { LOCAL_STORAGE_KEY } from '../constants/constant.js';

class DustAppModel {
    constructor() {
        this.dustData = null;
        this.displayDustData = null;
        this.stationInfo = null;
        this.dustDataKey = null;
        this.prevDustDataKey = localStorage.getItem(LOCAL_STORAGE_KEY.PREV_DUST_DATA);
        this.init();
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

    getStationInfoApiUrl(position) {
        return fetch(`${URL.DEV.KAKAO_TRANS_COORDINATE_API}?x=${position.coords.longitude}&y=${position.coords.latitude}&input_coord=WGS84&output_coord=TM`, { headers: { Authorization: API_KEY.DEV.KAKAO_API_KEY } })
            .then(res => res.json())
            .then(this.returnStationInfoApiUrl);
    }

    returnStationInfoApiUrl(json) {
        const [transCoord] = json.documents;
        return `${URL.DEV.MEASURING_STATION_API}?tmX=${transCoord.x}&tmY=${transCoord.y}${API_KEY.DEV.SERVICE_KEY}`;
    }

    getDustInfoApiUrl(stationInfoApiUrl) {
        return fetch(URL.DEV.CORS_API + stationInfoApiUrl)
            .then(res => res.json())
            .then(this.returnDustInfoApiUrl);
    }

    returnDustInfoApiUrl(json) {
        const [location] = json.list;
        localStorage.setItem(`DUST_STATION`, location.stationName);
        return `${URL.DEV.DUST_INFO_API}?stationName=${location.stationName}&dataTerm=month&pageNo=1&numOfRows=25${API_KEY.DEV.SERVICE_KEY}`
    }

    getDustData(dustInfoApiUrl) {
        return fetch(URL.DEV.CORS_API + dustInfoApiUrl)
            .then(res => res.json())
            .then(this.setDustData.bind(this));
    }

    setDustData(json) {
        this.registerData(json.list);
        localStorage.removeItem(this.prevDustDataKey);
        localStorage.setItem(LOCAL_STORAGE_KEY.PREV_DUST_DATA, `${this.dustDataKey}`);
        localStorage.setItem(`${this.dustDataKey}`, JSON.stringify(json.list));
    }
}

export default DustAppModel;