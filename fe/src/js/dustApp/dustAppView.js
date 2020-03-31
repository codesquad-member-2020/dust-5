import { getElement } from '../util/commonUtil.js';
import { DUST_APP_RULE } from '../constants/constant.js';

class DustAppView {
    constructor() {
        this.dustStateWrap = getElement('.dust-state-wrap');
        this.dustLocateEl = getElement('.dust-locate');
        this.dustStateEl = getElement('.dust-state');
        this.dustStateTextEl = getElement('.dust-state-text');
        this.dustStateIconEl = getElement('.dust-state-icon');
        this.dustTimelineGraph = getElement('.dust-timeline-graph');
    }

    updateDustState(currDustData, stationInfo) {
        this.dustLocateEl.innerHTML = `<b>${stationInfo}</b> 측정소 기준`;
        this.dustStateEl.innerHTML = `<b>${currDustData.pm10Value}</b> &micro;g/m³ ${currDustData.dataTime.slice(-DUST_APP_RULE.DATA_TIME_LENGTH)}`;
        this.dustStateWrap.style.background = `linear-gradient( to bottom, ${this.getGraphColor(currDustData)}, ${DUST_APP_RULE.BASE_COLOR} )`;
        this.updateDustStateSwitch(currDustData)
    }

    updateDustStateSwitch(currDustData) {
        switch (currDustData.pm10Grade1h) {
            case DUST_APP_RULE.GRADE.VALUE.GOOD: {
                this.dustStateTextEl.innerHTML = DUST_APP_RULE.GRADE.TEXT.GOOD;
                this.dustStateIconEl.innerHTML = DUST_APP_RULE.GRADE.ICON.GOOD;
            }
                break;
            case DUST_APP_RULE.GRADE.VALUE.NORMAL: {
                this.dustStateTextEl.innerHTML = DUST_APP_RULE.GRADE.TEXT.NORMAL;
                this.dustStateIconEl.innerHTML = DUST_APP_RULE.GRADE.ICON.NORMAL;
            }
                break;
            case DUST_APP_RULE.GRADE.VALUE.BAD: {
                this.dustStateTextEl.innerHTML = DUST_APP_RULE.GRADE.TEXT.BAD;
                this.dustStateIconEl.innerHTML = DUST_APP_RULE.GRADE.ICON.BAD;
            }
                break;
            case DUST_APP_RULE.GRADE.VALUE.VERY_BAD: {
                this.dustStateTextEl.innerHTML = DUST_APP_RULE.GRADE.TEXT.VERY_BAD;
                this.dustStateIconEl.innerHTML = DUST_APP_RULE.GRADE.ICON.VERY_BAD;
            }
                break;
        }
    }

    updateDustTimeLine(dustData) {
        this.dustTimelineGraph.innerHTML = dustData.reduce((acc, dustInfo) => {
            const graphWidth = dustInfo.pm10Value / 2 <= 100 ? dustInfo.pm10Value / 2 : 100;
            const graphColor = this.getGraphColor(dustInfo);
            acc += `<li>
                        <span class="dust-graph" style="width: ${graphWidth}%; background-color : ${graphColor}"></span>
                        <span class="dust-value">${dustInfo.pm10Value}</span>
                    </li>`
            return acc;
        }, '');
        this.highlightSelectDustData();
    }

    getGraphColor(dustInfo) {
        switch (dustInfo.pm10Grade1h) {
            case DUST_APP_RULE.GRADE.VALUE.GOOD: return DUST_APP_RULE.GRADE.COLOR.GOOD;
            case DUST_APP_RULE.GRADE.VALUE.NORMAL: return DUST_APP_RULE.GRADE.COLOR.NORMAL;
            case DUST_APP_RULE.GRADE.VALUE.BAD: return DUST_APP_RULE.GRADE.COLOR.BAD;
            case DUST_APP_RULE.GRADE.VALUE.VERY_BAD: return DUST_APP_RULE.GRADE.COLOR.VERY_BAD;
        }
    }

    highlightSelectDustData(currindex = 0, prevIndex = 1) {
        this.dustTimelineGraph.children[prevIndex].style.backgroundColor = DUST_APP_RULE.BASE_COLOR;
        this.dustTimelineGraph.children[currindex].style.backgroundColor = DUST_APP_RULE.SELECTED_GRAPH_COLOR;
    }
}

export default DustAppView;