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
      <InputSet text='公司名' placeholder='请输入您公司的全称' />
      <InputSet text='地点' placeholder='请输入您公司的注册地' />
      <Button type='primary' size='large'>审核来自个人的背调申请</Button>
    </div>
  )
}

const Ava = () => <Avatar text='证明文件'/>
const ConfirmButton = (props) => <Button type='primary' size='large'>注册/更新</Button>
const UpdateCompany = triLayout(InformationForm, Ava, ConfirmButton)

export default UpdateCompany
