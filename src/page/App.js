import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import app from './reducer/app'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import Audit from './App/Audit'
import Preview from './App/Preview'
import Search from './App/Search'
import UpdatePerson from './App/UpdatePerson'
import UpdateCompany from './App/UpdateCompany'
import { Router, navigate } from '@reach/router'
import 'antd/lib/menu/style'
import 'antd/lib/layout/style'
import 'antd/lib/icon/style'
import './App.css'
const store = createStore(app)
const {Header, Sider, Footer, Content} = Layout
const {Item, SubMenu} = Menu
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  onClickMenu (item) {
    navigate(item.key)
  }
  render () {
    return (
      <Provider store={store}>
        <div className='App'>
          <Layout>
            <Sider
              breakpoint='lg'
              collapsedWidth='0'
              onCollapse={(collapsed, type) => { console.log(collapsed, type) }}
            >
              <Menu onClick={this.onClickMenu} theme='dark' mode='inline' defaultSelectedKeys={['search']}>
                <Item key='search'>
                  <Icon type='search' />
                  <span>快速查询</span>
                </Item>
                <SubMenu key='personal' title={<span><Icon type='user' /><span>个人用户</span></span>}>
                  <Item key='updatePerson'>注册/更新信息</Item>
                  <Item key='preview'>信息预览</Item>
                </SubMenu>
                <SubMenu key='company' title={<span><Icon type='mail' /><span>企业用户</span></span>}>
                  <Item key='updateCompany'>注册/更新信息</Item>
                  <Item key='audit'>审核</Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Layout>
              <Header className='header-container'>
                <header>
                  背调星
                </header>
              </Header>
              <Content className='content-container'>
                <Router>
                  <Audit path='audit' />
                  <Preview path='preview' />
                  <Search path='search' />
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
      </Provider>
    )
  }
}

export default App
