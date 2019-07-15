# react-add-more

> add more fields group into form

[![NPM](https://img.shields.io/npm/v/react-one-more.svg)](https://www.npmjs.com/package/react-add-more) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-add-more
```

## Usage

```jsx
import React, { Component, useState } from 'react'
import Addmore from 'react-add-more'

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
    value: [{ a: 1, b: 2 }],
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
```

## License

MIT © [jack](https://github.com/baidan4855)
