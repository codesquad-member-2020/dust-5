import DustMenu from './dustMenu/dustMenu.js';
import DustAppModel from './dustApp/dustAppModel.js';
import DustAppView from './dustApp/dustAppView.js';
import DustAppEventManager from './dustApp/dustAppEventManager.js';
import DustAppController from './dustApp/dustAppController.js';
import DustForecastModel from './dustForecast/dustForecastModel.js';
import DustForecastView from './dustForecast/dustForecastView.js';
import DustForecastEventManager from './dustForecast/dustForecastEventManager.js';
import DustForecastController from './dustForecast/dustForecastController.js';

const dustMenu = new DustMenu();

const dustAppModel = new DustAppModel();
const dustAppView = new DustAppView();
const dustAppEventManager = new DustAppEventManager({ dustAppModel, dustAppView });
const dustAppController = new DustAppController({ dustAppModel, dustAppView, dustAppEventManager });

const dustForecastModel = new DustForecastModel();
const dustForecastView = new DustForecastView();
const dustForecastEventManager = new DustForecastEventManager({ dustForecastModel, dustForecastView });
const dustForecastController = new DustForecastController({ dustForecastModel, dustForecastView, dustForecastEventManager });

function renderViews() {
    dustAppView.render();
    dustForecastView.render();
    dustAppView.setViewElements();
    dustForecastView.setViewElements();
    dustMenu.init();
}

(function main() {
    renderViews();
    dustAppController.runDustApp();
    dustForecastController.runDustForecast();
})();