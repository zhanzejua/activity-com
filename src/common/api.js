require('es6-promise').polyfill();
import axios from 'axios';
import qs from 'qs';
let base = process.env.NODE_ENV != 'production' ? '': '';

axios.defaults.timeout = 50000;
axios.create({
    headers: {
        'Content-Type': 'application/json'
    }
});

export const add = params => { return axios.post(`${base}/add`, qs.stringify(params))};
export const like = params => { return axios.get(`${base}/like`, {params: params})};
