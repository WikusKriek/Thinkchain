import React from "react"
import { Row, Col, Button, Form, Input, Label, FormGroup,Card,
  CardBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle } from "reactstrap"
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import Radio from "../../../components/@vuexy/radio/RadioVuexy"
import { Check, User, MapPin,Truck,Package,Plus,Trash } from "react-feather"
import Select from "react-select"
import chroma from "chroma-js"
import Flatpickr from "react-flatpickr";
import { history } from "../../../history"


import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

import { AgGridReact } from "ag-grid-react"
import { ContextLayout } from "../../../utility/context/Layout"
import { ChevronDown } from "react-feather"
import axios from "axios"

import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"

import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"


const languages = [
  { value: "english", label: "English", color: "#7367f0" },
  { value: "french", label: "French", color: "#7367f0" },
  { value: "spanish", label: "Spanish", color: "#7367f0" },
  { value: "russian", label: "Russian", color: "#7367f0" },
  { value: "italian", label: "Italian", color: "#7367f0" }
]

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
class UserInfoTab extends React.Component {
  state = {
    orderdate: new Date(),
    rowData: [],
    suppliers:[],
    products:[],
    product:{},
    supplier:"",
    reference:"",
    paid:false,
    recieved:false,
      
      vat:"",
      qty:1,
    
    
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true
    },
    columnDefs: [
      {
        headerName: "Product Number",
        field: "number",
        width: 175,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true,
        pinned: window.innerWidth > 992 ? "left" : false
      },
      {
        headerName: "Product Name",
        field: "name",
        filter: true,
        width: 175
      },
      {
        headerName: "Cost Price",
        field: "costPrice",
        filter: true,
        width: 250,
        
      },
      {
        headerName: "Qty",
        field: "qty",
        filter: true,
        width: 250
      },
      {
        headerName: "Vat",
        field: "vat",
        filter: true,
        width: 150
      },
      {
        headerName: "Sub Total",
        field: "subtotal",
        filter: true,
        width: 150
      }
     
    ]
  }
  componentDidMount() {
    const token=localStorage.getItem('token')
 
    const config={
      headers:{
        'content-type':"application/json"
      }
    }
    if (token){
      config.headers['x-auth-token']=token;
      
    }
  
     axios.get("http://localhost:5000/supplier/list/", config).then(response => {
      let suppliers = response.data.data
      JSON.stringify(suppliers)
      this.setState({ suppliers })
      
      
    }).catch(err=>console.log(err))

    

  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    
    this.gridApi.sizeColumnsToFit()
  }

  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
  }
  handleSupplierChange(event) {
    this.setState( {supplier:event.value})
    const token=localStorage.getItem('token')
 
    const config={
      headers:{
        'content-type':"application/json"
      }
    }
    if (token){
      config.headers['x-auth-token']=token;
      
    }
  
      axios.get("http://localhost:5000/products/supplier/"+event.value, config).then(response => {
      let products = response.data.data
      console.log(products)
      JSON.stringify(products)
      this.setState( {products})
      
      
    }).catch(err=>console.log(err))

  }

  filterSize = val => {
    if (this.gridApi) {
      
      this.setState({
        currenPageSize: val,
        getPageSize: val
      })
    }
  }

  handleSaveOrder=obj=>{
    var status=""
    console.log(obj)
    if (obj.paid &&obj.recieved){
        status="completed"
    }else{
      status="progress"
    }
  var order={
    reference:obj.reference,
    supplierId:obj.supplier,
    orderDate:obj.orderdate,
    status,
    paid:obj.paid,
    recieved:obj.recieved,
    products:obj.rowData

  }
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
      .post("http://localhost:5000/orders/add/",order,config
      )
      .then(response => {
        console.log(response)
        //dispatch(getData(params))
      })
      
  }

  handleaddproduct=p=>{
    console.log(p.product.name)
    var data=this.state.rowData
    var subtotal=p.product.costPrice*p.qty
    data.push({product:p.product["_id"],name:p.product.name,number:p.product.number,costPrice:p.product.costPrice,vat:p.vat,qty:p.qty,subtotal})
    this.gridApi.setRowData(data);
    this.setState({rowData:data})
  }

  handleorderdate = date => {
    this.setState({
      orderdate: date
    })
  }
  render() {
    const { rowData, columnDefs, defaultColDef,suppliers,products } = this.state
    return (
      
      
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Stock Order New"
          breadCrumbParent="Stock Srder"
          breadCrumbActive="New"
        />
      <Form onSubmit={e => e.preventDefault()}>
      <h5 className="mb-1">
              <Truck className="mr-50" size={16} />
              <span className="align-middle">Order Info</span>
            </h5>
        <Row className="mt-1">
          <Col className="mt-1"  sm="12" md="6">
            
            
            <FormGroup >
              <Label for="languages">Supplier</Label>
              <Select
              
              onChange={this.handleSupplierChange.bind(this)}
              defaultValue={suppliers[0]}
                styles={colourStyles}
                options={suppliers}
                
                className="React"
                classNamePrefix="select"
                id="languages"
              />
              </FormGroup>
              <FormGroup>
              <Label for="contactnumber">Reference</Label>
              <Input
                type="text"
                id="contactnumber"
                placeholder="Contact Number"
                onChange={e => this.setState({reference:e.target.value})}
              />
            
            </FormGroup>
            
          </Col>
            <Col className="mt-1"  sm="12" md="6">
            
            <FormGroup>
              <Label className="d-block" for="dob">
                Order Date
              </Label>
              <Flatpickr
                id="dob"
                className="form-control"
                options={{ dateFormat: "Y-m-d" }}
                value={this.state.orderdate}
                onChange={date => this.handleorderdate(date)}
              />
            </FormGroup>
            
            
            
            <FormGroup>
              <Label className="d-block mb-50" for="communication">
                Status
              </Label>
              <div className="d-inline-block mr-1">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="Paid"
                  defaultChecked={false}
                  
                  onChange={e => this.setState({paid:e.target.checked})}
                />
              </div>
              <div className="d-inline-block mr-1">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="Recieved"
                  
                  defaultChecked={false}
                  onChange={e => this.setState({recieved:e.target.checked})}
                />
              </div>
              
            </FormGroup>
          </Col>
          
          
          <Col className="mt-1"  sm="12" md="6">
          <h5 className="mb-1">
              <Truck className="mr-50" size={16} />
              <span className="align-middle">Add Product</span>
            </h5>
            
            
            <FormGroup >
              <Label for="languages">Product</Label>
              <Select
              
                
              defaultValue={suppliers[0]}
                styles={colourStyles}
                options={products}
                onChange={e => this.setState({product:e.product})}
                className="React"
                classNamePrefix="select"
                id="languages"
              />
              </FormGroup>
              <FormGroup>
              <Label for="contactnumber">Qty</Label>
              <Input
                type="number"
                id="contactnumber"
                placeholder={1}
                onChange={e => this.setState({ qty: e.target.value })}
              />
            </FormGroup>
            
            
          </Col>
          <Col className="mt-4"   sm="12" md="6">
          
            
            
          <FormGroup>
              <Label for="contactnumber">Vat</Label>
              <Input
                type="number"
                id="contactnumber"
                placeholder={15}
                onChange={e => this.setState({ vat: e.target.value })}
              />
            </FormGroup>
              
          </Col>

          

          





          <Col sm="12" className="ml-3" className="mr-4">
          
          <Card className="overflow-hidden agGrid-card">
          <CardBody className="py-0">
            {this.state.rowData === null ? null : (
              <div className="ag-theme-material w-100 my-2 ag-grid-table">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="d-flex flex-wrap justify-content-between mb-1">
                    

                    <div className="table-input ml-1">
                    <Button
                    className="add-new-btn"
                    color="primary"
                    onClick={() => this.handleaddproduct(this.state)}
                    outline>
                    <Plus size={15} className="mr-50"/>
                    <span className="align-middle">Add New</span>
                  </Button>
                    </div>
                    <div className="table-input ml-1">
                    <Button
                    className="add-new-btn"
                    color="primary"
                    onClick={() => this.deletevalues()}
                    outline>
                    <Trash size={15} className="mr-50"/>
                    <span className="align-middle">Delete</span>
                  </Button>
                    </div>
                    <div className="export-btn ml-1">
                      <Button.Ripple
                        color="primary"
                        onClick={() => {
                          this.getrowdata()}}
                      >
                        Refresh
                      </Button.Ripple>
                      
                    </div>
                    
                  </div>
                 
                </div>
                <ContextLayout.Consumer>
                  {context => (
                    <AgGridReact
                      gridOptions={{}}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      colResizeDefault={"shift"}
                      animateRows={true}
                      floatingFilter={false}
                      
                      
                      pivotPanelShow="always"
                      enableRtl={context.state.direction === "rtl"}
                    />
                  )}
                </ContextLayout.Consumer>
              </div>
            )}
          </CardBody>
          </Card>
          </Col>
          <Col className="d-flex justify-content-end flex-wrap" sm="12">
          <Button.Ripple className="mr-1" color="primary" onClick={() => {history.push("/pages/invoice")}}>
              Send Invoice
            </Button.Ripple>
            <Button.Ripple className="mr-1"
             color="primary"
             onClick={() => this.handleSaveOrder(this.state)}
             >
              Save Changes
            </Button.Ripple>
            <Button.Ripple color="flat-warning">Reset</Button.Ripple>
          </Col>
        </Row>
      </Form>
      </React.Fragment>
    )
  }
}
export default UserInfoTab








 

 

  
