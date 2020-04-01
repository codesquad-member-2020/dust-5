import { URL } from '../constants/url.js';

class DustForecastModel {
    constructor() {
        this.forecastData = null;
        this.forecastImages = [];
        this.forecastInfoTexts = [];
        this.forecastGradeTexts = [];
        this.dataLength = 0;
    }

    getDustForecastData() {
        return fetch(URL.DEV.DUST_FORECAST_API)
            .then(res => res.json())
            .then(json => {
                this.forecastData = json.contents.reverse();
                this.dataLength = this.forecastData.length;
                this.forecastData.forEach(data => {
                    this.forecastInfoTexts.push(data.informOverall);
                    this.forecastGradeTexts.push(data.informGrade);
                    this.forecastImages.push(...data.imageList);
                });
            });
    }
}

export default DustForecastModel;