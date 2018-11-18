import { connect } from 'react-redux';

import { scopes } from '../constants/alerts';
import AlertList from '../components/alert_list';

export default function AlertProvider(scope = scopes[0], WrappedComponent = AlertList){
  let mapStateToProps = (state) => ({
    alerts: state.alerts,
    scope: scope
  });
  
  return connect(mapStateToProps,null)(WrappedComponent);
};