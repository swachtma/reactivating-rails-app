import { connect } from 'react-redux';

import { scopes } from '../constants/alerts';
import AlertList from '../components/alert_list';

const alertProvider = (scope = scopes[0], WrappedComponent = AlertList) => {
  let mapStateToProps = (state) => ({
    alerts: state.alerts.filter((a) => a.scope === scope)
  });
  
  return connect(mapStateToProps,null)(WrappedComponent);
};

export default alertProvider;