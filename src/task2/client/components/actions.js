import axios from 'axios';
import store from './store';

export function searchData(values) {
    return axios.post('/search', values)
        .then((response) => {
            response = {...response, type: values.output.type};
            store.dispatch({type: 'DATA_LOADED', response});
        })
        .catch((error) => {
            console.error(error.message);
            store.dispatch({type: 'DATA_ERROR', error});
        });
}