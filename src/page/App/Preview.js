import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as personAction from '../action/person'
import triLayout from './common/triLayout'
import PreTable from './Preview/PreTable'
import Button from 'antd/lib/button'
import AddCompany from './Preview/AddCompany'
import './Preview.css'
import 'antd/lib/button/style'

const InformationForm = (props) => {
  return (
    <div className='informationForm'>
      <AddCompany visible={false} />
      <p>钱包hash: {props.token}</p>
      <p>姓名: {props.name}</p>
      <p>身份证: {props.id}</p>
      <Button type='primary'>添加工作经历</Button>
    </div>
  )
}

InformationForm.propTypes = {
  token: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string
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
  }
}

const InformationFormContainer = connect(mapStateToProps, mapDispatchToProps)(InformationForm)

const PreTableContainer = (props) => {
  return (
    <div className='pretable-contianer'>
      <PreTable />
    </div>
  )
}
const Ava = () => <div className='avatar-container'><img alt='avatar' /></div>
const Preview = triLayout(InformationFormContainer, Ava, PreTableContainer)

export default Preview
