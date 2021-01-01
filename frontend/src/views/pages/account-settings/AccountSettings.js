import React from "react"
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardBody
} from "reactstrap"
import classnames from "classnames"
import { Settings, Lock, Info, Instagram, Link, Bell } from "react-feather"
import GeneralTab from "./General"
import ChangePassword from "./ChangePassword"
import CompanyInfoTab from "./companyInfo"
import SocialLinks from "./SocialLinks"
import Connection from "./Connection"
import Notifications from "./Notifications"
import { connect } from "react-redux"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import { loginWithJWT } from "../../../redux/actions/auth/loginActions"

import "../../../assets/scss/pages/account-settings.scss"

class AccountSettings extends React.Component {
  state = {
    activeTab: "1",
    windowWidth: null
  }

  toggle = tab => {
    this.setState({
      activeTab: tab
    })
  }

  updateWidth = () => {
    this.setState({ windowWidth  : window.innerWidth })
  }

  componentDidMount() {
    if(window !== undefined){
      this.updateWidth()
      window.addEventListener("resize", this.updateWidth)
    }
  }

  componentWillMount() {
   
  }
  

  render() {
    let {windowWidth} = this.state
    let {values}=this.props.values
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Account Settings"
          breadCrumbParent="Pages"
          breadCrumbActive="Account Settings"
        />
        <div className={`${windowWidth >= 769 ? "nav-vertical" : "account-setting-wrapper"}`}>
          <Nav className="account-settings-tab nav-left mr-0 mr-sm-3" tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "1"
                })}
                onClick={() => {
                  this.toggle("1")
                }}
              >
                <Settings size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">General</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "2"
                })}
                onClick={() => {
                  this.toggle("2")
                }}
              >
                <Lock size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Change Password</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "3"
                })}
                onClick={() => {
                  this.toggle("3")
                }}
              >
                <Info size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Company Info</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "4"
                })}
                onClick={() => {
                  this.toggle("4")
                }}
              >
                <Instagram size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Social Links</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "5"
                })}
                onClick={() => {
                  this.toggle("5")
                }}
              >
                <Link size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Connections</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "6"
                })}
                onClick={() => {
                  this.toggle("6")
                }}
              >
                <Bell size={16} />
                <span className="d-md-inline-block d-none align-middle ml-1">Notifications</span>
              </NavLink>
            </NavItem>
          </Nav>
          <Card>
            <CardBody>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <GeneralTab
                  values={values}
                  />
                </TabPane>
                <TabPane tabId="2">
                  <ChangePassword
                  values={values}
                   />
                </TabPane>
                <TabPane tabId="3">
                  <CompanyInfoTab
                  values={values}
                  />
                </TabPane>
                <TabPane tabId="4">
                  <SocialLinks />
                </TabPane>
                <TabPane tabId="5">
                  <Connection />
                </TabPane>
                <TabPane tabId="6">
                  <Notifications />
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    values: state.auth.login
  }
}

export default connect(mapStateToProps, { loginWithJWT })(AccountSettings)