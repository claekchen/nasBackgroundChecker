import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Layout from 'antd/lib/layout'
import Spin from 'antd/lib/spin'
import Audit from './App/Audit'
import Preview from './App/Preview'
import Search from './App/Search'
import UpdatePerson from './App/UpdatePerson'
import UpdateCompany from './App/UpdateCompany'
import Description from './App/Description'
import NotFound from './App/NotFound'
import Menus from './App/Menus'
import * as MenuAction from './action/menus'
import { Router, Redirect } from '@reach/router'
import 'antd/lib/layout/style'
import 'antd/lib/spin/style'
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
                {this.props.menu.loading
                ? <div className='loading'>
                  <Spin size='large' />
                </div> : null
                }
                <Router>
                  {this.renderRedirect()}
                  <NotFound default />
                  <Audit path='audit' />
                  <Preview path='preview' />
                  <Redirect
                    from='/'
                    to='search'
                    noThrow
                  />
                  <Search path='/search' />
                  <UpdateCompany path='updateCompany' />
                  <UpdatePerson path='updatePerson' />
                  <Description path='description' />
                </Router>
              </Content>
              <Footer className='footer-container'>
                <p>created by Claek in 2018</p>
                <p>My Email: claek.chen@icloud.com</p>
                <p>注：请先安装Chrome Nebulas-WebExtensionWallet钱包插件</p>
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
    menu: state.menus
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleUserType: () => MenuAction.getUserType(dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
