import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Spinner
} from "reactstrap"
import axios from "axios"
import { ContextLayout } from "../../utility/context/Layout"
import { AgGridReact } from "ag-grid-react"
import {
  Edit,
  Trash2,
  Plus,
  ChevronDown,
  Clipboard,
  Printer,
  Download,
  RotateCw,
  X,
  Send
} from "react-feather"
import classnames from "classnames"
import EditOrderForm from "./Edit/EditOrderForm"
import { history } from "../../history"
import "../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../assets/scss/pages/users.scss"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
class UsersList extends React.Component {
  state = {
    editData:"",
    modal: false,
    rowData: null,
    pageSize: 20,
    isVisible: true,
    reload: false,
    collapse: true,
    status: "Opened",
    role: "All",
    selectStatus: "All",
    verified: "All",
    department: "All",
    currentFilter: this.props.match.params.filter,
    defaultColDef: {
      sortable: true
    },
    searchVal: "",
    columnDefs: [
      {
        headerName: "ID",
        field: "orderId",
        width: 300,
        filter: true,
        checkboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        headerCheckboxSelection: true,
        cellRendererFramework: params => {
          return (
            <div
              className="d-flex align-items-center cursor-pointer"
              onClick={() => history.push("/supplyOrder/"+params.data["_id"])}
            >
              
              <span>{params.data["orderId"]}</span>
            </div>
          )
        }
        
      },
      {
        headerName: "Supplier Id",
        field: "supplierId.name",
        filter: true,
        width: 250,
        
      },
      
      {
        headerName: "Order Date",
        field: "orderDate",
        filter: true,
        width: 200
      },
      
      {
        headerName: "Status",
        field: "status",
        filter: true,
        width: 150,
        cellRendererFramework: params => {
          return params.value === "completed" ? (
            <div className="badge badge-pill badge-light-success">
              {params.value}
            </div>
          ) : params.value === "deleted" ? (
            <div className="badge badge-pill badge-light-danger">
              {params.value}
            </div>
          ) : params.value === "draft" ? (
            <div className="badge badge-pill badge-light-warning">
              {params.value}
            </div>
          ) : params.value === "progress" ? (
            <div className="badge badge-pill badge-light-warning">
              {params.value}
            </div>
          ): null
        }
      },
      {
        headerName: "Paid",
        field: "paid",
        filter: true,
        width: 200
      },
      {
        headerName: "Recieved",
        field: "recieved",
        filter: true,
        width: 200
      },
      {
        headerName: "Actions",
        field: "transactions",
        width: 150,
        cellRendererFramework: params => {
          return (
            <div className="actions cursor-pointer">
              <Edit
                className="mr-50"
                size={15}
                onClick={()=>{
                  this.setState({editData:params.data})
                  this.toggleModal()}}
              />
              <Trash2
              className="mr-50"
                size={15}
                onClick={() => {
                  this.handleDelete(params.data)}}
              />
              <Send
              className="mr-50"
                size={15}
                onClick={() => {
                  console.log(params)
                  history.push("/supplyOrder/"+params.data["_id"])
                
                }}
              />
            </div>
          )
        }
      }
    ],
    defaultColDef: { flex: 1 },
  groupDefaultExpanded: 1,
  detailCellRendererParams: {
    detailGridOptions: {
      columnDefs: [
        {
          field: 'a2',
          cellRenderer: 'agGroupCellRenderer',
        },
        { field: 'b2' },
      ],
    },
    getDetailRowData: function (params) {
      params.successCallback(params.data.children);
    },
  },
  }

   async refreshGridValues(){
    const token=localStorage.getItem('token')
 
    const config={
      headers:{
        'content-type':"application/json"
      }
    }
    if (token){
      config.headers['x-auth-token']=token;
      
    }
  
    await axios.post("http://localhost:5000/orders/ordersByStatus/",{status:this.state.currentFilter}, config).then(response => {
      let rowData = response.data.data
      console.log(rowData)
      JSON.stringify(rowData)
      this.setState({ rowData })
      
    }).catch(err=>console.log(err))
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
  
     await axios.post("http://localhost:5000/orders/ordersByStatus/",{status:this.state.currentFilter}, config).then(response => {
      let rowData = response.data.data
      console.log(rowData)
      JSON.stringify(rowData)
      this.setState({ rowData })
      
    }).catch(err=>console.log(err))
    
  }

