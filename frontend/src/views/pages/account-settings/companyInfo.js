import React from "react"
import { Button, Form, FormGroup, Input, Label, Row, Col } from "reactstrap"
import Select from "react-select"
import chroma from "chroma-js"
import Radio from "../../../components/@vuexy/radio/RadioVuexy"
import Flatpickr from "react-flatpickr";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

const languages = [
  { value: "english", label: "English", color: "#7367f0" },
  { value: "french", label: "French", color: "#7367f0" },
  { value: "spanish", label: "Spanish", color: "#7367f0" },
  { value: "russian", label: "Russian", color: "#7367f0" },
  { value: "italian", label: "Italian", color: "#7367f0" }
]

const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: "white" }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = data.color ? chroma(data.color) : "#7367f0"
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.1).css()
        : null,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled && (isSelected ? data.color : "#7367f0")
      }
    }
  },
 
}

class CompanyInfoTab extends React.Component {
  state = {
    companyName:this.props.values.loggedInUser.companyId.companyName,
    bio:this.props.values.loggedInUser.companyId.bio,
    city:this.props.values.loggedInUser.companyId.city,
    country:this.props.values.loggedInUser.companyId.country,
    tel:this.props.values.loggedInUser.companyId.tel,
    email:this.props.values.loggedInUser.companyId.email,
    logo:this.props.values.loggedInUser.companyId.logo,
    website:this.props.values.loggedInUser.companyId.website,
    addressLine:this.props.values.loggedInUser.companyId.addressLine
  }

  handleDob = date => {
    this.setState({
      dob: date
    })
  }
  componentWillMount(){
    

  }

  handleSubmit = obj => {
    console.log(obj)
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
    .post("http://localhost:5000/company/update/"+this.props.values.loggedInUser.companyId["_id"], obj,config
    )
    .then(response => {
      if(response.status==200){
     toast.success(response.data)
      }else{
        toast.error(response.data) 
      }
    }).catch(err=>console.log(err))
     
      
  }
  render() {
    
    return (
      <React.Fragment>
        <ToastContainer />
        <Form >
          <Row>
          <Col sm="12">
              
              <FormGroup>
                <Label for="name">Company Name</Label>
                <Input 
                type="text" 
                id="name" 
                placeholder="Company" 
                defaultValue={this.state.companyName}
                onChange={e => this.setState({ companyName: e.target.value })} />
              </FormGroup>
              </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="bio">Bio</Label>
                <Input
                  type="textarea"
                  name="bio"
                  id="bio"
                  rows="3"
                  placeholder="Your bio data here..."
                  defaultValue={this.state.bio}
                  onChange={e => this.setState({ bio: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
                <FormGroup>
                  <Label for="EmailVertical">Email</Label>
                  <Input
                    type="email"
                    name="Email"
                    id="EmailVertical"
                    placeholder="Email"
                    defaultValue={this.state.email}
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col sm="12">
              <FormGroup>
                <Label for="number">Phone Number</Label>
                <Input
                  type="text"
                  name="number"
                  id="number"
                  defaultValue={this.state.tel}
                  onChange={e => this.setState({ tel: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              
            <FormGroup>
              <Label for="address1">Address Line 1</Label>
              <Input 
              type="text" 
              id="address1" 
              defaultValue={this.state.addressLine}
              onChange={e => this.setState({ addressLine: e.target.value })} />
            </FormGroup>
            </Col>
            <Col sm="12"></Col>
            <Col sm="12">
              <FormGroup>
                <Label for="country">Country</Label>
                <Input
                 type="text" 
                 name="country"
                  id="country" 
                  defaultValue={this.state.country}
                  onChange={e => this.setState({ country: e.target.value })}>
                </Input>
              </FormGroup>
            </Col>
            <Col sm="12">
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                defaultValue="Pretoria"
                id="city"
                defaultValue={this.state.city}
                onChange={e => this.setState({ city: e.target.value })}
              />
            </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="url">Website URL</Label>
                <Input
                  type="url"
                  name="url"
                  id="url"
                  defaultValue={this.state.website}
                  onChange={e => this.setState({ website: e.target.value })}
                />
              </FormGroup>
            </Col>
            <Col sm="12">
              <FormGroup>
                <Label for="url">Logo URL</Label>
                <Input
                  type="url"
                  name="url"
                  id="url"
                  defaultValue={this.state.logo}
                  onChange={e => this.setState({ logo: e.target.value })}
                />
              </FormGroup>
            </Col>
            
            <Col className="d-flex justify-content-start flex-wrap" sm="12">
              <Button.Ripple className="mr-50" onClick={() => this.handleSubmit(this.state)} color="primary">
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
export default CompanyInfoTab
