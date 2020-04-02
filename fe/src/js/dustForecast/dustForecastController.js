class DustForecastContoller {
    constructor(module) {
        this.dustForecastModel = module.dustForecastModel;
        this.dustForecastView = module.dustForecastView;
        this.dustForecastEventManager = module.dustForecastEventManager;
    }

    async runDustForecast() {
        await this.injectDustForecastData();
        this.dustForecastEventManager.init();
    }

    async injectDustForecastData() {
        await this.dustForecastModel.getDustForecastData();
        this.dustForecastView.injectImgSet(this.dustForecastModel.forecastImages);
        this.dustForecastView.injectInfoText(this.dustForecastModel.forecastInfoTexts);
        this.dustForecastView.injectGradeText(this.dustForecastModel.forecastGradeTexts);
    }
}

export default DustForecastContoller;