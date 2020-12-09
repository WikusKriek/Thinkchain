import { combineReducers } from "redux"
import calenderReducer from "./calendar/"
import emailReducer from "./email/"
import chatReducer from "./chat/"
import todoReducer from "./todo/"
import customizer from "./customizer/"
import auth from "./auth/"
import errorReducer from "./error/"
import navbar from "./navbar/Index"

import productList from "./product-list/"
import supplierList from "./supplier-list/"

const rootReducer = combineReducers({
  calendar: calenderReducer,
  error:errorReducer,
  emailApp: emailReducer,
  todoApp: todoReducer,
  chatApp: chatReducer,
  customizer: customizer,
  auth: auth,
  navbar: navbar,
  
  productList: productList,
  supplierList: supplierList
})

export default rootReducer
