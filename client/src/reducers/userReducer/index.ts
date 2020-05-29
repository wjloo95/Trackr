import { ACTION_TYPES } from '../../actions/';

const initialState = null;

const userReducer = (state = initialState, action: any): any => {
  switch (action.type) {
    case ACTION_TYPES.addUser:
      return action.payload.user;
    default:
      return state;
  }
};

export default userReducer;
