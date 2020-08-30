import React, { useEffect } from 'react'
import { Button, Row, Col, Modal, Form, Input } from 'antd'
import * as actions from '../../redux/actions'
import { connect } from 'react-redux'

const ModalForm = (props) => {
  const [form] = Form.useForm()

  useEffect(() => form.setFieldsValue(addform), [props.addform])

  const {
    ChangeAddForm,
    ChangeEditForm,
    posts,
    SwitchVisible,
    visible,
    addform,
    SetPost,
    PutPost,
    DeleteAddForm,
    edit,
    jsonAmount,
  } = props

  const changeInputForm = (e) => {
    const { id, value } = e.target
    return edit
      ? ChangeEditForm(id, value)
      : ChangeAddForm(id, value, posts.length)
  }
  const setPost = (e) => {
    SwitchVisible(false)
    DataModal('Added post!')
    return edit ? PutPost(addform, jsonAmount) : SetPost(addform)
  }
  const cancelButton = () => {
    SwitchVisible(false)
    form.resetFields()
    DeleteAddForm()
  }
  const DataModal = (dataToPassIn) => {
    const modal = Modal.success({
      title: 'SUCCES',
      content: <div>{dataToPassIn}</div>,
    })
    setTimeout(() => {
      modal.destroy()
    }, 1000)
  }

  return (
    <Modal
      title="ADD POST"
      visible={visible}
      onCancel={cancelButton}
      footer={null}
      forceRender={true}
    >
      <Form form={form} onFinish={setPost}>
        <Col span={24}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter title post' }]}
            onChange={changeInputForm}
            preserve={false}
          >
            <Input placeholder="Please enter title post" allowClear={true} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="body"
            label="Body"
            rules={[
              {
                required: true,
                message: 'please enter body post',
              },
            ]}
            onChange={changeInputForm}
          >
            <Input.TextArea
              rows={4}
              placeholder="please enter body post"
              allowClear={true}
            />
          </Form.Item>
        </Col>
        <Row justify="space-around">
          <Form.Item>
            <Button type="primary" htmlType="submit" key="submit">
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    posts: state.todo.posts,
    visible: state.todo.visible,
    addform: state.change.addform,
    edit: state.change.edit,
    jsonAmount: state.todo.jsonAmount,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SwitchVisible: (bool) => dispatch(actions.SwitchVisible(bool)),
    ChangeAddForm: (name, payload, length) =>
      dispatch(actions.ChangeAddForm(name, payload, length)),
    ChangeEditForm: (name, payload) =>
      dispatch(actions.ChangeEditForm(name, payload)),
    SetPost: (body, length) => dispatch(actions.SetPost(body, length)),
    PutPost: (body, jsonAmount) => dispatch(actions.PutPost(body, jsonAmount)),
    DeleteAddForm: () => dispatch(actions.DeleteAddForm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm)
