import React, { Component } from 'react'
import { Button, DatePicker } from 'antd'
import './app.css'
import 'antd/dist/antd.css'

class App extends Component {
  
  render() {
    return (
      <>
        <Button type="primary">PRESS ME</Button>
        <DatePicker placeholder="select date" />
      </>
    )
  }
}

export default App
