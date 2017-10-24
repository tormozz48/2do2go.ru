import {createStore} from 'redux';
import {combineForms} from 'react-redux-form';

const outputInitialState = {value: 'No Data'};

const outputReducer = (state = outputInitialState, payload) => {
    switch(payload.type) {
        case 'DATA_LOADED': {
            const {data, type} = payload.response;
            return {data, type};
        }
        case 'DATA_ERROR': {
            return {data: payload.error};
        }
        default: {
            return state;
        }
    }
};

export default createStore(combineForms({
    search: {
        url: 'http://www.reddit.com/r/javascript/.json',
        sort: {
            field: 'count',
            direction: 'desc'
        },
        output: {type: 'csv'}
    },
    output: outputReducer
}));