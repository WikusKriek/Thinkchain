import axios from "axios"
import {tokenConfig} from "../auth/loginActions"




export const getData = params=>{
  const token=localStorage.getItem('token')
 
    const config={
      headers:{
        'content-type':"application/json"
      }
    }
    if (token){
      config.headers['x-auth-token']=token;
      config.params=params;
    }
  return async dispatch => {
    await axios.get("http://localhost:5000/supplier/", config).then(response => {
      
      dispatch({
        type: "GET_SUPPLIER",
        data: response.data.data,
        totalPages: response.data.totalPages,
        params
      })
    }).catch(err=>console.log(err))
  }
}


export const getInitialData = () => {
  return async dispatch => {
    await axios.get("http://localhost:5000/supplier/initial/").then(response => {
      dispatch({ type: "GET_ALL_SUPPLIER", data: response.data })
    })
  }
}

export const filterData = value => {
  return dispatch => dispatch({ type: "FILTER_SUPPLIER", value })
}

export const deleteData = obj => {
  console.log(obj)
  return dispatch => {
    axios
      .delete("http://localhost:5000/supplier/"+obj['_id'], {
        obj
      })
      .then(response => {
        dispatch({ type: "DELETE_SUPPLIER", obj })
      })
  }
}

export const updateData = obj => {
  return (dispatch) => {
    axios
      .post("http://localhost:5000/supplier/update/"+obj['_id'], 
        obj
      )
      .then(response => {
        dispatch({ type: "UPDATE_SUPPLIER", obj })
        
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
      .post("http://localhost:5000/supplier/add/",obj,config
      )
      .then(response => {
        dispatch({ type: "ADD_SUPPLIER", obj })
        //dispatch(getData(params))
      })
  }
}
