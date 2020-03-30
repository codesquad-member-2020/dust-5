import Controller from './controller.js';
import DustAppModel from './dustApp/dustAppModel.js';
import DustAppView from './dustApp/dustAppView.js';
import DustAppEventManager from './dustApp/dustAppEventManager.js';

const dustAppModel = new DustAppModel();
const dustAppView = new DustAppView();
const dustAppEventManager = new DustAppEventManager({ dustAppModel, dustAppView });
const controller = new Controller({ dustAppModel, dustAppView, dustAppEventManager });

controller.runDustApp();