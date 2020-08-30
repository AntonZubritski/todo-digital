import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import 'antd/dist/antd.css'
import { Row, Space, Spin } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Table } from 'antd'

const TableForm = (props) => {
  const {
    DeletePost,
    EditAddForm,
    jsonAmount,
    SwitchVisible,
    EditMode,
    GetPosts,
  } = props
  const tableCss = { padding: '50px 0', width: '80%' }
  const spinCss = { padding: '100px 0' }

  useEffect(() => {
    GetPosts()
  }, [])

  const EditButton = (post) => {
    EditMode()
    EditAddForm(post)
    SwitchVisible(true)
  }

  const DeleteButton = (post) => {
    DeletePost(post.id, jsonAmount)
  }
  
  const columns = [
    { title: 'Id', dataIndex: 'id', key: 'id' },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Body', dataIndex: 'body', key: 'body' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (post) => (
        <Space size="middle">
          <a onClick={() => EditButton(post)}>
            <EditOutlined />
          </a>
          <a onClick={() => DeleteButton(post)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ]

  const sourceData = props.posts ? (
    <Table
      style={tableCss}
      columns={columns}
      pagination={true}
      dataSource={props.posts}
    />
  ) : (
    <Spin style={spinCss} />
  )

  return <Row justify="center">{sourceData}</Row>
}

const mapStateToProps = (state) => {
  return {
    posts: state.todo.posts,
    jsonAmount: state.todo.jsonAmount,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    SwitchVisible: (bool) => dispatch(actions.SwitchVisible(bool)),
    GetPosts: () => dispatch(actions.GetPosts()),
    DeletePost: (id, jsonAmount) =>
      dispatch(actions.DeletePost(id, jsonAmount)),
    EditAddForm: (post) => dispatch(actions.EditAddForm(post)),
    EditMode: () => dispatch(actions.EditMode()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TableForm)
