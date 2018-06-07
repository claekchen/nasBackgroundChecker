import React from 'react'
import Input from 'antd/lib/input'
import PropTypes from 'prop-types'
import './InputSet.css'
import 'antd/lib/input/style'

const InputSet = (props) => {
  return (
    <div className='inputset'>
      <p>{props.text}</p>
      <Input placeholder={props.placeholder} />
    </div>
  )
}

InputSet.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string
}

export default InputSet
