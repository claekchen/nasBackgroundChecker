import React, { Component } from 'react'
import Table from 'antd/lib/table'
import Button from 'antd/lib/button'
import Divider from 'antd/lib/divider'
import './Audit.css'
import 'antd/lib/table/style'
import 'antd/lib/button/style'
import 'antd/lib/divider/style'

const mock = [
  {
    name: '王大爷',
    id: '100000000000000000',
    title: '销售经理',
    action: '入职',
    date: '2000.01',
    key: '1'
  }
]

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
  render: (text, record) => (
    <div>
      <Button type='primary'>通过</Button>
      <Divider type='vertical' />
      <Button type='danger'>驳回</Button>
    </div>
  )
}]
class Audit extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className='Audit'>
        <Table columns={columns} dataSource={mock} />
      </div>
    )
  }
}

export default Audit
