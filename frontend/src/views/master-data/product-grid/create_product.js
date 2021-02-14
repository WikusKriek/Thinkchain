import React from "react"
import Sidebar from "./addProductsSidebar"
import { ToastContainer, toast } from "react-toastify"
import {
  Card,
  CardBody,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownItem,
  DropdownToggle,
  Label,
  FormGroup,
} from "reactstrap"
import {
  Edit,
  Trash,
  ChevronDown,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight
} from "react-feather"
import { AgGridReact } from "ag-grid-react"
import { ContextLayout } from "../../../utility/context/Layout"
import SweetAlert from 'react-bootstrap-sweetalert';

import classnames from "classnames"
import { history } from "../../../history"

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
  qty: Yup.number()
    .required("Required"),
    costPrice: Yup.number()
    .required("Required"),
  salePrice: Yup.number()
    .required("Required"),
  number: Yup.string()
  .required("Required"),
  minQty: Yup.number()
    .required("Required"),
  recQty: Yup.number()
    .required("Required"),
  
})

class AggridTable extends React.Component {
  state = {
    rowData:[],
    defaultAlert : false, 
   confirmAlert : false, 
   cancelAlert : false, 
    editType: 'fullRow',
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    sidebar: false,
    modal: false,
    allData: [],
    value: "",
    rowsPerPage: 4,
    currentData: null,
    selected: [],
    suppliers:[{value:""}],
    totalRecords: 0,
    sortIndex: [],
    addNew: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
      
    },
    columnDefs: [
      {
        headerName: "Product Number",
        field: "number",
        minWidth: 250,
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
        headerName: "Sale price",
        field: "salePrice",
        filter: true,
        minWidth: 150,
        
      },
      {
        headerName: "Cost Price",
        field: "costPrice",
        filter: true,
        minWidth: 150
      },
      {
        headerName: "Qty",
        field: "qty",
        filter: true,
        minWidth: 150
      },
      {
        headerName: "Consignment",
        field: "consignment",
        filter: true,
        minWidth: 150
      },
      {
        headerName: "Packaging",
        field: "packaging",
        filter: true,
        minWidth: 150
      },
      {
        headerName: "Min Qty",
        field: "minQty",
        filter: "agNumberColumnFilter",
        minWidth: 140
      },
      {
        headerName: "Rec Qty",
        field: "recQty",
        filter: "agNumberColumnFilter",
        minWidth: 140
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
  
     axios.get("http://localhost:5000/products/", config).then(response => {
      let rowData = response.data.data
      JSON.stringify(rowData)
      this.setState({ rowData })
      
    }).catch(err=>console.log(err))
  
    
    
  
     axios.get("http://localhost:5000/supplier/list/", config).then(response => {
      let suppliers = response.data.data
      if (suppliers.lengst!=0){
      JSON.stringify(suppliers)
      this.setState({ suppliers })
      }
      
      
    }).catch(err=>console.log(err))
    
  }

  handleAlert = (state, value) => {
    this.setState({ [state] : value })
    if(state=='confirmAlert'){
      if(this.gridApi.getSelectedNodes().length>0){
        for (var row of this.gridApi.getSelectedNodes() ){
          axios
          .delete("http://localhost:5000/products/"+row.data['_id'], 
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
      .post("http://localhost:5000/products/add/",obj,config
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
          toast.success(response.data.msg)
          
        this.toggleModal()
      }else{
        
          toast.error(response.data.msg)
          
      }
      })
      .catch(err=>{
        toast.error("Could Not Add Product")
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
  
     axios.get("http://localhost:5000/products/", config).then(response => {
      let rowData = response.data.data
      JSON.stringify(rowData)
      this.setState({ rowData })
      this.gridApi.setRowData(rowData)
      
    }).catch(err=>console.log(err))
  }
   onCellValueChanged=params=> {
    console.log('Data after change is', params);
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
      .post("http://localhost:5000/products/update/"+event.data['_id'], 
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
  toggleModal = () => {
    if (this.state.suppliers.length==0){
      setTimeout(() => {
        toast.error("Please add a supplier first")
      }, 200);
      history.push("/supplier-grid/")
      
    }else{
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }
  }

  render() {
    const { rowData, columnDefs, defaultColDef,sidebar,suppliers } = this.state
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
          suppliers={suppliers}
        />
        <div
          className={classnames("data-list-overlay", {
            show: sidebar
          })}
          onClick={() => this.handleSidebar(false, true)}
        />
        
        <Breadcrumbs
          breadCrumbTitle="Create Product"
          breadCrumbParent="Master Data"
          breadCrumbActive="Create Product"
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
            <p className="sweet-alert-text">Your product has been deleted.</p>
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
              Your product information is safe! :)
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
                      onCellValueChanged={this.onRowChanged.bind(this)}
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
                  Add Product
                </ModalHeader>
                <ModalBody>
              
                <Formik
            initialValues={{
              name: "",
              number: "",
              salePrice: "",
              costPrice: "",
              qty: "",
              minQty: "",
              recQty: "",
              consignment: false,
              packaging: false,
              supplierId:this.state.suppliers[0].value
            }}
            validationSchema={formSchema}
            onSubmit={values=>{this.handleSubmit(values)}}
           
           
            
            render={({ errors, touched }) => (
              <Form>
                <FormGroup >
              <Label for="languages">Supplier</Label>
              <Field
                as="select"
                name="supplierId"
                id="supplierId"
                
                className={`form-control ${errors.supplierId &&
                touched.supplierId &&
                "is-invalid"}`}
                  >
                     {this.state.suppliers.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
                  </Field>
                  {errors.supplierId && touched.supplierId ? (
                    <div className="invalid-tooltip mt-25">{errors.supplierId}</div>
                  ) : null}
              </FormGroup>
               
                <FormGroup className="mb-3">
                  <Label for="required">Product Name</Label>
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
                  <Label for="required">product Number</Label>
                  <Field
                    name="number"
                    id="number"
                    className={`form-control ${errors.number &&
                      touched.number &&
                      "is-invalid"}`}
                  />
                  {errors.number && touched.number ? (
                    <div className="invalid-tooltip mt-25">{errors.number}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="my-3">
                  <Label for="costPrice">
                    Cost Price 
                  </Label>
                  <Field
                    name="costPrice"
                    id="costPrice"
                    className={`form-control ${errors.costPrice &&
                      touched.costPrice &&
                      "is-invalid"}`}
                  />
                  {errors.costPrice && touched.costPrice ? (
                    <div className="invalid-tooltip mt-25">{errors.costPrice}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="my-3">
                  <Label for="salePrice">Sale Price</Label>
                  <Field
                    name="salePrice"
                    id="salePrice"
                    className={`form-control ${errors.salePrice &&
                      touched.salePrice &&
                      "is-invalid"}`}
                  />
                  {errors.salePrice && touched.salePrice ? (
                    <div className="invalid-tooltip mt-25">{errors.salePrice}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="ml-2">
                  
                  <Field
                    type="checkbox"
                    name="consignment"
                    id="consignment"
                    className={`form-check-input  ${errors.consignment &&
                      touched.consignment &&
                      "is-invalid"}`}
                  />
                  <Label for="consignment">
                    Consignment 
                  </Label>
                  {errors.consignment && touched.consignment ? (
                    <div className="invalid-tooltip mt-25">{errors.consignment}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="ml-2">
                  
                  <Field
                    type="checkbox"
                    name="packaging"
                    id="packaging"
                    className={`form-check-input  ${errors.packaging &&
                      touched.packaging &&
                      "is-invalid"}`}
                  />
                  <Label for="packaging">
                    Packaging 
                  </Label>
                  {errors.packaging && touched.packaging ? (
                    <div className="invalid-tooltip mt-25">{errors.packaging}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="my-3">
                  <Label for="recQty">
                    Recorded Qty
                  </Label>
                  <Field
                    name="recQty"
                    id="recQty"
                    className={`form-control ${errors.recQty &&
                      touched.recQty &&
                      "is-invalid"}`}
                  />
                  {errors.recQty && touched.recQty ? (
                    <div className="invalid-tooltip mt-25">{errors.recQty}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="my-3">
                  <Label for="qty">Qty</Label>
                  <Field
                    name="qty"
                    id="qty"
                    className={`form-control ${errors.qty &&
                      touched.qty &&
                      "is-invalid"}`}
                  />
                  {errors.qty && touched.qty ? (
                    <div className="invalid-tooltip mt-25">{errors.qty}</div>
                  ) : null}
                </FormGroup>

                <FormGroup className="my-3">
                  <Label for="minQty">
                    Minimum Qty
                  </Label>
                  <Field
                    name="minQty"
                    id="minQty"
                    className={`form-control ${errors.minQty &&
                      touched.minQty &&
                      "is-invalid"}`}
                  />
                  {errors.minQty && touched.minQty ? (
                    <div className="invalid-tooltip mt-25">{errors.minQty}</div>
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
