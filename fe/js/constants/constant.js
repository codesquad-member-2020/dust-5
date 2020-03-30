const ALERT_MESSAGE = {
    NOT_FOUND_LOCATION: '위치 정보를 조회할 수 없습니다.',
    FIND_LOCATION_FAILURE: '데이터 조회에 실패 했습니다.',
}

const LOCAL_STORAGE_KEY = {
    PREV_DUST_DATA: 'PREV_DUST_DATA_KEY',
    DUST_DATA: 'DUST_DATA_',
    DUST_STATION: 'DUST_STATION',
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
            VERY_BAD: '매우 나쁨'
        },
        ICON: {
            GOOD: '😄',
            NORMAL: '🙂',
            BAD: '😷',
            VERY_BAD: '👿'
        },
        COLOR: {
            GOOD: '#32a1ff',
            NORMAL: '#00c73c',
            BAD: '#fd9b5a',
            VERY_BAD: '#ff5959'
        }
    },
    BASE_GRAPH_COLOR: '#fff',
    SELECTED_GRAPH_COLOR: '#ff696125',
}

export {
    ALERT_MESSAGE,
    DUST_APP_RULE,
    LOCAL_STORAGE_KEY,
};