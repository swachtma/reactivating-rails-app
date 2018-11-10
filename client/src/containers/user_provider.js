import { connect } from 'react-redux';

import UserBadge from '../components/user_badge';
import SideBarSignout from '../components/side_bar_signout';
import { signalSignout } from '../actions/user';

 const connectToUser = (WrappedComponent) => {
   return connect(mapStateToProps,mapDispatchToProps)(WrappedComponent);
};

const mapStateToProps = (state) => ({
  username: state.user.username,
  avatar: state.user.avatar
});

const mapDispatchToProps = (dispatch) => ({
  dispatchSignalSignout: (e) => dispatch(signalSignout())
});

// EXPORTABLE CONNECTED COMPONENTS
export const ConnectedUserBadge = connectToUser(UserBadge);
export const ConnectedSidebarSignOut = connectToUser(SideBarSignout);