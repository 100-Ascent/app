import axios from 'axios';
import {BASEURL} from '../constants/constants';

const uninterceptedAxiosInstance = axios.create();
uninterceptedAxiosInstance.defaults.baseURL = BASEURL;

export default uninterceptedAxiosInstance;
