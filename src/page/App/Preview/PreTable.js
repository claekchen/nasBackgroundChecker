import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Table from 'antd/lib/table'
import './PreTable.css'
import 'antd/lib/table/style'

const columns = [{
  title: '公司',
  dataIndex: 'name',
  key: 'name'
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
  title: '验证结果',
  dataIndex: 'isVeri',
  key: 'isVeri'
}]
class PreTable extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    const {companyInfo} = this.props
    return (
      <Table columns={columns} dataSource={companyInfo} />
    )
  }
}
PreTable.propTypes = {
  companyInfo: PropTypes.array
}
const mapStateToPropsInfo = state => {
  return {
    companyInfo: state.person.companyInfo
  }
}
export default connect(mapStateToPropsInfo)(PreTable)
