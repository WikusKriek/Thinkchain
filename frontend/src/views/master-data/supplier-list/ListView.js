import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import ListViewConfig from "./SupplierListConfig"
import queryString from "query-string"
class ListView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="List View"
          breadCrumbParent="Master Data"
          breadCrumbActive="Suppliers View"
        />
        <Row>
          <Col sm="12">
            <ListViewConfig parsedFilter={queryString.parse(this.props.location.search)}/>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default ListView
