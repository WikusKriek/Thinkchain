const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading:null,
  user: null,
  userRole: null
}



export const register = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_WITH_EMAIL": {
      return { ...state, values: action.payload ,
        isAuthenticated:true,
        isLoading:false
      }
    }
    case "SIGNUP_WITH_JWT":
      localStorage.setItem('token',action.payload.token);
      return {
        ...state,
        values: action.payload,
        isAuthenticated:true,
        isLoading:false,
        token:action.payload.token
      }
      case "REGISTER_FAIL":
        localStorage.removeItem('token');
      return {
        ...state,
        token:null,
        values:null,
        isAuthenticated:false,
        isLoading:false
      }
    default: {
      return state
    }
  }
}
