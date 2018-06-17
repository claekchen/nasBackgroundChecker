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
import moment from 'moment'
const monthFormat = 'YYYY/MM'
const AuditButtonGroup = (props) => {
  const {token, count, title, action, date} = props.info
  const onApprove = () => {
    props.handleApprove(props.state, count, title, action, date, token)
  }
  const onReject = () => {
    props.handleApprove(props.state, count, title, action, date, token)
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
  state: PropTypes.object,
  token: PropTypes.string
}
const mapStateToPropsButton = state => {
  return {
    state
  }
}
const mapDispatchToPropsButton = (dispatch) => {
  return {
    handleApprove: (state, count, title, action, date, token) => companyAction.approvePersonAction(dispatch, state, count, title, action, date, token),
    handleReject: (state, count, title, action, date, token) => companyAction.rejectPersonAction(dispatch, state, count, title, action, date, token)
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
  render: (key) => { return <AuditButtonContainer info={key} /> }
}]
class Audit extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  componentWillMount () {
    this.props.handleInit(this.props.token)
  }
  shouldComponentUpdate (nextProps) {
    if (nextProps.token !== this.props.token) {
      this.props.handleInit(nextProps.token)
      return false
    }
    return true
  }
  render () {
    const {personInfo} = this.props
    let data = []
    Object.keys(personInfo).map(index => {
      personInfo[index].date = moment(Number(personInfo[index].date)).format(monthFormat)
      data.push(personInfo[index])
    })
    return (
      <div className='Audit'>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

Audit.propTypes = {
  personInfo: PropTypes.array,
  handleInit: PropTypes.func,
  token: PropTypes.string
}
const mapStateToProps = state => {
  return {
    personInfo: state.company.personInfo,
    token: state.company.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInit: (token) => companyAction.getCompanyInfo(dispatch, token)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Audit)
