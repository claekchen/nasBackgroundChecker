import React from 'react'
import { connect } from 'react-redux'
import Modal from 'antd/lib/modal'
import PropTypes from 'prop-types'
import Select from 'antd/lib/select'
import InputSet from '../common/InputSet'
import Input from 'antd/lib/input'
import DatePicker from 'antd/lib/date-picker'
import Button from 'antd/lib/button'
import * as personAction from '../../action/person'
import 'antd/lib/date-picker/style'
import 'antd/lib/input/style'
import './AddCompany.css'
import 'antd/lib/button/style'
import 'antd/lib/modal/style'
import 'antd/lib/select/style'
const monthFormat = 'YYYY/MM'
const Option = Select.Option
const { MonthPicker } = DatePicker

const AddCompany = (props) => {
  const onCancel = () => {
    props.handleSwitchCompanyInfo(!props.showCompanyInfo)
  }
  const onChangeInfo = (e) => {
    const info = {}
    info[e.currentTarget.id] = e.currentTarget.value
    props.handleChange(info)
  }
  const onChangeCompany = (value) => {
    const info = {}
    info.addingCompany = value.name
    info.addingToken = value.token
    props.handleChange(info)
  }
  const onChangeAction = (value) => {
    const info = {}
    info.addingAction = value
    props.handleChange(info)
  }
  const onChangeDate = (value) => {
    const info = {}
    info.addingDate = value
    props.handleChange(info)
  }
  const renderCompany = (data) => {
    let res = []
    Object.keys(data).map(index => res.push(<Option key={data[index]} value={{token: index, name: data[index]}}>{data[index]}</Option>))
    return res
  }
  const onUpdate = () => {
    props.handleUpdate(props.state)
  }
  return (
    <Modal
      title='工作经历'
      visible={props.showCompanyInfo}
      footer={[
        <Button type='primary' key='confirm' onClick={onUpdate}>确定</Button>,
        <Button type='danger' key='cancel' onClick={onCancel}>
          取消
        </Button>
      ]}
  >
      <InputSet text='公司'>
        <Select onChange={onChangeCompany} id='addingCompany' defaultValue={props.addingCompany} style={{ width: '100%' }}>
          {renderCompany(props.companyList)}
        </Select>
      </InputSet>
      <InputSet text='职位'>
        <Input onChange={onChangeInfo} id='addingTitle' value={props.addingTitle} placeholder='请输入您的职位' />
      </InputSet>
      <InputSet text='行为'>
        <Select onChange={onChangeAction} style={{ width: '100%' }}>
          <Option value='入职'>入职</Option>
          <Option value='离职'>离职</Option>
        </Select>
      </InputSet>
      <InputSet text='日期'>
        <MonthPicker onChange={onChangeDate} value={props.addingDate} format={monthFormat} />
      </InputSet>
    </Modal>
  )
}

AddCompany.propTypes = {
  showCompanyInfo: PropTypes.bool,
  onOK: PropTypes.func,
  handleSwitchCompanyInfo: PropTypes.func,
  handleUpdate: PropTypes.func,
  companyList: PropTypes.object,
  addingCompany: PropTypes.string,
  addingTitle: PropTypes.string,
  addingAction: PropTypes.string,
  addingDate: PropTypes.object,
  state: PropTypes.object
}

const mapStateToProps = state => {
  return {
    state: state,
    companyList: state.person.companyList,
    showCompanyInfo: state.person.showCompanyInfo,
    addingCompany: state.person.addingCompany,
    addingTitle: state.person.addingTitle,
    addingAction: state.person.addingAction,
    addingDate: state.person.addingDate
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    handleSwitchCompanyInfo: showCompanyInfo => dispatch(personAction.switchCompanyInfoAction(showCompanyInfo)),
    handleChange: info => dispatch(personAction.changePersonInfoAction(info)),
    handleUpdate: (state) => personAction.updateCompany(dispatch, state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCompany)
