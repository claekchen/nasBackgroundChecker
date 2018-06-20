import React, { Component } from 'react'
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
class InformationForm extends Component {
  constructor (props) {
    super(props)
    this.onChangeInfo = this.onChangeInfo.bind(this)
    this.state = {
    }
  }
  componentWillMount () {
    this.props.handleInit(this.props.token)
  }
  shouldComponentUpdate (nextProps) {
    if (nextProps.token !== this.props.token) {
      this.props.handleInit(nextProps.token)
      return false
    }
    return true
  }
  onChangeInfo (e) {
    const info = {}
    info[e.currentTarget.id] = e.currentTarget.value
    this.props.handleChange(info)
  }
  render () {
    return (
      <div className='informationForm'>
        <p>钱包hash: {this.props.token}</p>
        <InputSet text='姓名'>
          <Input onChange={this.onChangeInfo} value={this.props.name} id='name' placeholder='请输入您的姓名' />
        </InputSet>
        <InputSet text='身份证'>
          <Input onChange={this.onChangeInfo} value={this.props.id} id='id' placeholder='请输入您的身份证号码' />
        </InputSet>
        <p>工作经历请在详细信息页面添加。</p>
      </div>
    )
  }
}

InformationForm.propTypes = {
  token: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  handleChange: PropTypes.func,
  handleInit: PropTypes.func,
  loading: PropTypes.bool
}
const mapStateToPropsInfo = state => {
  return {
    token: state.person.token,
    name: state.person.name,
    id: state.person.id,
    loading: state.menus.loading
  }
}
const mapDispatchToPropsInfo = (dispatch) => {
  return {
    handleChange: info => dispatch(personAction.changePersonInfoAction(info)),
    handleInit: (token) => personAction.getPersonInfo(dispatch, token)
  }
}
const InformationFormContainer = connect(mapStateToPropsInfo, mapDispatchToPropsInfo)(InformationForm)

const Ava = (props) => <div className='avatar-container'><Avatar ava={props.ava} onChange={props.handleChange} text='头像' /></div>

Ava.propTypes = {
  ava: PropTypes.string,
  handleChange: PropTypes.func
}

const mapStateToPropsAva = state => {
  return {
    ava: state.person.ava
  }
}
const mapDispatchToPropsAva = (dispatch) => {
  return {
    handleChange: info => dispatch(personAction.changePersonInfoAction(info))
  }
}
const AvaContainer = connect(mapStateToPropsAva, mapDispatchToPropsAva)(Ava)

const ConfirmButton = (props) => {
  const onClick = () => {
    props.handleClick(props.person)
  }
  return <Button onClick={onClick} type='primary' size='large'>注册/更新</Button>
}
ConfirmButton.propTypes = {
  handleClick: PropTypes.func,
  person: PropTypes.object
}
const mapStateToPropsButton = (state) => {
  return {
    person: state.person
  }
}
const mapDispatchToPropsButton = (dispatch) => {
  return {
    handleClick: person => personAction.updatePersonInfoAction(dispatch, person)
  }
}
const ConfirmButtonContainer = connect(mapStateToPropsButton, mapDispatchToPropsButton)(ConfirmButton)

const UpdatePerson = triLayout(InformationFormContainer, AvaContainer, ConfirmButtonContainer)

export default UpdatePerson
