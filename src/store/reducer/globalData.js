const INITIAL_STATE = {
  // email: "",
  // userName: "",
  // password: ""
  login: false
};

export default globalData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case ActionTypes.SignupUser:
    //     return ({
    //         ...state,
    //         email: action.payload.email,
    //         userName: action.payload.userName,
    //         password: action.payload.password
    //     })
    case "Login":
      console.log(action)
      // break;
      return {
        // ...state,
        login: action.payload,
        // password: action.payload.password,
      };
    // case ActionTypes.SignOut:
    // return ({
    //     ...state,
    //     userName: "",
    //     password: ""
    // })
    default:
      return state;
  }
};
