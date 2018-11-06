import axios from 'axios';
import {  select } from 'redux-saga/effects';

export default function* axiosCreateClient(req_auth = true){
  let token = yield select((s) => s.user.token);
  let client = axios.create();
  
  if(token){
    client.defaults.headers.common['Authorization'] = token;
    return client;
  } else {
    return req_auth ? null : client;
  }
}