import React from 'react'
import { connect } from 'react-redux'
import ModalForm from '../modal'
import * as actions from '../../redux/actions'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Row, Col, Divider } from 'antd'
import './add-posts.css'
import 'antd/dist/antd.css'

const AddPosts = (props) => {
  const modalCss = { padding: '8px 0' }
  const { SwitchVisible } = props

  return (
    <Row justify="center">
      <Divider orientation="left">AntonZubritski</Divider>
      <Col style={modalCss}>
        <Button type="primary" onClick={() => SwitchVisible(true)}>
          <PlusOutlined /> ADD POST
        </Button>
      </Col>
      <ModalForm />
    </Row>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    SwitchVisible: (bool) => dispatch(actions.SwitchVisible(bool)),
  }
}

export default connect(undefined, mapDispatchToProps)(AddPosts)







