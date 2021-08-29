import { connect } from 'react-redux';
import Settings from 'src/components/Settings';

import {
  changeValue, changeUsername, changePassword, deleteAccount,
  setFieldHasError,
} from 'src/actions/user';

const mapStateToProps = (state) => ({
  username: state.user.username,
  usernameChange: state.user.usernameChange,
  passwordForUsername: state.user.passwordForUsername,
  password: state.user.password,
  newPassword: state.user.newPassword,
  passwordConfirmation: state.user.passwordConfirmation,
  fieldHasError: state.user.fieldHasError,
  formError: state.user.loginError,
});

const mapDispatchToProps = (dispatch) => ({
  changeField: (value, key) => {
    dispatch(changeValue(value, key));
  },
  handleUsernameChange: () => {
    dispatch(changeUsername());
  },
  handlePasswordChange: () => {
    dispatch(changePassword());
  },
  handleDeleteAccount: () => {
    dispatch(deleteAccount());
  },
  handleFieldHasError: (value) => {
    dispatch(setFieldHasError(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
