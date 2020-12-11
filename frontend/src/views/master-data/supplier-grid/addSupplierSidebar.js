import React, { Component } from "react"
import { Label, Input, FormGroup, Button } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import axios from "axios"


class DataListSidebar extends Component {
  state = {
    _id:"",
    name: "",
    tel:"",
    contactName:"",
    contactSurname:"",
    email:"",
    
  }

  

  

  handleSubmit = obj => {
    const token=localStorage.getItem('token')
 
    const config={
      headers:{
        'content-type':"application/json"
      }
    }
    if (token){
      config.headers['x-auth-token']=token;
    }
  
    
    //let params = getState().dataList.params
     axios
      .post("http://localhost:5000/supplier/add/",obj,config
      )
      .then(response => {
        console.log(response)
        //dispatch(getData(params))
      })
      this.props.handleSidebar(false, true)
      
  }
  

  render() {
    let { show, handleSidebar, data } = this.props
    let {  name,contactName, contactSurname,tel,email} = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE DATA" : "ADD NEW DATA"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}>
          
          <FormGroup>
            <Label for="data-name">Supplier Name</Label>
            <Input
              type="text"
              value={name}
              placeholder="Amazon"
              onChange={e => this.setState({ name: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-name">Contact Name</Label>
            <Input
              type="text"
              value={contactName}
              placeholder="John"
              onChange={e => this.setState({ contactName: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          
          
          <FormGroup>
            <Label for="data-popularity">Contact Surname</Label>
            <Input
              type="text"
              value={contactSurname}
              id="data-popularity"
              placeholder="Doe"
              onChange={e =>
                this.setState({
                   contactSurname: e.target.value 
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-popularity">Contact Tel Number</Label>
            <Input
              type="number"
              value={tel}
              id="data-popularity"
              placeholder="0832576681"
              onChange={e =>
                this.setState({
                   tel: e.target.value 
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-popularity">Contact Email</Label>
            <Input
              type="text"
              value={email}
              id="data-popularity"
              placeholder="email@gmail.com"
              onChange={e => this.setState({email: e.target.value  })}
          />
          </FormGroup>
         
          
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            {"Submit"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}
export default DataListSidebar
