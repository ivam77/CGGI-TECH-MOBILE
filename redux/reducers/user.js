const initialState = {
    token: null,
    user: null,
    photo: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_TOKEN":
        return {
          ...state,
          token: action.payload,
        };
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
        };
      case "SET_PHOTO":
        return {
          ...state,
          photo: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;