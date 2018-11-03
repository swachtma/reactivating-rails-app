import { connect } from 'react-redux';

import UserBadge from '../components/user_badge';
import { clearUser } from '../actions/user';

export const connectToUser = (WrappedComponent) => {
   return connect(mapStateToProps,mapDispatchToProps)(WrappedComponent);
};

const mapStateToProps = (state) => ({
  username: state.user.username,
  avatar: state.user.avatar
});

const mapDispatchToProps = (dispatch) => ({
  dispatchClearUser: (e) => dispatch(clearUser())
});

// EXPORTABLE CONNECTED COMPONENTS
export const ConnectedUserBadge = connectToUser(UserBadge);