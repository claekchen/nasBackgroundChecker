import React from 'react'
import Modal from 'antd/lib/modal'
import PropTypes from 'prop-types'
import Select from 'antd/lib/select'
import InputSet from '../common/InputSet'
import Input from 'antd/lib/input'
import DatePicker from 'antd/lib/date-picker'
import Button from 'antd/lib/button'
import 'antd/lib/date-picker/style'
import 'antd/lib/input/style'
import './AddCompany.css'
import 'antd/lib/button/style'
import 'antd/lib/modal/style'
import 'antd/lib/select/style'
import moment from 'moment'
const monthFormat = 'YYYY/MM'
const Option = Select.Option
const { MonthPicker } = DatePicker

const AddCompany = (props) => (
  <Modal
    title='工作经历'
    visible={props.visible}
    footer={[
      <Button type='primary' key='confirm' onClick={this.handleCancel}>确定</Button>,
      <Button type='danger' key='cancel' onClick={this.handleOk}>
        取消
      </Button>
    ]}
  >
    <InputSet text='公司'>
      <Select defaultValue='lucy' style={{ width: '100%' }}>
        <Option value='jack'>Jack</Option>
        <Option value='lucy'>Lucy</Option>
        <Option value='disabled' disabled>Disabled</Option>
        <Option value='Yiminghe'>yiminghe</Option>
      </Select>
    </InputSet>
    <InputSet text='地点'>
      <Input placeholder='请输入您的职位' />
    </InputSet>
    <InputSet text='行为'>
      <Select defaultValue='in' style={{ width: '100%' }}>
        <Option value='in'>入职</Option>
        <Option value='out'>离职</Option>
      </Select>
    </InputSet>
    <InputSet text='日期'>
      <MonthPicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} />
    </InputSet>
  </Modal>
)

AddCompany.propTypes = {
  visible: PropTypes.bool,
  onOK: PropTypes.func,
  onCancel: PropTypes.func
}

export default AddCompany
