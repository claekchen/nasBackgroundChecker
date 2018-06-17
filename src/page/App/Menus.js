import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import { navigate } from '@reach/router'
import * as MenuAction from '../action/menus'
import * as searchAction from '../action/search'
import 'antd/lib/menu/style'
import 'antd/lib/icon/style'
const {Item, SubMenu} = Menu
class Menus extends Component {
    constructor (props) {
      super(props)
      this.onClickMenu = this.onClickMenu.bind(this)
      this.state = {
      }
    }
    onClickMenu (item) {
      const {handleChange, handleSearch} = this.props
      navigate(item.key)
      handleChange(item.key)
      if (item.key === 'search') {
        handleSearch({token: ''})
      }
    }
    render () {
      const {menu} = this.props
      return (
        <Menu onClick={this.onClickMenu} theme='dark' mode='inline' defaultSelectedKeys={[menu.selected]}>
          <Item disabled = {menu.disableSearch} key='search'>
            <Icon type='search' />
            <span>快速查询</span>
          </Item>
          <Item onClick={this.onClickMenu} key='description'>
            <Icon type='question' />
            <span>使用说明</span>
          </Item>
          <SubMenu disabled = {(menu.userType === 'company')} key='personal' title={<span><Icon type='user' /><span>个人用户</span></span>}>
            <Item disabled = {menu.disableUpdatePerson} key='updatePerson'>注册/更新信息</Item>
            <Item disabled = {menu.disablePreview} key='preview'>信息预览</Item>
          </SubMenu>
          <SubMenu disabled = {(menu.userType === 'person')} key='company' title={<span><Icon type='mail' /><span>企业用户</span></span>}>
            <Item disabled = {menu.disableUpdateCompany} key='updateCompany'>注册/更新信息</Item>
            <Item disabled = {menu.disableAudit} key='audit'>审核</Item>
          </SubMenu>
        </Menu>
      )
    }
  }
  Menus.propTypes = {
    menu: PropTypes.object,
    handleChange: PropTypes.func,
    handleSearch: PropTypes.func
  }
  const mapStateToProps = state => {
    return {
      menu: state.menus
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (selected) => dispatch(MenuAction.changeSelectMenuAction(selected)),
        handleSearch: (info) => dispatch(searchAction.changePersonInfoAction(info))
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(Menus)

