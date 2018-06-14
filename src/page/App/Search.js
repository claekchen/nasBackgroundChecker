import React, { Component } from 'react'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import PropTypes from 'prop-types'
import * as searchAction from '../action/search'
import { connect } from 'react-redux'
import './Search.css'
import 'antd/lib/input/style'
import 'antd/lib/button/style'
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
    const {text} = this.props
    return (
      <div className='Search'>
        <h1>查询</h1>
        <Input value={text} onChange={this.onSearch} placeholder='请输入被查询人的钱包Hash' />
        <Button onClick={this.onSubmit} className='confirm-button' type='primary' size='large'>确认</Button>
      </div>
    )
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func,
  text: PropTypes.string,
  handleSubmit: PropTypes.func
}

const mapStateToProps = state => {
  return {
    text: state.search.searchText
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleSearch: text => dispatch(searchAction.changeSearchTextAction(text)),
    handleSubmit: text => searchAction.submitSearch(text)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Search)