  handleDelete(data){
    let selectedData = this.gridApi.getSelectedRows()
    this.gridApi.updateRowData({ remove: selectedData })
    var status="deleted"
    if(data.status=="deleted") {
      if (data.paid &&data.recieved){
        status="completed"
    }else{
      status="progress"
    }
    }else{
     
        status="deleted"
      
  }
  var order={
    status
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
      console.log(data)
       axios
        .post("http://localhost:5000/orders/updateStatus/"+data['_id'],order,config
        )
        .then(response => {
          console.log(response)
          //dispatch(getData(params))
        })
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  onGridReady = params => {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
  }

  filterData = (column, val) => {
    var filter = this.gridApi.getFilterInstance(column)
    var modelObj = null
    if (val !== "all") {
      modelObj = {
        type: "equals",
        filter: val
      }
    }
    filter.setModel(modelObj)
    this.gridApi.onFilterChanged()
  }

  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        pageSize: val
      })
    }
  }
  updateSearchQuery = val => {
    this.gridApi.setQuickFilter(val)
    this.setState({
      searchVal: val
    })
  }

  refreshCard = () => {
    this.setState({ reload: true })
    setTimeout(() => {
      this.setState({
        reload: false,
        role: "All",
        selectStatus: "All",
        verified: "All",
        department: "All"
      })
    }, 500)
  }

  

  render() {
    const { rowData, columnDefs, defaultColDef, pageSize } = this.state
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Draft Orders"
          breadCrumbParent="Stock Orders"
          breadCrumbActive="Draft Orders"
        />
       <Row className="app-user-list">
        <Col sm="12">
          <Card>
            <CardBody>
              <div className="ag-theme-material ag-grid-table">
                <div className="ag-grid-actions d-flex justify-content-between flex-wrap mb-1">
                  <div className="sort-dropdown">
                    <UncontrolledDropdown className="ag-dropdown p-1">
                      <DropdownToggle tag="div">
                        1 - {pageSize} of 150
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
                          onClick={() => this.filterSize(150)}
                        >
                          150
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </div>
                  <div className="table-input ml-1">
                    <Button
                    className="add-new-btn"
                    color="primary"
                    onClick={() => {this.refreshGridValues()}}
                    outline>
                    <span className="align-middle">Refresh</span>
                  </Button>
                    </div>
                  <div className="filter-actions d-flex">
                    <Input
                      className="w-50 mr-1 mb-1 mb-sm-0"
                      type="text"
                      placeholder="search..."
                      onChange={e => this.updateSearchQuery(e.target.value)}
                      value={this.state.searchVal}
                    />
                    <div className="dropdown actions-dropdown">
                      <UncontrolledButtonDropdown>
                        <DropdownToggle className="px-2 py-75" color="white">
                          Actions
                          <ChevronDown className="ml-50" size={15} />
                        </DropdownToggle>
                        <DropdownMenu right>
                          <DropdownItem tag="a">
                            <Trash2 size={15} />
                            <span className="align-middle ml-50">Delete</span>
                          </DropdownItem>
                          <DropdownItem tag="a">
                            <Clipboard size={15} />
                            <span className="align-middle ml-50">Archive</span>
                          </DropdownItem>
                          <DropdownItem tag="a">
                            <Printer size={15} />
                            <span className="align-middle ml-50">Print</span>
                          </DropdownItem>
                          <DropdownItem tag="a">
                            <Download size={15} />
                            <span className="align-middle ml-50">CSV</span>
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledButtonDropdown>
                    </div>
                  </div>
                </div>
                {this.state.rowData !== null ? (
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
                        floatingFilter={true}
                        pagination={true}
                        pivotPanelShow="always"
                        paginationPageSize={pageSize}
                        resizable={true}
                        enableRtl={context.state.direction === "rtl"}
                      />
                    )}
                  </ContextLayout.Consumer>
                ) : null}
              </div>
            </CardBody>
          </Card>
          <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggleModal}
                  className="modal-dialog-centered modal-lg"
                >
                  <ModalHeader toggle={this.toggleModal}>
                    Edit Order {this.state.editData.orderId}
                  </ModalHeader>
                  <ModalBody>
                    <EditOrderForm
                    order={this.state.editData}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggleModal}>
                      Accept
                    </Button>{" "}
                  </ModalFooter>
                </Modal>
        </Col>
      </Row>
      </React.Fragment>
    )
  }
}

export default UsersList



