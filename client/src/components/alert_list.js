import React from 'react';
import {string, array} from 'prop-types';

const styles = {
  alertStyle: {
    padding: "15px",
    marginBottom: "20px",
    border: "1px solid transparent",
    borderRadius: "4px"
  },

  alertLevels: {
    info: {
      backgroundColor: "#d9edf7",
      borderColor: "#bce8f1",
      color: "#31708f"
    },
    warning: {
      backgroundColor: "#fcf8e3",
      borderColor: "#faebcc",
      color: "#8a6d3b"
    },
    success: {
      backgroundColor: "#dff0d8",
      borderColor: "#d6e9c6",
      color: "#3c763d"
    },
    danger: {
      backgroundColor: "#f2dede",
      borderColor: "#ebccd1",
      color: "#a94442"
    }
  }
};

AlertList.propTypes = {
  scope: string,
  alerts: array
};

function AlertList(props){
  let { scope, alerts } = props; 
  
  alerts = alerts.map((a) => {
    let ac = "alert alert-" + a.level;
    let as = Object.assign(styles.alertStyle,styles.alertLevels[a.level]);
    return (
      <div 
        key={a.timestamp} 
        children={a.message}
        className={ac}
        style={as} 
      />
    );
  });
  
  return <div className={"alert_list_" + scope}>{ alerts }</div>;
}

export default AlertList;