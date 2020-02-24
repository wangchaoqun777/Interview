import React, { Component } from 'react';
import { Layout, Row, Col, Divider, Menu, Icon , Dropdown, Button} from "antd"
import Nav from "./nav"
export default class MainHeader extends Component {
    render () {
      return (
        <Layout.Header>
          <Row className="wrap">
            <Col md={ 6 } xs= { 24 }>
              <h1 id="logo">CNode</h1>
            </Col>
            <Col md={ 18 } xs= { 0 }>
              <Divider type="vertical" className="headerDivider"/>
              <Nav id="nav" mode="horizontal"/>
            </Col>
            <Col md={ 0 } xs={ 24} className="xsName">
              <Dropdown 
                overlay= {<Nav id="xsnav" mode="vertical"/>} 
                placement="bottomRight"
                trigger={['click','touchend']}>
                <Button>
                  <Icon type="bars"></Icon>
                </Button>
              </Dropdown>
            </Col>
          </Row>
        </Layout.Header>
      )
    }
}