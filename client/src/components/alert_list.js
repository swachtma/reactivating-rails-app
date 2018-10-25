import React, { Component } from 'react';

const alertStyle = {
  padding: "15px",
  marginBottom: "20px",
  border: "1px solid transparent",
  borderRadius: "4px"
},

alertLevels = {
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
  success:{
    backgroundColor: "#dff0d8",
    borderColor: "#d6e9c6",
    color: "#3c763d"
  },
  danger: {
    backgroundColor: "#f2dede",
    borderColor: "#ebccd1",
    color: "#a94442"
  }
};

class AlertList extends Component {
  renderAlertMessages = (alerts) => {
    return alerts.map((a) => 
      <div 
        key={a.timestamp}
        className={"alert alert-" + a.level }
        style={Object.assign({},alertStyle,alertLevels[a.level])}
        children={a.message}
      />
    );
  }
  
  render() {
    return (
      <div className={"alert_list_" + this.props.scope}>
        { this.renderAlertMessages(this.props.alerts) }
      </div>
    );
  }
}

export default AlertList;