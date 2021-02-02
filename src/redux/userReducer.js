import {SET_USER_INFORMATION} from "./types";

const initialState = {
  userInfo: {},
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {

    case SET_USER_INFORMATION: {
      return { ...state, userInfo: action.payload };
    }
    
    default:
      return state;
  }
};
