const ALERT_MESSAGE = {
    NOT_FOUND_LOCATION: '위치 정보를 조회할 수 없습니다.',
    FIND_LOCATION_FAILURE: '데이터 조회에 실패 했습니다.',
}

const LOCAL_STORAGE_KEY = {
    PREV_DUST_DATA: 'PREV_DUST_DATA_KEY',
    DUST_DATA: 'DUST_DATA_',
    DUST_STATION: 'DUST_STATION',
}

const COMMON_RULE = {
    ACTIVE_KEY: 'active',
}

const DUST_MENU_RULE = {
    SELECTED_MENU_COLOR: '#c3e4fd',
}

const DUST_APP_RULE = {
    UPDATE_MINUTE: 15,
    DATA_TIME_LENGTH: 11,
    GRADE: {
        VALUE: {
            GOOD: '1',
            NORMAL: '2',
            BAD: '3',
            VERY_BAD: '4'
        },
        TEXT: {
            GOOD: '좋음',
            NORMAL: '보통',
            BAD: '나쁨',
            VERY_BAD: '매우 나쁨',
            ERROR: '측정 데이터가 없습니다.',
        },
        ICON: {
            GOOD: '😄',
            NORMAL: '🙂',
            BAD: '😷',
            VERY_BAD: '😡',
            ERROR: '🤔',
        },
        COLOR: {
            GOOD: '#32a1ff',
            NORMAL: '#00c73c',
            BAD: '#fd9b5a',
            VERY_BAD: '#ff5959',
            ERROR: '#a9a9a9',
        }
    },
    BASE_COLOR: '#fff',
    SELECTED_GRAPH_COLOR: '#ffe9f4',
}

const DUST_FORECAST_RULE = {
    IMAGE_CHANGE_INTERVAL: 500,
    STATE: {
        PLAY: {
            STATE_TEXT: 'PLAY',
            ICON: '👉',
        },
        PAUSE: {
            STATE_TEXT: 'PAUSE',
            ICON: '✊',
        }
    }
}

export {
    ALERT_MESSAGE,
    LOCAL_STORAGE_KEY,
    COMMON_RULE,
    DUST_MENU_RULE,
    DUST_APP_RULE,
    DUST_FORECAST_RULE,
};