import React, { useState, useEffect, forwardRef } from 'react'

const cloneDeep = value => JSON.parse(JSON.stringify(value))

const DefaultAdder = props => (
  <button style={{ width: '100%' }} {...props}>
    +
  </button>
)

const DefaultRemover = props => <button {...props}>-</button>

const Addmore = (props, ref) => {
  const [dataArr, setDataArr] = useState(props.value || [])
  useEffect(() => {
    if ('value' in props) {
      setDataArr(
        props.value.map(v => ({
          _key: Date.now(),
          ...v
        }))
      )
    }
  }, [])
  const { onChange, Item, children, remover } = props
  const triggerChange = arr => {
    setDataArr(arr)
    const withNoKey = arr.map(({ _key, ...rest }) => rest)
    onChange(withNoKey)
  }
  const itemChange = (index, value) => {
    const newDataArr = cloneDeep(dataArr)
    newDataArr[index] = value

    triggerChange(newDataArr)
  }
  const removeItem = index => {
    let newDataArr = cloneDeep(dataArr)
    newDataArr.splice(index, 1)

    triggerChange(newDataArr)
  }
  const addItem = () => {
    const newDataArr = [...dataArr, { _key: Date.now() }]
    triggerChange(newDataArr)
  }
  const Adder = children || DefaultAdder
  const Remover = remover || DefaultRemover
  return (
    <div ref={ref}>
      <div>
        {dataArr &&
          dataArr.map((d, i) => {
            return (
              <div key={d._key} style={{ display: 'flex', padding: '8px' }}>
                <div style={{ flex: 1 }}>
                  <Item value={d} onChange={value => itemChange(i, value)} />
                </div>
                <div style={{ flex: 0 }}>
                  <Remover onClick={() => removeItem(i)} />
                </div>
              </div>
            )
          })}
      </div>
      <div style={{ padding: '8px' }}>
        <Adder onClick={addItem} />
      </div>
    </div>
  )
}

export default forwardRef(Addmore)
