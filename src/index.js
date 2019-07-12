import React, { useState, useEffect, forwardRef } from 'react'

const cloneDeep = value => JSON.parse(JSON.stringify(value))

const Addmore = (props, ref) => {
  const [dataArr, setDataArr] = useState(props.value || [])
  useEffect(() => {
    if ('value' in props) {
      setDataArr(props.value)
    }
  })
  const { onChange, Item } = props
  const handleChange = (index, value) => {
    const newDataArr = cloneDeep(dataArr)
    newDataArr[index] = value
    setDataArr(newDataArr)
    onChange(newDataArr)
  }
  const removeItem = index => {
    let newDataArr = cloneDeep(dataArr)
    newDataArr.splice(index, 1)
    setDataArr(newDataArr)
    onChange(newDataArr)
  }
  return (
    <div ref={ref}>
      <div>
        {dataArr &&
          dataArr.map((d, i) => {
            return (
              <div key={i} style={{ display: 'flex' }}>
                <Item value={d} onChange={value => handleChange(i, value)} />
                <div onClick={() => removeItem(i)}>x</div>
              </div>
            )
          })}
      </div>
      <button
        onClick={() => {
          setDataArr([...dataArr, {}])
          onChange([...dataArr, {}])
        }}
      >
        +
      </button>
    </div>
  )
}

export default forwardRef(Addmore)
