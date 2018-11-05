import { connect } from 'react-redux';
import RouterSwitch from '../components/router_switch';

const routerProvider = (WrappedComponent = RouterSwitch) => {
  let mapStateToProps = (state) => ({
    location: state.location
  });
  
  return connect(mapStateToProps,null)(WrappedComponent);
};

export default routerProvider;