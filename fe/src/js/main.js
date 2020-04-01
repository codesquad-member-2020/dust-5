import DustMenu from './dustMenu/dustMenu.js';
import DustAppController from './dustApp/dustAppController.js';
import DustAppModel from './dustApp/dustAppModel.js';
import DustAppView from './dustApp/dustAppView.js';
import DustAppEventManager from './dustApp/dustAppEventManager.js';
import DustForecastView from './dustForecast/dustForecastView.js';

const dustMenu = new DustMenu();

const dustAppModel = new DustAppModel();
const dustAppView = new DustAppView();
const dustAppEventManager = new DustAppEventManager({ dustAppModel, dustAppView });
const dustAppController = new DustAppController({ dustAppModel, dustAppView, dustAppEventManager });

const dustForecastView = new DustForecastView();

function renderViews() {
    dustAppView.render();
    dustForecastView.render();
    dustAppView.setViewElements();
    dustMenu.init();
}

renderViews();
dustAppController.runDustApp();