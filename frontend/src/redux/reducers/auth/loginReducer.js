
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading:null,
  user: null,
  userRole: 'editor'
}


export const login = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_WITH_EMAIL": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_FB": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_TWITTER": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_GOOGLE": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_GITHUB": {
      return { ...state, values: action.payload }
    }
    case "LOGIN_WITH_JWT": {
      localStorage.setItem('token',action.payload.token);
      return { ...state,
        isAuthenticated:true,
        isLoading:false, 
        values: action.payload,
        userRole: action.payload.userRole,
        token:action.payload.token
      }
    }
    case "USER_LOADING": {
      return { ...state, isLoading:true }
    }
    case "USER_LOADED": {
      var loggedInUser={loggedInUser:{
        id:action.payload['_id'],
        username:action.payload.username,
        email:action.payload.email
      }}
      
      return { ...state, isAuthenticated:true,isLoading:false, values: loggedInUser, userRole: action.payload.userRole}
    }
    case "AUTH_ERROR":
    case "LOGIN_FAIL":
    case "LOGOUT_WITH_JWT": {
      localStorage.removeItem('token');
      return { ...state, 
        values: action.payload ,
        token:null,
        userRole: 'editor'

      }
    }
    case "LOGOUT_WITH_FIREBASE": {
      return { ...state, values: action.payload }
    }
    case "CHANGE_ROLE": {
      return { ...state, userRole: action.userRole }
    }
    case "LOGIN":{
      return {

      }
    }

    default: {
      return state
    }
  }
}
