import axios from "axios"
import {tokenConfig} from "../auth/loginActions"




export const getData=() =>{
  const token=localStorage.getItem('token')
 
    const config={
      headers:{
        'content-type':"application/json"
      }
    }
    if (token){
      config.headers['x-auth-token']=token;
      
    }
  return async dispatch => {
    await axios.get("http://localhost:5000/products/", config).then(response => {
      
      dispatch({
        type: "GET_DATA",
        data: response.data.data
        
      })
    }).catch(err=>console.log(err))
  }
}


export const getInitialData = () => {
  return async dispatch => {
    await axios.get("http://localhost:5000/products/initial/").then(response => {
      dispatch({ type: "GET_ALL_DATA", data: response.data })
    })
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "FILTER_DATA", value })
}

export const deleteData = obj => {
  console.log(obj)
  return dispatch => {
    axios
      .delete("http://localhost:5000/products/"+obj['_id'], {
        obj
      })
      .then(response => {
        dispatch({ type: "DELETE_DATA", obj })
      })
  }
}

export const updateData = obj => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/products/update/"+obj['_id'], 
        obj
      )
      .then(response => {
        dispatch({ type: "UPDATE_DATA", obj })
        
      })
  }
}

export const addData = obj => {
  const token=localStorage.getItem('token')
 
    const config={
      headers:{
        'content-type':"application/json"
      }
    }
    if (token){
      config.headers['x-auth-token']=token;
    }
  return async (dispatch) => {
    
    //let params = getState().dataList.params
    await axios
      .post("http://localhost:5000/products/add/",obj,config
      )
      .then(response => {
        dispatch({ type: "ADD_DATA", obj })
        //dispatch(getData(params))
      })
  }
}
