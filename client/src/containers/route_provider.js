import { connect } from 'react-redux';
import RouterSwitch from '../components/router_switch';

import GithubIcon from '../components/github_icon';

const routerProvider = (WrappedComponent = RouterSwitch) => {
  let mapStateToProps = (state) => ({
    location: state.location
  });
  
  return connect(mapStateToProps,null)(WrappedComponent);
};

export default routerProvider;

// EXPORTABLE CONNECTED COMPONENTS
export const ConnectedGitHubIcon = routerProvider(GithubIcon);