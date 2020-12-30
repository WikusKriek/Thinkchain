import React from "react"
import {
  Card,
  CardBody,
  Row,
  Col,
  Media,
  Table,
  InputGroup,
  Input,
  InputGroupAddon,
  Button
} from "reactstrap"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import logo from "../../assets/img/logo/logo.png"
import { Mail, Phone, FileText, Download,DollarSign } from "react-feather"
import axios from "axios"


import "../../assets/scss/pages/invoice.scss"

class Invoice extends React.Component {
  state = {
    items:[],
     rowData:{supplierId:{
       name:"",
       email:"",
       contactName:"",
       contactSurname:"",
       city:"",
       country:"",
       taxNumber:""
     }},
    currentFilter: this.props.match.params.filter
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
  
     await axios.get("http://localhost:5000/orders/"+this.state.currentFilter, config).then(response => {
      let rowData = response.data.data
      JSON.stringify(rowData)
      this.setState({ rowData })
      let items=[];
      let total=0;
      for (var product of rowData.products){
        total=total+product.subtotal;
        items.push(<tr key={product.product["_id"]}>
          <td>{product.product.name}</td>
          <td>{product.qty}</td>
          <td>{product.product.costPrice}</td>
          <td>{product.subtotal}</td>
        </tr>)
      }
      this.setState({items})
      this.setState({total})
    }).catch(err=>console.log(err))
  }
  render() {
    console.log(this.state.rowData)
    const {products,supplierId,orderId}=this.state.rowData;
    const {items,total} =this.state;
    const date= new Date().toDateString();
    const imgStyle = {
      maxHeight: 300,
      maxWidth: 300
    }
    
    
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Invoice"
          breadCrumbParent="Pages"
          breadCrumbActive="Invoice"
        />
        <Row>
          <Col className="mb-1 invoice-header" md="5" sm="12">
            <InputGroup>
              <Input placeholder="Email" />
              <InputGroupAddon addonType="append">
                <Button.Ripple color="primary" outline>
                  Send Invoice
                </Button.Ripple>
              </InputGroupAddon>
            </InputGroup>
          </Col>
          <Col
            className="d-flex flex-column flex-md-row justify-content-end invoice-header mb-1"
            md="7"
            sm="12"
          >
            <Button
              className="mr-1 mb-md-0 mb-1"
              color="primary"
              onClick={() =>{
                document.title='Order-'+orderId
                 window.print()}}
            >
              <FileText size="15" />
              <span className="align-middle ml-50">Print</span>
            </Button>
            <Button.Ripple color="primary" outline >
              <Download size="15" />
              <span className="align-middle ml-50">Download</span>
            </Button.Ripple>
          </Col>
          <Col className="invoice-wrapper" sm="12">
            <Card className="invoice-page">
              <CardBody>
                <Row>
                  <Col md="6" sm="12" className="pt-1">
                    <Media className="pt-1" >
                      <img src="https://i1.wp.com/hambahealth.com/wp-content/uploads/2020/04/cropped-Website-Header-2.png?fit=797%2C167&ssl=1" alt="logo" style={imgStyle}/>
                    </Media>
                  </Col>
                  <Col md="6" sm="12" className="text-right">
                    <h1>Invoice</h1>
                    <div className="invoice-details mt-2">
                      <h6>INVOICE NO.</h6>
                      <p>{orderId}</p>
                      <h6 className="mt-2">INVOICE DATE</h6>
                      <p>{date}</p>
                    </div>
                  </Col>
                </Row>
                <Row className="pt-2">
                  <Col md="6" sm="12">
                    <h5>Recipient</h5>
                    
                    <div className="recipient-info my-2">
                    <h6>{supplierId.name}</h6>
                      <p>{supplierId.contactName}</p>
                      <p>{supplierId.addressLine}</p>
                      <p>{supplierId.country}</p>
                      <p>{supplierId.city}</p>
                    </div>
                    <div className="recipient-contact pb-2">
                      <p>
                        <Mail size={15} className="mr-50" />
                        {supplierId.email}
                      </p>
                      <p>
                        <Phone size={15} className="mr-50" />
                        {supplierId.tel}
                      </p>
                      <p>
                        <DollarSign size={15} className="mr-50" />
                        {"Tax Num: "+supplierId.taxNumber}
                      </p>
                    </div>
                  </Col>
                  <Col md="6" sm="12" className="text-right">
                    <h5>Microsion Technologies Pvt. Ltd.</h5>
                    <div className="company-info my-2">
                      <p>9 N. Sherwood Court</p>
                      <p>Elyria, OH</p>
                      <p>94203</p>
                    </div>
                    <div className="company-contact">
                      <p>
                        <Mail size={15} className="mr-50" />
                        hello@pixinvent.net
                      </p>
                      <p>
                        <Phone size={15} className="mr-50" />
                        +91 999 999 9999
                      </p>
                    </div>
                  </Col>
                </Row>
                <div className="invoice-items-table pt-1">
                  <Row>
                    <Col sm="12">
                      <Table responsive borderless>
                        <thead>
                          <tr>
                            <th>PRODUCT</th>
                            <th>QTY</th>
                            <th>PRICE</th>
                            <th>AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>{items}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
                <div className="invoice-total-table">
                  <Row>
                    <Col
                      sm={{ size: 7, offset: 5 }}
                      xs={{ size: 7, offset: 5 }}
                    >
                      <Table responsive borderless>
                        <tbody>
                          
                          <tr>
                            <th>TOTAL</th>
                            <td>R {total}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
                <div className="text-right pt-3 invoice-footer">
                  <p>
                    Transfer the amounts to the business amount below. Please
                    include invoice number on your check.
                  </p>
                  <p className="bank-details mb-0">
                    <span className="mr-4">
                      BANK: <strong>FTSBUS33</strong>
                    </span>
                    <span>
                      IBAN: <strong>G882-1111-2222-3333</strong>
                    </span>
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default Invoice
