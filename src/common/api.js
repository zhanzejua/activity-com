import axios from 'axios';
import qs from 'qs';
let base = process.env.NODE_ENV != 'production' ? '': '';

// 
export const Add = params => { return axios.post(`${base}//add`, qs.stringify(params))};
export const Like = params => { return axios.get(`${base}//like`, {params: params})};
export const List = params => { return axios.get(`${base}//list`, {params: params})};
// 埋点
export const eventTracking = params => { return axios.get(`${base}/bizLog/ActivityRecord`, {params: params})};
