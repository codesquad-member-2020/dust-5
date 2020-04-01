const option = {
    startPoint: 0,
    endPoint: 0,
    currSelectDataIndex: 0,
    prevSelectDataIndex: 0,
    prevDirection: 0
}

class DustAppEventManager {
    constructor(module) {
        this.dustAppModel = module.dustAppModel;
        this.dustAppView = module.dustAppView;
    }

    init() {
        this.dustAppView.dustTimelineGraph.addEventListener('touchstart', this.touchstartHandle);
        this.dustAppView.dustTimelineGraph.addEventListener('touchmove', this.touchmoveHandle.bind(this));
        this.dustAppView.dustTimelineGraph.addEventListener('touchend', this.touchendHandle);
    }
    touchstartHandle(evt) {
        option.startPoint = evt.touches[0].clientY;
    }

    touchmoveHandle(evt) {
        option.endPoint = evt.touches[0].clientY;
        const direction = parseInt((option.startPoint - option.endPoint) / 10);
        option.prevSelectDataIndex = option.currSelectDataIndex;
        if (direction > option.prevDirection) {
            option.currSelectDataIndex += 1;
            option.currSelectDataIndex >= this.dustAppModel.dustData.length - 1 ? option.currSelectDataIndex = this.dustAppModel.dustData.length - 1 : option.currSelectDataIndex;
        } else if (direction < option.prevDirection) {
            option.currSelectDataIndex -= 1;
            option.currSelectDataIndex <= 0 ? option.currSelectDataIndex = 0 : option.currSelectDataIndex;
        }
        option.prevDirection = direction;
        this.changeDisplayDustData();
    }

    changeDisplayDustData() {
        this.dustAppModel.registerData(this.dustAppModel.dustData, option.currSelectDataIndex);
        this.dustAppView.updateDustState(this.dustAppModel.displayDustData, this.dustAppModel.stationInfo);
        this.dustAppView.highlightSelectDustData(option.currSelectDataIndex, option.prevSelectDataIndex);
    }

    touchendHandle() {
        option.prevDirection = 0;
    }
}

export default DustAppEventManager;