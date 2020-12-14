import React, { Component } from "react"
import { Label, Input, FormGroup, Button } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"
import axios from "axios"
import Select from "react-select"
import chroma from "chroma-js"


const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.color ? chroma(data.color) : "#7367f0"
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? data.color : "#7367f0")
      }
    }
  },
  multiValue: (styles, { data }) => {
    const color = data.color ? chroma(data.color) : "#7367f0"
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css()
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color ? data.color : "#7367f0"
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ":hover": {
      backgroundColor: data.color ? data.color : "#7367f0",
      color: "white"
    }
  })
}

class DataListSidebar extends Component {
  state = {
    _id:"",
    supplier:"",
    name: "",
    number:"",
    con:"",
    packaging:"true",
    qty:"",
    costPrice:"",
    salePrice:"",
    minQty:"",
    recQty:"",
    price: "",
    consign:"true",
    img: "" 
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
      .post("http://localhost:5000/products/add/",obj,config
      )
      .then(response => {
        console.log(response)
        //dispatch(getData(params))
      })
      this.props.handleSidebar(false, true)
      
  }
  

  render() {
    let { show, handleSidebar, data,suppliers } = this.props
    let { number, name,packaging, qty, costPrice,salePrice,minQty,recQty, img,con,consign,supplier} = this.state
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
            <FormGroup >
              <Label for="languages">Supplier</Label>
              <Select
              
              onChange={e => this.setState({ supplierId: e.value })}
              defaultValue={suppliers[0]}
                
                options={suppliers}
               
              styles={colourStyles}
                className="React"
                classNamePrefix="select"
                id="languages"
              >
                
              </Select>
              </FormGroup>
          
          <FormGroup>
            <Label for="data-name">Number</Label>
            <Input
              type="text"
              value={number}
              placeholder="B-10648"
              onChange={e => this.setState({ number: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-name">Name</Label>
            <Input
              type="text"
              value={name}
              placeholder="Apple IphoneX"
              onChange={e => this.setState({ name: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          
          
          <FormGroup>
            <Label for="data-popularity">Qty</Label>
            <Input
              type="number"
              value={qty}
              id="data-popularity"
              placeholder="1"
              onChange={e =>
                this.setState({
                   qty: e.target.value 
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-popularity">Minimum Qty</Label>
            <Input
              type="number"
              value={minQty}
              id="data-popularity"
              placeholder="10"
              onChange={e =>
                this.setState({
                   minQty: e.target.value 
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-popularity">Recorded Qty</Label>
            <Input
              type="number"
              value={recQty}
              id="data-popularity"
              placeholder="10"
              onChange={e => this.setState({recQty: e.target.value  })}
          />
          </FormGroup>
          <FormGroup>
            <Label for="data-status">Packaging</Label>
            <Input
              type="select"
              id="data-status"
              value={packaging}
              onChange={e => this.setState({ packaging: e.target.value })}>
              <option>true</option>
              <option>false</option>
              
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-status">Consignment</Label>
            <Input
              type="select"
              id="data-status"
              value={consign}
              onChange={e => this.setState({ consign: e.target.value })}>
              <option>true</option>
              <option>false</option>
              
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-price">Cost Price</Label>
            <Input
              type="number"
              value={costPrice}
              onChange={e => this.setState({ costPrice: e.target.value })}
              id="data-price"
              placeholder="30.99"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-price">Sale Price</Label>
            <Input
              type="number"
              value={salePrice}
              onChange={e => this.setState({ salePrice: e.target.value })}
              id="data-price"
              placeholder="30.99"
            />
          </FormGroup>
          {this.props.thumbView && img.length <= 0 ? (
            <label
              className="btn btn-primary"
              htmlFor="upload-image"
              color="primary">
              Upload Image
              <input
                type="file"
                id="upload-image"
                hidden
                onChange={e =>
                  this.setState({ img: URL.createObjectURL(e.target.files[0]) })
                }
              />
            </label>
          ) : null}
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
