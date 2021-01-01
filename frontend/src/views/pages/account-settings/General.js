import React from "react"
import {
  Alert,
  Button,
  Media,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col
} from "reactstrap"
import img from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee ,faUser} from '@fortawesome/free-solid-svg-icons'
class General extends React.Component {
  state = {
    visible: true
  }

  dismissAlert = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    let {values}=this.props
    return (
      <React.Fragment>
        <Media>
          <Media className="mr-1" left href="#">
          <FontAwesomeIcon icon={faUser} size="3x"/>
          </Media>
          <Media className="mt-25" body>
            <div className="d-flex flex-sm-row flex-column justify-content-start px-0">
              <Button.Ripple
                tag="label"
                className="mr-50 cursor-pointer"
                color="primary"
                outline
              >
                Upload Photo
                <Input type="file" name="file" id="uploadImg" hidden />
              </Button.Ripple>
              <Button.Ripple color="flat-danger">Remove</Button.Ripple>
            </div>
            <p className="text-muted mt-50">
              <small>Allowed JPG, GIF or PNG. Max size of 800kB</small>
            </p>
    </Media>
        </Media>
        <Form className="mt-2" onSubmit={e => e.preventDefault()}>
          <Row>
            <Col sm="12">
              <FormGroup>
                <Label for="userName">Username</Label>
                <Input id="userName" defaultValue={values.loggedInUser.username} />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email" defaultValue={values.loggedInUser.email} />
              </FormGroup>
            </Col>
            {/*
            <Col sm="12">
              <Alert
                className="mb-2"
                color="warning"
                isOpen={this.state.visible}
                toggle={this.dismissAlert}
              >
                <p className="mb-0">
                  Your email is not confirmed. Please check your inbox.
                  <span className="text-primary"> Resend Confirmation</span>
                </p>
              </Alert>
            </Col>
            */}
            <Col sm="12">
              <FormGroup>
                <Label for="company">Company</Label>
                <Input
                  id="company"
                  defaultValue={values.loggedInUser.companyId.companyName}
                />
              </FormGroup>
            </Col>
            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple className="mr-50" type="submit" color="primary">
                Save Changes
              </Button.Ripple>
              <Button.Ripple type="submit" color="danger">
                Cancel
              </Button.Ripple>
            </Col>
          </Row>
        </Form>
      </React.Fragment>
    )
  }
}
export default General
