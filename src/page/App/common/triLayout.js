import React, { Component } from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import 'antd/lib/row/style'
import 'antd/lib/col/style'
import './triLayout.css'

const triLayout = (FirRowFirColCom = () => <div></div>, FirRowSecColCom = () => <div></div>, SecRow = () => <div></div>) => {
  return class extends Component {
    constructor (props) {
      super(props)
      this.state = {}
    }
    render () {
      return (
        <div className='tri-layout'>
          <Row>
            <div className='row-first'>
              <Col span={16}>
                <FirRowFirColCom />
              </Col>
              <Col span={8}>
                <FirRowSecColCom />
              </Col>
            </div>
          </Row>
          <Row>
            <SecRow />
          </Row>
        </div>
      )
    }
  }
}

export default triLayout
