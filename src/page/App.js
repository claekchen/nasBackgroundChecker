import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'antd/lib/layout'
import Audit from './App/Audit'
import Preview from './App/Preview'
import Search from './App/Search'
import UpdatePerson from './App/UpdatePerson'
import UpdateCompany from './App/UpdateCompany'
import NotFound from './App/NotFound'
import Menus from './App/Menus'
import * as MenuAction from './action/menus'
import { Router, Redirect } from '@reach/router'
import 'antd/lib/menu/style'
import 'antd/lib/layout/style'
import 'antd/lib/icon/style'
import './App.css'
const {Header, Sider, Footer, Content} = Layout
class App extends Component {
  constructor (props) {
    super(props)
    this.renderRedirect = this.renderRedirect.bind(this)
    this.state = {
    }
  }
  componentWillMount () {
    const {handleUserType} = this.props
    handleUserType()
  }
  renderRedirect () {
    const {menu} = this.props
    let res = []
    if (menu.disableSearch) {
      res.push(
      <Redirect
        from="search" to="not" noThrow key="search"
      />)
    }
    if (menu.disableUpdatePerson) {
      res.push(
        <Redirect
          from="updatePerson" to="not" noThrow key="updatePerson"
        />)
    }
    if (menu.disableUpdateCompany) {
      res.push(
        <Redirect
          from="updateCompany" to="not" noThrow key="updateCompany"
        />)
    }
    if (menu.disablePreview) {
      res.push(
        <Redirect
          from="preview" to="not" noThrow key="preview"
        />)
    }
    if (menu.disableAudit) {
      res.push(
        <Redirect
          from="audit" to="not" noThrow key="audit"
        />)
    }
    return res
  }
  render () {
    return (
        <div className='App'>
          <Layout>
            <Sider
              breakpoint='lg'
              collapsedWidth='0'
              onCollapse={(collapsed, type) => { console.log(collapsed, type) }}
            >
              <Menus />
            </Sider>
            <Layout>
              <Header className='header-container'>
                <header>
                  背调星
                </header>
              </Header>
              <Content className='content-container'>
                <Router>
                  {this.renderRedirect()}
                  <NotFound default />
                  <Audit path='audit' />
                  <Preview path='preview' />
                  <Redirect
                    from="/"
                    to="search"
                    noThrow 
                  />
                  <Search path='/search' />
                  <UpdateCompany path='updateCompany' />
                  <UpdatePerson path='updatePerson' />
                </Router>
              </Content>
              <Footer className='footer-container'>
                created by Claek in 2018
              </Footer>
            </Layout>
          </Layout>
        </div>
    )
  }
}
App.propTypes = {
  menu: PropTypes.object,
  handleUserType: PropTypes.func
}
const mapStateToProps = state => {
  return {
    menu: state.menus,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleUserType: () => dispatch(MenuAction.getUserTypeAction(dispatch))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
