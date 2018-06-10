import React, { Component } from 'react'
import Table from 'antd/lib/table'
import './PreTable.css'
import 'antd/lib/table/style'

const mock = [
  {
    name: '中国平安中国平安中国平安中国平安',
    title: '销售经理',
    action: '入职',
    date: '2000.01',
    isVeri: '已认证',
    key: '1'
  }
]

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
    return (
      <Table columns={columns} dataSource={mock} />
    )
  }
}

export default PreTable
