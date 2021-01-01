import React from "react"
import { Row, Col,Button } from "reactstrap"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard"
import { Link } from "react-router-dom"
import { history } from "../../history"
import {
  Monitor,
  UserCheck,
  Mail,
  Eye,
  MessageSquare,
  ShoppingBag,
  Heart,
  Smile,
  Cpu,
  Server,
  Activity,
  AlertOctagon,
  Trash2,
  PenTool,
  Truck,
  Check,
  Plus
} from "react-feather"


class StatisticsCards extends React.Component {
draftclick(){
  
}
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Stock Orders"
          breadCrumbParent="Orders"
          breadCrumbActive="Stock Orders"
        />
        <Row>
        <Col  sm="12" className="mb-1">
          <div className="table-input ml-1">
                    <Button
                    className="add-new-btn"
                    color="primary"
                    onClick={() => {history.push("/createOrders/")}}
                    outline>
                    <Plus size={15} className="mr-50"/>
                    <span className="align-middle">Add New</span>
                  </Button>
                    </div>
          </Col>
          <Col xl="3" lg="3" sm="6">
          <Link to="/orderslist/draft">
            <StatisticsCard
              hideChart
              iconBg="primary"
              icon={<PenTool className="primary" size={22}/>}
              stat="25"
              statTitle="Draft Orders"
              
            />
            </Link>
          </Col>
          <Col xl="3" lg="3" sm="6">
          <Link to="/orderslist/progress">
            <StatisticsCard
              hideChart
              iconBg="success"
              icon={<Truck className="warning" size={22} />}
              stat="30"
              statTitle="Orders In Progress"
            />
            </Link>
          </Col>
          <Col xl="3" lg="3" sm="6">
          <Link to="/orderslist/deleted">
            <StatisticsCard
              hideChart
              iconBg="warning"
              icon={<Trash2 className="danger" size={22} />}
              stat="97"
              statTitle="Deleted Orders"
            />
            </Link>
          </Col>
          <Col xl="3" lg="3" sm="6">
          <Link to="/orderslist/completed">
            <StatisticsCard
              hideChart
              iconBg="danger"
              icon={<Check className="success" size={22} />}
              stat="124"
              statTitle="Completed Orders"
            />
            </Link>
          </Col>
         
          
          
          
        </Row>
      </React.Fragment>
    )
  }
}

export default StatisticsCards
