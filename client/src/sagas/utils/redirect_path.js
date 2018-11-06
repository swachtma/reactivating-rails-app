import { put } from 'redux-saga/effects';

export default function redirectToPathIf(path){
  if(path){
    let rd = decodeURIComponent(path);
    rd = JSON.parse(rd);
    return put(rd);
  }
}