import React, { Component } from 'react'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import './Search.css'
import 'antd/lib/input/style'
import 'antd/lib/button/style'
class Search extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div className='Search'>
        <h1>查询</h1>
        <Input placeholder='请输入被查询人的钱包Hash' />
        <Button className='confirm-button' type='primary' size='large'>确认</Button>
      </div>
    )
  }
}

export default Search
