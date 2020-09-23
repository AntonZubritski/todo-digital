import React from 'react'
import { useDispatch } from 'react-redux'
import ModalForm from '../modal'
import * as actions from '../../redux/actions'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Row, Col, Divider } from 'antd'
import './add-posts.css'
import 'antd/dist/antd.css'

const AddPosts = () => {
  const dispatch = useDispatch()
  const modalCss = { padding: '8px 0' }

  return (
    <Row justify="center">
      <Divider orientation="left">AntonZubritski</Divider>
      <Col style={modalCss}>
        <Button type="primary" onClick={() => dispatch(actions.SwitchVisible(true))}>
          <PlusOutlined /> ADD POST
        </Button>
      </Col>
      <ModalForm />
    </Row>
  )
}

export default AddPosts