import React from "react"
import { Button, FormGroup, Row, Col } from "reactstrap"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import axios from "axios"
const formSchema = Yup.object().shape({
  oldpass: Yup.string().required("Required"),
  newpass: Yup.string().required("Required"),
  confirmpass: Yup.string()
    .oneOf([Yup.ref("newpass"), null], "Passwords must match")
    .required("Required")
})
class ChangePassword extends React.Component {
  
  render() {
    let {values}=this.props
    return (
      <React.Fragment>
        <Row className="pt-1">
          <Col sm="12">
            <Formik
              initialValues={{
                oldpass: "",
                newpass: "",
                confirmpass: ""
              }}
              onSubmit={val=>{
                const token=localStorage.getItem('token')
 
                    const config={
                      headers:{
                        'content-type':"application/json"
                      }
                    }
                    if (token){
                      config.headers['x-auth-token']=token;
                      
                    }
                   axios
                    .post("http://localhost:5000/users/updatePassword/",val, config
                    
                    )
                    .then(response => {
                      if(response.status==200){
                    toast.success(response.data)
                      }else{
                        toast.error(response.data) 
                      }
                    }).catch(err=>console.log(err))
              }}
              validationSchema={formSchema}
            >
              {({ errors, touched }) => (
                <Form>
                  <ToastContainer />
                  
                  <FormGroup>
                    <Field
                      name="oldpass"
                      id="oldpass"
                      type={values.showPassword ? 'text' : 'password'}
                      className={`form-control ${errors.oldpass &&
                        touched.oldpass &&
                        "is-invalid"}`}
                      placeholder="Old Password"
                    />
                    {errors.oldpass && touched.oldpass ? (
                      <div className="text-danger">{errors.oldpass}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="newpass"
                      placeholder="New Password"
                      id="newpass"
                      type={values.showPassword ? 'text' : 'password'}
                      className={`form-control ${errors.newpass &&
                        touched.newpass &&
                        "is-invalid"}`}
                    />
                    {errors.newpass && touched.newpass ? (
                      <div className="text-danger">{errors.newpass}</div>
                    ) : null}
                  </FormGroup>
                  <FormGroup>
                    <Field
                      name="confirmpass"
                      id="confirmpass"
                      type={values.showPassword ? 'text' : 'password'}
                      className={`form-control ${errors.confirmpass &&
                        touched.confirmpass &&
                        "is-invalid"}`}
                      placeholder="Confirm Password"
                    />
                    {errors.confirmpass && touched.confirmpass ? (
                      <div className="text-danger">{errors.confirmpass}</div>
                    ) : null}
                  </FormGroup>
                  <div className="d-flex justify-content-start flex-wrap">
                    <Button.Ripple
                      className="mr-1 mb-1"
                      color="primary"
                      type="submit"
                    >
                      Save Changes
                    </Button.Ripple>
                    <Button.Ripple
                      className="mb-1"
                      color="danger"
                      type="reset"
                      outline
                    >
                      Cancel
                    </Button.Ripple>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
export default ChangePassword
