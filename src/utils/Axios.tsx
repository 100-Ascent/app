import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {BASEURL} from './constants';

const userAxiosInstance = axios.create();

userAxiosInstance.defaults.baseURL = BASEURL;

userAxiosInstance.interceptors.request.use(async request => {
  request.headers.Authorization = await auth().currentUser.getIdToken();
  return request;
});
export default userAxiosInstance;
