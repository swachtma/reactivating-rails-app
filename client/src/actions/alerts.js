import * as constants from "../constants/alerts";

export const addAlert = (message, level = constants.lvls[0], scope = constants.scopes[0]) => ({
  type: constants.ADD_ALERT, payload: {message, level, scope, timestamp: Date.now()}
});

export const clearAlerts = () => ({ type: constants.CLEAR_ALERTS }) ;