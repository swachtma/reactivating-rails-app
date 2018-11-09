import { connect } from 'react-redux';

import UserBadge from '../components/user_badge';
import { signalSignout } from '../actions/user';

export const connectToUser = (WrappedComponent) => {
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