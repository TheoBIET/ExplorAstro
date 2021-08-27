import {
  CHANGE_VALUE, TOGGLE_SIGNUP, LOGOUT, SAVE_USER,
} from 'src/actions/user';

const initialState = {
  loggedUserId: 0,
  loggedUserFollowing: [],
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  newPassword: '',
  passwordForUsername: '',
  username: '',
  usernameChange: '',
  logged: false,
  signup: false,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_VALUE: {
      return {
        ...state,
        [action.key]: action.value,
      };
    }
    case TOGGLE_SIGNUP: {
      return {
        ...state,
        signup: !state.signup,
      };
    }
    case LOGOUT: {
      localStorage.removeItem('user');
      return {
        ...initialState,
      };
    }
    case SAVE_USER: {
      return {
        ...state,
        loggedUserId: action.payload?.id,
        username: action.payload?.username ?? '',
        logged: !!action.payload?.username,
        avatar_url: action.payload?.avatar_url,
        email: '',
        password: '',
        passwordConfirmation: '',
        usernameChange: '',
        passwordForUsername: '',
      };
    }
    default:
      return state;
  }
};

export default reducer;
