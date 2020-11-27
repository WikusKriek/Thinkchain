import React, { Component } from "react"
import { Label, Input, FormGroup, Button } from "reactstrap"
import { X } from "react-feather"
import PerfectScrollbar from "react-perfect-scrollbar"
import classnames from "classnames"

class DataListSidebar extends Component {
  state = {
    id: "",
    name: "",
    category: "Audio",
    order_status: "pending",
    price: "",
    img: "",
    popularity: {
      popValue: ""
    }
  }

  addNew = false

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== null && prevProps.data === null) {
      if (this.props.data.id !== prevState.id) {
        this.setState({ id: this.props.data.id })
      }
      if (this.props.data.name !== prevState.name) {
        this.setState({ name: this.props.data.name })
      }
      if (this.props.data.category !== prevState.category) {
        this.setState({ category: this.props.data.category })
      }
      if (this.props.data.popularity.popValue !== prevState.popularity) {
        this.setState({
          popularity: {
            ...this.state.popularity,
            popValue: this.props.data.popularity.popValue
          }
        })
      }
      if (this.props.data.order_status !== prevState.order_status) {
        this.setState({ order_status: this.props.data.order_status })
      }
      if (this.props.data.price !== prevState.price) {
        this.setState({ price: this.props.data.price })
      }
      if (this.props.data.img !== prevState.img) {
        this.setState({ img: this.props.data.img })
      }
    }
    if (this.props.data === null && prevProps.data !== null) {
      this.setState({
        id: "",
        name: "",
        category: "Audio",
        order_status: "pending",
        price: "",
        img: "",
        popularity: {
          popValue: ""
        }
      })
    }
    if (this.addNew) {
      this.setState({
        id: "",
        name: "",
        category: "Audio",
        order_status: "pending",
        price: "",
        img: "",
        popularity: {
          popValue: ""
        }
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
    let { number, name, consignment,packaging, qty, costPrice,salePrice,minQty,recQty, img } = this.state
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
            <Label for="data-category">Consignment</Label>
            <Input
              type="select"
              id="data-category"
              value={consignment}
              onChange={e => this.setState({ consignment: e.target.value })}>
              <option>true</option>
              <option>false</option>
              
            </Input>
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
