import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import triLayout from './common/triLayout'
import InputSet from './common/InputSet'
import Avatar from './common/Avatar'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import * as personAction from '../action/person'
import 'antd/lib/input/style'
import './UpdatePerson.css'
import 'antd/lib/button/style'
const InformationForm = (props) => {
  const onChangeInfo = (e) => {
    const info = {}
    info[e.currentTarget.id] = e.currentTarget.value
    props.handleChange(info)
  }
  return (
    <div className='informationForm'>
      <p>钱包hash: {props.token}</p>
      <InputSet text='姓名'>
        <Input onChange={onChangeInfo} value={props.name} id='name' placeholder='请输入您的姓名' />
      </InputSet>
      <InputSet text='身份证'>
        <Input onChange={onChangeInfo} value={props.id} id='id' placeholder='请输入您的身份证号码' />
      </InputSet>
    </div>
  )
}

InformationForm.propTypes = {
  token: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  handleChange: PropTypes.func
}
const mapStateToProps = state => {
  return {
    token: state.person.token,
    name: state.person.name,
    id: state.person.id
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: info => dispatch(personAction.changePersonInfoAction(info))
  }
}
const InformationFormContainer = connect(mapStateToProps, mapDispatchToProps)(InformationForm)

const Ava = () => <div className='avatar-container'><Avatar text='头像' /></div>
const ConfirmButton = (props) => <Button type='primary' size='large'>注册/更新</Button>
const UpdatePerson = triLayout(InformationFormContainer, Ava, ConfirmButton)

export default UpdatePerson
