import React, { Component } from 'react'
import { Row, Col } from "antd"
import IndexList from "./list"
import IndexMenu from './index-menu'
class Index extends Component {
  render() {
    console.log(this.props)
    return (
      <Row className="wrap">
        <Col md={ 6 } xs={ 0 }>
        <IndexMenu id="indexMdMenu" mode="vertical"/>
        </Col>
        <Col md={ 0 } xs={ 24 }>
          <IndexMenu id="indexXsMenu" mode="horizontal"/>
        </Col>
        <Col 
          md={ 18 } 
          xs={ 24}
          style={{height: '500px' }} 
          className="indexList">
          <IndexList/>
        </Col>
      </Row>
      )
  }
}
export default Index
