class DustForecastContoller {
    constructor(module) {
        this.dustForecastModel = module.dustForecastModel;
        this.dustForecastView = module.dustForecastView;
        this.dustForecastEventManager = module.dustForecastEventManager;
    }

    runDustForecast() {
        this.injectDustForecastData();
    }

    async injectDustForecastData() {
        await this.dustForecastModel.getDustForecastData();
        this.dustForecastView.injectImgSet(this.dustForecastModel.forecastImages);
        this.dustForecastView.updateInfoText(this.dustForecastModel.forecastInfoTexts);
        this.dustForecastView.updateGradeText(this.dustForecastModel.forecastGradeTexts);
    }
}

export default DustForecastContoller;