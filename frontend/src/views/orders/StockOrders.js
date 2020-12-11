import React from "react"
import { Row, Col } from "reactstrap"
import Breadcrumbs from "../../components/@vuexy/breadCrumbs/BreadCrumb"
import StatisticsCard from "../../components/@vuexy/statisticsCard/StatisticsCard"
import { Link } from "react-router-dom"
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
  Check
} from "react-feather"


class StatisticsCards extends React.Component {
draftclick(){
  
}
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Statistics Cards"
          breadCrumbParent="Card"
          breadCrumbActive="Statistics Cards"
        />
        <Row>
          <Col xl="3" lg="3" sm="6">
          <Link to="/orderslist/all">
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
          <Link to="/app/user/list">
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
            <StatisticsCard
              hideChart
              iconBg="warning"
              icon={<Trash2 className="danger" size={22} />}
              stat="97"
              statTitle="Deleted Orders"
            />
          </Col>
          <Col xl="3" lg="3" sm="6">
            <StatisticsCard
              hideChart
              iconBg="danger"
              icon={<Check className="success" size={22} />}
              stat="124"
              statTitle="Completed Orders"
            />
          </Col>
          
          
          
        </Row>
      </React.Fragment>
    )
  }
}

export default StatisticsCards
