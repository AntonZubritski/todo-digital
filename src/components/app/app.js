import React, { Component } from 'react'
import './app.css'
import 'antd/dist/antd.css'
import AddPosts from '../add-posts'
import TableForm from '../table'

class App extends Component {
  render() {
    return (
      <>
        <AddPosts />
        <TableForm />
      </>
    )
  }
}

export default App
