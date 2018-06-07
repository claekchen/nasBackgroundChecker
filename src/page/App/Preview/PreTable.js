import React, { Component } from 'react'
import Table from 'antd/lib/table'
import './PreTable.css'
import 'antd/lib/table/style'

const mock = [
  {
    name: '中国平安中国平安中国平安中国平安',
    location: '大连',
    date: '2000.01-2008.4',
    isVeri: '已认证'
  }
]

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name'
}, {
  title: '地点',
  dataIndex: 'location',
  key: 'location'
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
    return (
      <Table columns={columns} dataSource={mock} />
    )
  }
}

export default PreTable
