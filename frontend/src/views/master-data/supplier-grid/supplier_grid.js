import React from "react"
import Sidebar from "./addSupplierSidebar"
import { ToastContainer, toast } from "react-toastify"
import {
  Card,
  CardBody,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  FormGroup,
  CardHeader,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink
} from "reactstrap"
import {
  Edit,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye, 
  Code
} from "react-feather"
import { AgGridReact } from "ag-grid-react"
import { ContextLayout } from "../../../utility/context/Layout"
import SweetAlert from 'react-bootstrap-sweetalert';

import classnames from "classnames"

import axios from "axios"
import { Formik, Field, Form, ErrorMessage, FormikConsumer} from "formik"
import * as Yup from "yup"


import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"
import "react-toastify/dist/ReactToastify.css"

import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"

const formSchema = Yup.object().shape({
  name: Yup.string()
    .required("Required"),
  contactName: Yup.string()
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  tel: Yup.number().required("Required"),
  city: Yup.string()
    .required("Required"),
  country: Yup.string()
    .required("Required"),
  addressLine: Yup.string()
    .min(4, "Too Short!")
    .required("Required"),
  taxNumber: Yup.string()
    .min(10, "Too Short!")
    .max(10, "Too Long!")
    .required("Required")
})


class AggridTable extends React.Component {
  state = {
    defaultAlert : false, 
   confirmAlert : false, 
   cancelAlert : false, 
    editType: 'fullRow',
    rowData:[],
    sidebar: false,
    addNew: "",
    activeTab: "1",
    modal: false,
    supplier:{
      _id:"",
    name: "",
    tel:"",
    contactName:"",
    contactSurname:"",
    email:""
    },
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
      
    },
    columnDefs: [
      {
        headerName: "Supplier",
        field: "name",
        minWidth: 250,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true,
        pinned: window.innerWidth > 992 ? "left" : false
      },
      {
        headerName: "Contact Name",
        field: "contactName",
        filter: true,
        minWidth: 175
      },
      {
        headerName: "Contact Tel",
        field: "tel",
        filter: true,
        minWidth: 150
      },
      {
        headerName: "Contact Email",
        field: "email",
        filter: true,
        minWidth: 150
      },
      {
        headerName: "Address Line",
        field: "addressLine",
        filter: true,
        minWidth: 175
      },
      {
        headerName: "Country",
        field: "country",
        filter: true,
        minWidth: 175
      },
      {
        headerName: "City",
        field: "city",
        filter: true,
        minWidth: 175
      },
      {
        headerName: "Tax Number",
        field: "taxNumber",
        filter: true,
        minWidth: 175
      },
      
    ]
  }

  async componentDidMount() {

    const token=localStorage.getItem('token')
 
    const config={
      headers:{
        'content-type':"application/json"
      }
    }
    if (token){
      config.headers['x-auth-token']=token;
      
    }
  
     await axios.get("http://localhost:5000/supplier/", config).then(response => {
      let rowData = response.data.data
      JSON.stringify(rowData)
      this.setState({ rowData })
      
    }).catch(err=>console.log(err))  
  }
  
  handleAlert = (state, value) => {
    this.setState({ [state] : value })
    if(state=='confirmAlert'){
      if(this.gridApi.getSelectedNodes().length>0){
        for (var row of this.gridApi.getSelectedNodes() ){
          axios
          .delete("http://localhost:5000/supplier/"+row.data['_id'], 
            row.data
          )
          .then(response => {
            
            if(response.status==200){
              console.log(response);
            }
          })
        }
        this.getrowdata();
      }
    }
  }

  async handleSubmit(obj){
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
        console.log(response.status)
        console.log(response.data)
        if (response.status == 200){
          console.log("here")
          let rowData= this.state.rowData
          rowData.push(obj)
          this.setState({ rowData })
          this.gridApi.setRowData(rowData)
          toast.success(response.data)
          
        this.toggleModal()
      }else{
        
          toast.error(response.data)
          
      }
      })
      .catch(err=>{
        toast.error("Could Not Add Supplier")
        console.log(err)})

    
  }

  getrowdata(){
    const token=localStorage.getItem('token')
 
    const config={
      headers:{
        'content-type':"application/json"
      }
    }
    if (token){
      config.headers['x-auth-token']=token;
      
    }
  
     axios.get("http://localhost:5000/supplier/", config).then(response => {
      let rowData = response.data.data
      JSON.stringify(rowData)
      this.setState({ rowData })
      this.gridApi.setRowData(rowData)
      
    }).catch(err=>console.log(err))
  }
  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    this.gridApi.sizeColumnsToFit()
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages()
    })
    this.gridApi.sizeColumnsToFit()
  }

  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
  }
  handleSidebar = (boolean, addNew = false) => {
    this.setState({ sidebar: boolean })
    if (addNew === true) this.setState({ currentData: null, addNew: true })
  }
  handleCurrentData = obj => {
    this.setState({ currentData: obj })
    this.handleSidebar(true)
  }
  onRowChanged = (event) => {
    console.log('Data after change is', event.data);
    axios
      .post("http://localhost:5000/supplier/update/"+event.data['_id'], 
        event.data
      )
      .then(response => {
        if(response.status==200){
       toast.success(response.data)
        }else{
          toast.error(response.data) 
        }
      }).catch(err=>console.log(err))
  };

  deletevalues (){
    console.log(this.gridApi.getSelectedNodes())
    if(this.gridApi.getSelectedNodes().length>0){
    this.handleAlert("defaultAlert", true)
    }
  }
  
  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        currenPageSize: val,
        getPageSize: val
      })
    }
  }
  toggleTab = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab })
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
    const { rowData, columnDefs, defaultColDef,sidebar } = this.state
    return (
      
      <div
      className={`data-list `}>
        <Sidebar
          show={sidebar}
          
          updateData={this.props.updateData}
          addData={this.props.addData}
          handleSidebar={this.handleSidebar}
          thumbView={this.props.thumbView}
          getData={this.props.getData}
          dataParams={this.props.parsedFilter}
          addNew={this.state.addNew}
        />
        <div
          className={classnames("data-list-overlay", {
            show: sidebar
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
        
        <Breadcrumbs
          breadCrumbTitle="Supplier Grid"
          breadCrumbParent="Master Data"
          breadCrumbActive="Supplier Grid"
        />
        <Card className="overflow-hidden agGrid-card">
          <CardBody className="py-0">
            {this.state.rowData === null ? null : (
              <div className="ag-theme-material w-100 my-2 ag-grid-table">
                <div className="d-flex flex-wrap justify-content-between align-items-center">
                  <div className="d-flex flex-wrap justify-content-between mb-1">
                    <UncontrolledDropdown className="p-1 ag-dropdown">
                      <DropdownToggle tag="div">
                      {this.gridApi
                          ? this.state.currenPageSize
                          : "" * this.state.getPageSize -
                            (this.state.getPageSize - 1)}{" "}
                        -{" "}
                        {this.state.rowData.length -
                          this.state.currenPageSize * this.state.getPageSize >
                        0
                          ? this.state.currenPageSize * this.state.getPageSize
                          : this.state.rowData.length}{" "}
                        of {this.state.rowData.length}
                        <ChevronDown className="ml-50" size={15} />
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(20)}
                        >
                          20
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(50)}
                        >
                          50
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(100)}
                        >
                          100
                        </DropdownItem>
                        <DropdownItem
                          tag="div"
                          onClick={() => this.filterSize(134)}
                        >
                          134
                        </DropdownItem>
                      </DropdownMenu>
                      
                    </UncontrolledDropdown>

                    <div className="table-input ml-1">
                    </div>
                    <div className="table-input ml-1">
                    <Button
                    className="add-new-btn"
                    color="primary"
                    onClick={this.toggleModal}
                    outline>
                    <Plus size={15} className="mr-50"/>
                    <span className="align-middle">Add New</span>
                  </Button>
                    </div>
                    <div className="table-input ml-1">
                    <Button
                    className="add-new-btn"
                    color="danger"
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
                  <div className="d-flex flex-wrap justify-content-between mb-1">
                    <div className="table-input mr-1">
                      <Input
                        placeholder="search..."
                        onChange={e => this.updateSearchQuery(e.target.value)}
                        value={this.state.value}
                      />
                    </div>
                    
                    <div className="export-btn ml-1">
                      <Button.Ripple
                        color="primary"
                        onClick={() => this.gridApi.exportDataAsCsv()}
                      >
                        Export as CSV
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
          You won't be able to revert this!
        </SweetAlert>

        <SweetAlert success title="Deleted!" 
          confirmBtnBsStyle="success"
          show={this.state.confirmAlert} 
          onConfirm={() => {
            this.handleAlert("defaultAlert", false)
            this.handleAlert("confirmAlert", false)
          }}
        >
            <p className="sweet-alert-text">Your supplier has been deleted.</p>
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
                <ToastContainer />
                <ContextLayout.Consumer>
                  {context => (
                    <AgGridReact
                      gridOptions={{}}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      onRowEditingStopped={this.onRowChanged.bind(this)}
                      editType={this.state.editType}
                      colResizeDefault={"shift"}
                      animateRows={true}
                      floatingFilter={true}
                      pagination={true}
                      paginationPageSize={this.state.paginationPageSize}
                      pivotPanelShow="always"
                      enableRtl={context.state.direction === "rtl"}
                    />
                  )}
                </ContextLayout.Consumer>
              </div>
            )}
          </CardBody>
        </Card>
        <Modal
                isOpen={this.state.modal}
                toggle={this.toggleModal}
                className="modal-dialog-centered"
              >
                <ModalHeader toggle={this.toggleModal}>
                  Add Supplier
                </ModalHeader>
                <ModalBody>
              
                <Formik
            initialValues={{
              name: "",
              contactName: "",
              email: "",
              country: "",
              tel: "",
              city: "",
              addressLine: "",
              taxNumber: ""
            }}
            validationSchema={formSchema}
            onSubmit={values=>{this.handleSubmit(values)}}
           
           
            
            render={({ errors, touched }) => (
              <Form>
                
               
                <FormGroup className="mb-3">
                  <Label for="required">Supplier Name</Label>
                  <Field
                    name="name"
                    id="name"
                    className={`form-control ${errors.name &&
                      touched.name &&
                      "is-invalid"}`}
                  />
                  {errors.name && touched.name ? (
                    <div className="invalid-tooltip mt-25">{errors.name}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="my-3">
                  <Label for="required">Contact Full Name</Label>
                  <Field
                    name="contactName"
                    id="contactName"
                    className={`form-control ${errors.contactName &&
                      touched.contactName &&
                      "is-invalid"}`}
                  />
                  {errors.contactName && touched.contactName ? (
                    <div className="invalid-tooltip mt-25">{errors.contactName}</div>
                  ) : null}
                </FormGroup>
               {/* <FormGroup className="my-3">
                  <Label for="required">Contact Surname</Label>
                  <Field
                    name="contactSurname"
                    id="contactSurname"
                    className={`form-control ${errors.required &&
                      touched.required &&
                      "is-invalid"}`}
                  />
                  {errors.required && touched.required ? (
                    <div className="invalid-tooltip mt-25">{errors.required}</div>
                  ) : null}
                  </FormGroup>*/}
                <FormGroup className="my-3">
                  <Label for="email">Contact Email</Label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className={`form-control ${errors.email &&
                      touched.email &&
                      "is-invalid"}`}
                  />
                  {errors.email && touched.email ? (
                    <div className="invalid-tooltip mt-25">{errors.email}</div>
                  ) : null}
                </FormGroup>
                
                <FormGroup className="my-3">
                  <Label for="tel">Contact Number</Label>
                  <Field
                    name="tel"
                    id="tel"
                    className={`form-control ${errors.tel &&
                      touched.tel &&
                      "is-invalid"}`}
                  />
                  {errors.tel && touched.tel ? (
                    <div className="invalid-tooltip mt-25">{errors.tel}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="my-3">
                  <Label for="taxNumber">
                    Tax Number 
                  </Label>
                  <Field
                    name="taxNumber"
                    id="taxNumber"
                    className={`form-control ${errors.taxNumber &&
                      touched.taxNumber &&
                      "is-invalid"}`}
                  />
                  {errors.taxNumber && touched.taxNumber ? (
                    <div className="invalid-tooltip mt-25">{errors.taxNumber}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="my-3">
                  <Label for="addressLine">
                    Address Line
                  </Label>
                  <Field
                    name="addressLine"
                    id="addressLine"
                    className={`form-control ${errors.addressLine &&
                      touched.addressLine &&
                      "is-invalid"}`}
                  />
                  {errors.addressLine && touched.addressLine ? (
                    <div className="invalid-tooltip mt-25">{errors.addressLine}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="my-3">
                  <Label for="country">
                    Country 
                  </Label>
                  <Field
                    name="country"
                    id="country"
                    className={`form-control ${errors.country &&
                      touched.country &&
                      "is-invalid"}`}
                  />
                  {errors.country && touched.country ? (
                    <div className="invalid-tooltip mt-25">{errors.country}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="my-3">
                  <Label for="city">
                    City 
                  </Label>
                  <Field
                    name="city"
                    id="city"
                    className={`form-control ${errors.city &&
                      touched.city &&
                      "is-invalid"}`}
                  />
                  {errors.city && touched.city ? (
                    <div className="invalid-tooltip mt-25">{errors.city}</div>
                  ) : null}
                </FormGroup>
                
                <Button.Ripple color="primary" type="submit"
                
                >
                  Submit
                </Button.Ripple>
                
                
              
              </Form>
            )}
          />
          </ModalBody>
          </Modal>  
              
        
        </div>
      
    )
    
  }
}
export default AggridTable
