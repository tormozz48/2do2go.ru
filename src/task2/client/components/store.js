import {createStore, combineReducers} from 'redux';
import {combineForms} from 'react-redux-form';

const outputInitialState = {value: 'No Data'};

const outputReducer = (state = outputInitialState, payload) => {
    switch(payload.type) {
        case 'DATA_LOADED': {
            return {data: payload.response.data};
        }
        case 'DATA_ERROR': {
            return {data: payload.error};
        }
        default: {
            return {...state}
        }
    }
};

export default createStore(combineForms({
    search: {
        url: 'http://www.reddit.com/r/javascript/.json'
    },
    output: outputReducer
}));