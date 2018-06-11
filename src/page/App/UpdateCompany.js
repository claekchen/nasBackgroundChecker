import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import triLayout from './common/triLayout'
import InputSet from './common/InputSet'
import Avatar from './common/Avatar'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import * as companyAction from '../action/company'
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
      <InputSet text='公司名'>
        <Input onChange={onChangeInfo} value={props.name} id='name' placeholder='请输入您公司的全称' />
      </InputSet>
      <InputSet text='地点'>
        <Input onChange={onChangeInfo} value={props.location} id='location' placeholder='请输入您公司的注册地' />
      </InputSet>
    </div>
  )
}

InformationForm.propTypes = {
  token: PropTypes.string,
  name: PropTypes.string,
  location: PropTypes.string,
  handleChange: PropTypes.func
}
const mapStateToProps = state => {
  return {
    token: state.company.token,
    name: state.company.name,
    location: state.company.location
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleChange: info => dispatch(companyAction.changeCompanyInfoAction(info))
  }
}
const InformationFormContainer = connect(mapStateToProps, mapDispatchToProps)(InformationForm)

const Ava = (props) => <div className='avatar-container'><Avatar ava={props.ava} onChange={props.handleChange} text='头像' /></div>

Ava.propTypes = {
  ava: PropTypes.string,
  handleChange: PropTypes.func
}

const mapStateToPropsAva = state => {
  return {
    ava: state.company.ava
  }
}
const mapDispatchToPropsAva = (dispatch) => {
  return {
    handleChange: info => dispatch(companyAction.changeCompanyInfoAction(info))
  }
}
const AvaContainer = connect(mapStateToPropsAva, mapDispatchToPropsAva)(Ava)

const ConfirmButton = (props) => <Button onClick={props.handleClick} type='primary' size='large'>注册/更新</Button>
ConfirmButton.propTypes = {
  handleClick: PropTypes.func
}
const mapStateToPropsButton = () => {
  return {}
}
const mapDispatchToPropsButton = (dispatch) => {
  return {
    handleClick: info => dispatch(companyAction.updateCompanyInfoAction())
  }
}
const ConfirmButtonContainer = connect(mapStateToPropsButton, mapDispatchToPropsButton)(ConfirmButton)

const UpdateCompany = triLayout(InformationFormContainer, AvaContainer, ConfirmButtonContainer)

export default UpdateCompany
