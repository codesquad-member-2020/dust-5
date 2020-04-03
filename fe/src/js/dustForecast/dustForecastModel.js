import { getDate } from '../util/commonUtil.js';
import { URL } from '../constants/url.js';
import { LOCAL_STORAGE_KEY } from '../constants/constant.js';

class DustForecastModel {
    constructor() {
        this.forecastData = null;
        this.forecastImages = [];
        this.forecastInfoTexts = [];
        this.forecastGradeTexts = [];
        this.lastDataDate = localStorage.getItem(LOCAL_STORAGE_KEY.FORECAST_DATE);
    }

    getDustForecastData() {
        if (this.lastDataDate === getDate(false)) {
            this.getLocalStorageData();
            return;
        }
        return fetch(URL.DEV.DUST_FORECAST_API)
            .then(res => res.json())
            .then(this.setDustForecastData.bind(this));
    }

    setDustForecastData(json) {
        this.forecastData = json.contents.reverse();
        this.forecastData.forEach(data => {
            this.forecastInfoTexts.push(data.informOverall);
            this.forecastGradeTexts.push(data.informGrade);
            if (!data.imageList.join('')) return;
            this.forecastImages.push(...data.imageList);
        });
        this.setLocalStorageData();
    }

    setLocalStorageData() {
        localStorage.setItem(LOCAL_STORAGE_KEY.FORECAST_DATE, this.forecastData[0].informData.replace(/[-]/g, ''));
        localStorage.setItem(LOCAL_STORAGE_KEY.FORECAST_IMAGES, JSON.stringify(this.forecastImages));
        localStorage.setItem(LOCAL_STORAGE_KEY.FORECAST_OVERALL, JSON.stringify(this.forecastInfoTexts));
        localStorage.setItem(LOCAL_STORAGE_KEY.FORECAST_GRADE, JSON.stringify(this.forecastGradeTexts));
    }

    getLocalStorageData() {
        this.forecastImages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.FORECAST_IMAGES));
        this.forecastInfoTexts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.FORECAST_OVERALL));
        this.forecastGradeTexts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY.FORECAST_GRADE));
    }
}

export default DustForecastModel;