// ** Invoice Add Components
import React from "react"
import AddCard from './AddCard'
import AddActions from './AddActions'

// ** Third Party Components
import { Row, Col } from 'reactstrap'

// ** Styles
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import '../../../assets/scss/pages/app-invoice.scss'
class InvoiceAdd extends React.Component {
render() {
  return (
    <div className='invoice-add-wrapper'>
      <Row className='invoice-add'>
        <Col xl={9} md={8} sm={12}>
          <AddCard />
        </Col>
        <Col xl={3} md={4} sm={12}>
          <AddActions />
        </Col>
      </Row>
    </div>
  )
}
}

export default InvoiceAdd