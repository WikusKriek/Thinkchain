import * as firebase from "firebase/app"
import { history } from "../../../history"
import "firebase/auth"
import "firebase/database"
import axios from "axios"
import { config } from "../../../authServices/firebase/firebaseConfig"

// Init firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

let firebaseAuth = firebase.auth

export const signupWithFirebase = (email, password, name) => {
  return dispatch => {
    let userEmail = null,
      loggedIn = false
    // userName = null

    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        firebaseAuth.onAuthStateChanged(user => {
          result.user.updateProfile({
            displayName: name
          })
          if (user) {
            userEmail = user.email
            // let userName = user.displayName
            loggedIn = true
            dispatch({
              type: "SIGNUP_WITH_EMAIL",
              payload: {
                email: userEmail,
                name,
                isSignedIn: loggedIn
              }
            })
            dispatch({
              type: "LOGIN_WITH_EMAIL",
              payload: {
                email: userEmail,
                name
              }
            })
          }
        })
        history.push("/")
      })
      .catch(error => {
        console.log(error.message)
      })
  }
}

export const signupWithJWT = (email, password, name) => {
  return dispatch => {
    axios
    .post("http://localhost:5000/company/add", {
      email: email,
      password: password,
      companyName: name
    })
    .then(res => {
      console.log(res)
    if(res.status==200){
    axios
      .post("http://localhost:5000/users/add", {
        email: email,
        password: password,
        username: name,
        companyId:res.data.company.id
      })
      .then(response => {
        var loggedInUser
        var token
        if(response.data){

          loggedInUser = response.data.user
          token =response.data.token
          localStorage.setItem("token", token)
          
          dispatch({
            type: "SIGNUP_WITH_JWT",
            payload: { loggedInUser, 
              loggedInWith: "jwt", 
              userRole: response.data.user.userRole,
               token }
          })
          dispatch({
            type: "LOGIN_WITH_JWT",
            payload: { loggedInUser, 
              loggedInWith: "jwt", 
              userRole: response.data.userRole,
               token }
          })
          history.push("/")
        }

      })
      .catch(err => console.log(err))
    }
    })
    .catch(err => console.log(err))
  }
}
