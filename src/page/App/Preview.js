import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as personAction from '../action/person'
import triLayout from './common/triLayout'
import PreTable from './Preview/PreTable'
import Button from 'antd/lib/button'
import AddCompany from './Preview/AddCompany'
import './Preview.css'
import 'antd/lib/button/style'
class InformationForm extends Component {
  constructor (props) {
    super(props)
    this.onSwitch = this.onSwitch.bind(this)
    this.state = {
    }
  }
  onSwitch () {
    this.props.handleSwitchCompanyInfo(!this.props.showCompanyInfo)
  }
  componentWillMount () {
    this.props.handleInit(this.props.token)
    this.props.handleGetCompanyName()
  }
  shouldComponentUpdate (nextProps) {
    if (nextProps.token !== this.props.token) {
      this.props.handleInit(nextProps.token)
      return false
    }
    return true
  }
  render () {
    const props = this.props
    return (
      <div className='informationForm'>
        <AddCompany />
        <p>钱包hash: {props.token}</p>
        <p>姓名: {props.name}</p>
        <p>身份证: {props.id}</p>
        <Button onClick={this.onSwitch} type='primary'>添加工作经历</Button>
      </div>
    )
  }
}

InformationForm.propTypes = {
  token: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  showCompanyInfo: PropTypes.bool,
  handleSwitchCompanyInfo: PropTypes.func,
  handleChange: PropTypes.func,
  handleGetCompanyName: PropTypes.func,
  handleInit: PropTypes.func
}
const mapStateToProps = state => {
  return {
    token: state.person.token,
    name: state.person.name,
    id: state.person.id,
    showCompanyInfo: state.person.showCompanyInfo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleSwitchCompanyInfo: showCompanyInfo => dispatch(personAction.switchCompanyInfoAction(showCompanyInfo)),
    handleGetCompanyName: () => personAction.getCompanyList(dispatch),
    handleInit: (token) => personAction.getPersonInfo(dispatch, token)
  }
}

const InformationFormContainer = connect(mapStateToProps, mapDispatchToProps)(InformationForm)

const PreTableContainer = (props) => {
  return (
    <div className='pretable-contianer'>
      <PreTable isSearch={false} />
    </div>
  )
}
const Ava = (props) => <div className='avatar-container'><img alt='头像' width={102} height={102} src={props.ava} /></div>
Ava.propTypes = {
  ava: PropTypes.string,
  handleChange: PropTypes.func
}
const mapStateToPropsAva = state => {
  return {
    ava: state.person.ava
  }
}
const AvaContainer = connect(mapStateToPropsAva)(Ava)

const Preview = triLayout(InformationFormContainer, AvaContainer, PreTableContainer)

export default Preview
