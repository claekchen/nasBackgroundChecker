import React from 'react'
import triLayout from './common/triLayout'
import PreTable from './Preview/PreTable'
import './Preview.css'
import 'antd/lib/button/style'

const InformationForm = (props) => {
  return (
    <div className='informationForm'>
      <p>钱包hash: 1123</p>
      <p>姓名: </p>
      <p>身份证: </p>
      <PreTable />
    </div>
  )
}

const Ava = () => <img alt='avatar' />
const Preview = triLayout(InformationForm, Ava)

export default Preview
