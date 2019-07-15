import React, { Component, useState } from 'react'
import Addmore from 'react-one-more'

const Item = ({ value, onChange }) => {
  const [obj, setObj] = useState(value)
  const handleChange = (key, value) => {
    const newObj = { ...obj, [key]: value }
    setObj(newObj)
    onChange(newObj)
  }
  return (
    <div>
      <span>A:</span>
      <input onChange={e => handleChange('a', e.target.value)} value={obj.a} />
      <span>B:</span>
      <input onChange={e => handleChange('b', e.target.value)} value={obj.b} />
    </div>
  )
}
export default class App extends Component {
  state = {
    value: [{ a: 1, b: 2 }]
  }
  render() {
    return (
      <div style={{ width: '400px' }}>
        <Addmore
          value={this.state.value}
          Item={Item}
          onChange={value => {
            this.setState({ value: [] })
            console.log('result', value)
          }}
        />
      </div>
    )
  }
}
