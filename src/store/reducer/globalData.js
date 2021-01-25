const INITIAL_STATE = {
  email: "",
  userName: "",
  address:"",
  uid: "",
  // password: "",
  login: false,
  // error: false,
  // msg: ''
  gender: true
};

export default globalData = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // case 'Error':
    //   console.log("Error",action)
    //   // break
    //     return ({
    //         ...state,
    //         error: action.payload.error,
    //         msg: action.payload.msg,
    //         // password: action.payload.password
    //     })
    case 'SignupUser':
      console.log("signup",action)
      // break
        return ({
            ...state,
            email: action.payload.email,
            userName: action.payload.userName,
            address: action.payload.address,
            gender: action.payload.gender,
            // password: action.payload.password
        })
    case 'SigninUser':
      console.log("signin",action)
      // break
        return ({
            ...state,
            email: action.payload.data.email,
            userName: action.payload.data.name,
            address: action.payload.data.address,
            login: action.payload.login,
            gender: action.payload.gender,
            uid: action.payload.data.uid
            // password: action.payload.password
        })
    case 'updateProfile':
      console.log("update",action)
      // break
        return ({
            ...state,
            email: action.payload.email,
            userName: action.payload.name,
            address: action.payload.address,
            gender: action.payload.gender,
            // login: action.payload.login,
            uid: action.payload.uid
            // password: action.payload.password
        })
    case "Logout":
      // console.log(action)
      // break;
      return {
        ...state,
        login: action.payload.login,
        // userName: action.payload.userName,
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
