/* global expect */
import  alertsReducer, { normalizeAlert } from '../../../store/reducers/alerts';
import * as actions from '../../../actions/alerts';

let defaultState = [];
let exampleState = [{message: "Test alert", level: "info", scope: "application", timestamp: 0}];

describe("alerts Reducer", ()=>{
  test("normalizeAlert enforces acceptable values for scope and level", ()=>{
    expect(normalizeAlert({message: "Test alert", timestamp: 0})).toEqual(exampleState[0]);
  });
  
  test("ADD_ALERT appends alert to array",()=>{
    let fsa = actions.addAlert("Test alert");
    fsa.payload.timestamp = 0;
    expect(alertsReducer(defaultState,fsa)).toEqual(exampleState);
  });
  
  test("CLEAR_ALERTS empties alerts array", () =>{
    expect(alertsReducer(exampleState, actions.clearAlerts())).toEqual([]);
  });
});