import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import triLayout from './common/triLayout'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import PreTable from './Preview/PreTable'
import PropTypes from 'prop-types'
import * as searchAction from '../action/search'
import './Search.css'
import 'antd/lib/input/style'
import 'antd/lib/button/style'
const InformationForm = (props) => {
  return (
    <div className='informationForm'>
      <Button onClick={props.onBack} type='primary'>返回查询</Button>
      <p>钱包hash: {props.token}</p>
      <p>姓名: {props.name}</p>
      <p>身份证: {props.id}</p>
    </div>
  )
}

InformationForm.propTypes = {
  token: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string
}
const mapStateToPropsInfo = state => {
  return {
    token: state.search.token,
    name: state.search.name,
    id: state.search.id
  }
}
const mapDispatchToPropsInfo = (dispatch) => {
  return {
    onBack: () => dispatch(searchAction.changePersonInfoAction({token: ''}))
  }
}
const InformationFormContainer = connect(mapStateToPropsInfo, mapDispatchToPropsInfo)(InformationForm)
const PreTableContainer = (props) => {
  return (
    <div className='pretable-contianer'>
      <PreTable isSearch={true} />
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

class Search extends Component {
  constructor (props) {
    super(props)
    this.onSearch = this.onSearch.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
    }
  }
  onSearch (e) {
    const {handleSearch} = this.props
    handleSearch(e.currentTarget.value)
  }
  onSubmit () {
    const {text, handleSubmit} = this.props
    handleSubmit(text)
  }
  render () {
    const {text, token} = this.props
    return (
          token === ''
          ? (
            <div className='Search'>
              <h1>查询</h1>
              <Input value={text} onChange={this.onSearch} placeholder='请输入被查询人的钱包Hash' />
              <Button onClick={this.onSubmit} className='confirm-button' type='primary' size='large'>确认</Button>
            </div>
          )
          : <Preview />
    )
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func,
  text: PropTypes.string,
  handleSubmit: PropTypes.func,
  token: PropTypes.string
}

const mapStateToProps = state => {
  return {
    text: state.search.searchText,
    token: state.search.token
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: text => dispatch(searchAction.changeSearchTextAction(text)),
    handleSubmit: text => searchAction.submitSearch(dispatch, text)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)
