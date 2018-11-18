import axios from 'axios';
import {  select } from 'redux-saga/effects';

const axios_config = {
  transformResponse: [(data) => {
    let jdata = JSON.parse(data);
    if(jdata.type === "ERROR|FAILURE"){ throw jdata.payload }
    return jdata;
  }]
};

export default function* axiosCreateClient(req_auth = true){
  let token = yield select((s) => s.user.token);
  let client = axios.create(axios_config);
  
  if(token){
    client.defaults.headers.common['Authorization'] = token;
    return client;
  } else {
    return req_auth ? null : client;
  }
}
