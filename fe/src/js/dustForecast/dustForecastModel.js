import { URL } from '../constants/url.js';

class DustForecastModel {
    constructor() {
        this.forecastImages = [];
        this.forecastInfoTexts = [];
        this.forecastGradeTexts = [];
    }

    getDustForecastData() {
        return fetch(URL.DEV.DUST_FORECAST_API)
            .then(res => res.json())
            .then(this.setDustForecastData.bind(this));
    }

    setDustForecastData(json) {
        json.contents.reverse().forEach(data => {
            this.forecastInfoTexts.push(data.informOverall);
            this.forecastGradeTexts.push(data.informGrade);
            if (!data.imageList.join('')) return;
            this.forecastImages.push(...data.imageList);
        });
    }
}

export default DustForecastModel;