import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as companyAction from '../action/company'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import './Audit.css'
import 'antd/lib/table/style'
import 'antd/lib/button/style'
import 'antd/lib/divider/style'
const AuditButtonGroup = (props) => {
  const onApprove = () => {
    props.handleApprove(props.state, props.token)
  }
  const onReject = () => {
    props.handleReject(props.state)
  }
  return (
    <div>
      <Button onClick={onApprove} type='primary'>通过</Button>
      <Divider type='vertical' />
      <Button onClick={onReject} type='danger'>驳回</Button>
    </div>
  )
}
AuditButtonGroup.propTypes = {
  handleApprove: PropTypes.func,
  handleReject: PropTypes.func,
  state: PropTypes.object
}
const mapStateToPropsButton = state => {
  return {
    state
  }
}
const mapDispatchToPropsButton = (dispatch) => {
  return {
    handleApprove: (state, token) => companyAction.approvePersonAction(state, token),
    handleReject: (state, token) => companyAction.rejectPersonAction(state, token)
  }
}
const AuditButtonContainer = connect(mapStateToPropsButton, mapDispatchToPropsButton)(AuditButtonGroup)

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '身份证',
  dataIndex: 'id',
  key: 'id'
}, {
  title: '职位',
  dataIndex: 'title',
  key: 'title'
}, {
  title: '行为',
  dataIndex: 'action',
  key: 'action'
}, {
  title: '时间',
  dataIndex: 'date',
  key: 'date'
}, {
  title: '审核',
  key: 'audit',
  render: (key) => {return <AuditButtonContainer token={key.token} />}
}]
class Audit extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const {personInfo} = this.props
    return (
      <div className='Audit'>
        <Table columns={columns} dataSource={personInfo} />
      </div>
    )
  }
}

Audit.propTypes = {
  personInfo: PropTypes.array
}
const mapStateToProps = state => {
  return {
    personInfo: state.company.personInfo
  }
}

export default connect(mapStateToProps)(Audit)
