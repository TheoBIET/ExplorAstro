import { connect } from 'react-redux';
import Profile from 'src/components/Profile';

import {
  changeProfileMenu, getUserInfo, follow, unfollow, toggleBioEdit,
} from 'src/actions/profile';

const mapStateToProps = (state) => ({
  username: state.profile.username,
  firstName: state.profile.firstname,
  lastName: state.profile.lastname,
  menuValue: state.profile.profileMenuValue,
  loggedUserId: state.user.loggedUserId,
  followers: state.profile.followers,
  following: state.profile.following,
  userFollowed: state.profile.userFollowed,
  explorations: state.profile.explorations,
  bioEditIsOpen: state.profile.bioEditOpen,
});

const mapDispatchToProps = (dispatch) => ({
  changeMenuValue: (value) => {
    dispatch(changeProfileMenu(value));
  },
  getInfo: (value) => {
    dispatch(getUserInfo(value));
  },
  handleFollow: (value) => {
    dispatch(follow(value));
  },
  handleUnfollow: (value) => {
    dispatch(unfollow(value));
  },
  handleToggleBioEdit: () => {
    dispatch(toggleBioEdit());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
