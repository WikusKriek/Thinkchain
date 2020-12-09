import React, { Component } from "react"
import { Label, Input, FormGroup, Button } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"

class DataListSidebar extends Component {
  state = {
    _id:"",
    name: "",
    number:"",
    con:"",
    packaging:"true",
    qty:"",
    costPrice:"",
    salePrice:"",
    minQty:"",
    recQty:"",
    price: "",
    consign:"true",
    img: "" 
  }

  addNew = false

  componentDidUpdate(prevProps, prevState) {
    console.log('here')
    console.log(this.props.data)
    if (this.props.data !== null && prevProps.data === null) {
      
      if (this.props.data.name !== prevState.name) {
        this.setState({ name: this.props.data.name })
      }
      if (this.props.data.number !== prevState.number) {
        this.setState({ number: this.props.data.number })
      }
      
      if (this.props.data.con!== prevState.con) {
        this.setState({ con: this.props.con })
      }
      if (this.props.data.packaging !== prevState.packaging) {
        this.setState({ packaging: this.props.data.packaging })
      }
      if (this.props.data.costPrice !== prevState.costPrice) {
        this.setState({ costPrice: this.props.data.costPrice})
      }
      if (this.props.data.salePrice !== prevState.salePrice) {
        this.setState({ salePrice: this.props.data.salePrice })
      }
      if (this.props.data.img !== prevState.img) {
        this.setState({ img: this.props.data.img })
      }
      if (this.props.data.qty !== prevState.qty) {
        this.setState({ qty: this.props.data.qty })
      }
      if (this.props.data.minQty !== prevState.minQty) {
        this.setState({ minQty: this.props.data.minQty })
      }
      if (this.props.data.recQty!== prevState.recQty) {
        this.setState({ recQty: this.props.data.recQty})
      }
      if (this.props.data['_id']!== prevState['_id']) {
        this.setState({ _id: this.props.data['_id']})
      }
    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        _id:"",
        
        name: "",
        number:"",
        con:"",
        consign:"true",
        packaging:"true",
        qty:"",
        costPrice:"",
        salePrice:"",
        minQty:"",
        recQty:"",
        price: "",
        img: "" 
      })
    }
    if (this.addNew) {
      this.setState({
        _id:"",
        name: "",
        number:"",
        con:"",
        packaging:"true",
        qty:"",
        costPrice:"",
        salePrice:"",
        minQty:"",
        recQty:"",
        price: "",
        img: "",
        consign:"true" 
      })
    }
    this.addNew = false
  }

  handleSubmit = obj => {
    if (this.props.data !== null) {
      this.props.updateData(obj)
    } else {
      this.addNew = true
      this.props.addData(obj)
    }
    let params = Object.keys(this.props.dataParams).length
      ? this.props.dataParams
      : { page: 1, perPage: 4 }
    this.props.handleSidebar(false, true)
    this.props.getData(params)
  }

  render() {
    let { show, handleSidebar, data } = this.props
    let { number, name,packaging, qty, costPrice,salePrice,minQty,recQty, img,con,consign} = this.state
    return (
      <div
        className={classnames("data-list-sidebar", {
          show: show
        })}>
        <div className="data-list-sidebar-header mt-2 px-2 d-flex justify-content-between">
          <h4>{data !== null ? "UPDATE DATA" : "ADD NEW DATA"}</h4>
          <X size={20} onClick={() => handleSidebar(false, true)} />
        </div>
        <PerfectScrollbar
          className="data-list-fields px-2 mt-3"
          options={{ wheelPropagation: false }}>
          {this.props.thumbView && img.length ? (
            <FormGroup className="text-center">
              <img className="img-fluid" src={img} alt={name} />
              <div className="d-flex flex-wrap justify-content-between mt-2">
                <label
                  className="btn btn-flat-primary"
                  htmlFor="update-image"
                  color="primary">
                  Upload Image
                  <input
                    type="file"
                    id="update-image"
                    hidden
                    onChange={e =>
                      this.setState({
                        img: URL.createObjectURL(e.target.files[0])
                      })
                    }
                  />
                </label>
                <Button
                  color="flat-danger"
                  onClick={() => this.setState({ img: "" })}>
                  Remove Image
                </Button>
              </div>
            </FormGroup>
          ) : null}
          <FormGroup>
            <Label for="data-name">Number</Label>
            <Input
              type="text"
              value={number}
              placeholder="B-10648"
              onChange={e => this.setState({ number: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-name">Name</Label>
            <Input
              type="text"
              value={name}
              placeholder="Apple IphoneX"
              onChange={e => this.setState({ name: e.target.value })}
              id="data-name"
            />
          </FormGroup>
          
          
          <FormGroup>
            <Label for="data-popularity">Qty</Label>
            <Input
              type="number"
              value={qty}
              id="data-popularity"
              placeholder="1"
              onChange={e =>
                this.setState({
                   qty: e.target.value 
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-popularity">Minimum Qty</Label>
            <Input
              type="number"
              value={minQty}
              id="data-popularity"
              placeholder="10"
              onChange={e =>
                this.setState({
                   minQty: e.target.value 
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-popularity">Recorded Qty</Label>
            <Input
              type="number"
              value={recQty}
              id="data-popularity"
              placeholder="10"
              onChange={e => this.setState({recQty: e.target.value  })}
          />
          </FormGroup>
          <FormGroup>
            <Label for="data-status">Packaging</Label>
            <Input
              type="select"
              id="data-status"
              value={packaging}
              onChange={e => this.setState({ packaging: e.target.value })}>
              <option>true</option>
              <option>false</option>
              
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-status">Consignment</Label>
            <Input
              type="select"
              id="data-status"
              value={consign}
              onChange={e => this.setState({ consign: e.target.value })}>
              <option>true</option>
              <option>false</option>
              
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="data-price">Cost Price</Label>
            <Input
              type="number"
              value={costPrice}
              onChange={e => this.setState({ costPrice: e.target.value })}
              id="data-price"
              placeholder="30.99"
            />
          </FormGroup>
          <FormGroup>
            <Label for="data-price">Sale Price</Label>
            <Input
              type="number"
              value={salePrice}
              onChange={e => this.setState({ salePrice: e.target.value })}
              id="data-price"
              placeholder="30.99"
            />
          </FormGroup>
          {this.props.thumbView && img.length <= 0 ? (
            <label
              className="btn btn-primary"
              htmlFor="upload-image"
              color="primary">
              Upload Image
              <input
                type="file"
                id="upload-image"
                hidden
                onChange={e =>
                  this.setState({ img: URL.createObjectURL(e.target.files[0]) })
                }
              />
            </label>
          ) : null}
        </PerfectScrollbar>
        <div className="data-list-sidebar-footer px-2 d-flex justify-content-start align-items-center mt-1">
          <Button color="primary" onClick={() => this.handleSubmit(this.state)}>
            {data !== null ? "Update" : "Submit"}
          </Button>
          <Button
            className="ml-1"
            color="danger"
            outline
            onClick={() => handleSidebar(false, true)}>
            Cancel
          </Button>
        </div>
      </div>
    )
  }
}
export default DataListSidebar
