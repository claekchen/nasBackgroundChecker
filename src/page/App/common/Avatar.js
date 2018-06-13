import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import 'antd/lib/upload/style'
import 'antd/lib/icon/style'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

class Avatar extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.beforeUpload = this.beforeUpload.bind(this)
    this.state = {
      loading: false
    }
  }
  beforeUpload (file) {
    const isJPG = file.type === 'image/jpeg'
    if (!isJPG) {
      message.error('You can only upload JPG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    if (isJPG && isLt2M && file) {
      this.handleChange(file)
    }
    return false
  }
  handleChange (file) {
    const {onChange} = this.props
    console.log(file)
    getBase64(file, imageUrl => {
      this.setState({
        loading: false
      })
      const info = {
        ava: imageUrl
      }
      onChange(info)
    }
  )
  }
  render () {
    const {ava} = this.props
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>{this.props.text}</div>
      </div>
    )
    return (
      <Upload
        name='avatar'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        action='//jsonplaceholder.typicode.com/posts/'
        beforeUpload={this.beforeUpload}
      >
        {ava ? <img src={ava} width={102} height={102} className='avatar-image' alt='avatar' /> : uploadButton}
      </Upload>
    )
  }
}

Avatar.propTypes = {
  text: PropTypes.string,
  ava: PropTypes.string,
  onChange: PropTypes.func
}

export default Avatar
