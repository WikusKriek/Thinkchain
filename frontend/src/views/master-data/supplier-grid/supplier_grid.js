import React from "react"
import Sidebar from "./addSupplierSidebar"
import {
  Card,
  CardBody,
  Input,
  Button,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
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
import classnames from "classnames"

import axios from "axios"


import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss"
import "../../../assets/scss/plugins/extensions/react-paginate.scss"
import "../../../assets/scss/pages/data-list.scss"

import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"

class AggridTable extends React.Component {
  state = {
    
    sidebar: false,
    addNew: "",
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
        headerName: "Contact Surname",
        field: "contactSurname",
        filter: true,
        minWidth: 150,
        
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
  onCellValueChanged = (event) => {
    console.log('Data after change is', event.data);
    axios
      .post("http://localhost:5000/supplier/update/"+event.data['_id'], 
        event.data
      )
      .then(response => {
       console.log(response) 
        
      })
  };

  deletevalues (){
    console.log(this.gridApi.getSelectedNodes())
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
  
  filterSize = val => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val))
      this.setState({
        currenPageSize: val,
        getPageSize: val
      })
    }
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
                    onClick={() => this.handleSidebar(true, true)}
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
                
                <ContextLayout.Consumer>
                  {context => (
                    <AgGridReact
                      gridOptions={{}}
                      rowSelection="multiple"
                      defaultColDef={defaultColDef}
                      columnDefs={columnDefs}
                      rowData={rowData}
                      onGridReady={this.onGridReady}
                      onCellValueChanged={this.onCellValueChanged.bind(this)}
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
        
        </div>
      
    )
  }
}
export default AggridTable
