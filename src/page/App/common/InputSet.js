import React from 'react'
import PropTypes from 'prop-types'
import './InputSet.css'
import 'antd/lib/input/style'

const InputSet = (props) => {
  return (
    <div className='inputset'>
      <p>{props.text}</p>
      {props.children}
    </div>
  )
}

InputSet.propTypes = {
  text: PropTypes.string,
  children: PropTypes.object
}

export default InputSet
