import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../redux/actions'
import { Row, Spin, Table, Space } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'
import './table.css'

const TableForm = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector((state) => state.todo)
  const { jsonAmount } = useSelector((state) => state.todo)

  const tableCss = { padding: '50px 0', width: '80%' }
  const spinCss = { padding: '100px 0' }

  useEffect(() => {
    dispatch(actions.GetPosts())
  }, [])

  const EditButton = (post) => {
    dispatch(actions.EditMode())
    dispatch(actions.EditAddForm(post))
    dispatch(actions.SwitchVisible(true))
  }

  const DeleteButton = (post) => {
    dispatch(actions.DeletePost(post.id, jsonAmount))
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
          <EditOutlined onClick={() => EditButton(post)} />
          <DeleteOutlined onClick={() => DeleteButton(post)} />
        </Space>
      )
    }
  ]

  const sourceData = posts ? (
    <Table
      style={tableCss}
      columns={columns}
      pagination={true}
      dataSource={posts}
    />
  ) : (
    <Spin style={spinCss} />
  )
  return <Row justify="center">{sourceData}</Row>
}

export default TableForm
