import React from 'react'
import triLayout from './common/triLayout'
import InputSet from './common/InputSet'
import Avatar from './common/Avatar'
import Button from 'antd/lib/button'
import './UpdatePerson.css'
import 'antd/lib/button/style'
const InformationForm = (props) => {
  return (
    <div className='informationForm'>
      <p>钱包hash: 1123</p>
      <InputSet text='姓名' placeholder='请输入您的姓名' />
      <InputSet text='身份证' placeholder='请输入您的身份证号码' />
      <InputSet text='公司' placeholder='占位，会替换为下拉框' />
    </div>
  )
}

const Ava = () => <Avatar text='头像'/>
const ConfirmButton = (props) => <Button type='primary' size='large'>注册/更新</Button>
const UpdatePerson = triLayout(InformationForm, Ava, ConfirmButton)

export default UpdatePerson
