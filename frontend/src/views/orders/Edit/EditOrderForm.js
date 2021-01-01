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
import { ToastContainer, toast } from "react-toastify"
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
import SweetAlert from 'react-bootstrap-sweetalert';

import "react-toastify/dist/ReactToastify.css"
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"




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
class EditOrderForm extends React.Component {
  state = {
    orderdate: new Date(),
    defaultAlert : false, 
   confirmAlert : false, 
   cancelAlert : false,
   supplierDidChange:"",
    rowData: [],
    suppliers:[],
    products:[],
    product:{},
    supplier:"",
    reference:"",
    paid:false,
    recieved:false,
      
      vat:15,
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
        minWidth: 175,
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
        minWidth: 175
      },
      {
        headerName: "Cost Price",
        field: "costPrice",
        filter: true,
        minWidth: 250,
        
      },
      {
        headerName: "Qty",
        field: "qty",
        filter: true,
        minWidth: 250
      },
      {
        headerName: "Vat",
        field: "vat",
        filter: true,
        minWidth: 150
      },
      {
        headerName: "Sub Total",
        field: "subtotal",
        filter: true,
        minWidth: 150
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


    axios.get("http://localhost:5000/products/supplier/"+this.props.order.supplierId["_id"], config).then(response => {
      let products = response.data.data
      console.log(products)
      JSON.stringify(products)
      this.setState( {products})
      
      
    }).catch(err=>console.log(err))
    
    this.setState({supplier:{value:this.props.order.supplierId["_id"], label:this.props.order.supplierId.name}})
    this.setState({paid:this.props.order.paid,recieved:this.props.order.recieved,status:this.props.order.status})

  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    
    this.gridApi.sizeColumnsToFit()
    this.setRowData();
  }

  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
  }
  handleSupplierChange(event) {
    this.setState( {supplierDidChange:{value:event.value,label:event.label}})
    this.handleAlert("defaultAlert", true)
   

  }

  filterSize = val => {
    if (this.gridApi) {
      
      this.setState({
        currenPageSize: val,
        getPageSize: val
      })
    }
  }

  handleCreateOrder=obj=>{
    var status=""
    console.log(obj)
    if (obj.paid &&obj.recieved){
        status="completed"
    }else{
      status="progress"
    }
  var order={
    reference:obj.reference,
    supplierId:obj.supplier.value,
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
      .post("http://localhost:5000/orders/update/"+this.props.order['_id'],order,config
      )
      .then(response => {
        console.log(response)
        //dispatch(getData(params))
      })
      
  }

  handleUpdateOrder=obj=>{
    var status="draft"
    console.log(obj)
    if (this.state.status!="draft"){
      if (!(obj.paid &&obj.recieved)){
        status="progress"
      }else if (obj.paid &&obj.recieved){
        status="completed"
    }else{
      status="draft"
    }
  }else{
    status="draft"
  }
  var order={
    reference:obj.reference,
    supplierId:obj.supplier.value,
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
      .post("http://localhost:5000/orders/update/"+this.props.order['_id'],order,config
      )
      .then(response => {
        console.log(response)
        //dispatch(getData(params))
      })
      
  }

  handleAlert = (state, value) => {
    this.setState({ [state] : value })
    if(state=='confirmAlert'){
      this.setState({rowData:[]})
      this.gridApi.setRowData([])
      this.setState( {supplier:this.state.supplierDidChange})
      const token=localStorage.getItem('token')
   
      const config={
        headers:{
          'content-type':"application/json"
        }
      }
      if (token){
        config.headers['x-auth-token']=token;
        
      }
    
        axios.get("http://localhost:5000/products/supplier/"+this.state.supplier.value, config).then(response => {
        let products = response.data.data
        console.log(products)
        JSON.stringify(products)
        this.setState( {products})
        
        
      }).catch(err=>console.log(err))
    }
  }

  setRowData(){
    let data=[]
    console.log(this.props)
    for( let product of this.props.order.products){
      console.log(product)
      if(product.product!=null){
      data.push({product:product.product['_id'],number:product.product.number,name:product.product.name,qty:product.qty,vat:product.vat,subtotal:product.subtotal,costPrice:product.product.costPrice})
    }else{
      toast.error("One or more products no longer exist!", {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }
    this.gridApi.setRowData(data);
    this.setState({rowData:data})
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
    const {order}=this.props
    var supplierId=this.props.order.supplierId
    if(supplierId==null){
      toast.error("The supplier of this order no longer exists!", {
        position: toast.POSITION.TOP_CENTER
      });
      supplierId={name:"",number:"",contactName:"","_id":""}
    }
    console.log(order);
    return (
      
      
      <React.Fragment>
        
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
              defaultValue={{value:supplierId["_id"], label:supplierId.name}}
                styles={colourStyles}
                options={suppliers}
                value={this.state.supplier}
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
                defaultValue={order.supplierId.contactName}
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
                value={order.orderDate}
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
                  defaultChecked={order.paid}
                  
                  onChange={e => this.setState({paid:e.target.checked})}
                />
              </div>
              <div className="d-inline-block mr-1">
                <Checkbox
                  color="primary"
                  icon={<Check className="vx-icon" size={16} />}
                  label="Recieved"
                  
                  defaultChecked={order.recieved}
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
            <ToastContainer /> 
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
                    onClick={() => {let selectedData = this.gridApi.getSelectedRows()
                      this.gridApi.updateRowData({ remove: selectedData })}}
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

                <SweetAlert title="Are you sure?" 
                  warning
                  show={this.state.defaultAlert}
                  showCancel
                  reverseButtons
                  cancelBtnBsStyle="danger"
                  confirmBtnText="Yes, delete it!"
                  cancelBtnText="Cancel"
                  onConfirm={() => {
                    this.handleAlert("basicAlert", false)
                    this.handleAlert("confirmAlert", true)
                  }}
                  onCancel={() => {
                    this.handleAlert("basicAlert", false)
                    this.handleAlert("cancelAlert", true)
                  }}
                >
                  Changing the supplier will delete the current products!
                </SweetAlert>

                <SweetAlert success title="Deleted!" 
                  confirmBtnBsStyle="success"
                  show={this.state.confirmAlert} 
                  onConfirm={() => {
                    this.handleAlert("defaultAlert", false)
                    this.handleAlert("confirmAlert", false)
                  }}
                >
                    <p className="sweet-alert-text">Your supplier has been changed.</p>
                </SweetAlert>

                <SweetAlert error title="Cancelled" 
                  confirmBtnBsStyle="success"
                  show={this.state.cancelAlert} 
                  onConfirm={() =>{
                    this.handleAlert("defaultAlert", false)
                    this.handleAlert("cancelAlert", false)
                  }}
                >
                    <p className="sweet-alert-text">
                      Your supplier information is safe! :)
                    </p>
                  </SweetAlert>


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
          <Button.Ripple className="mr-1"
             color="primary"
             onClick={() => this.handleCreateOrder(this.state)}
             >
              Create order
            </Button.Ripple>
          
            <Button.Ripple className="mr-1"
             color="primary"
             onClick={() => this.handleUpdateOrder(this.state)}
             >
              Save Changes
            </Button.Ripple>
            
          </Col>
        </Row>
      </Form>
      </React.Fragment>
    )
  }
}
export default EditOrderForm








 

 

  
