import React from 'react'
const cloneDeep = value => JSON.parse(JSON.stringify(value))

const DefaultAdder = props => (
  <button style={{ width: '100%' }} {...props}>
    +
  </button>
)

const DefaultRemover = props => <button {...props}>-</button>
const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const isArr = v => Object.prototype.toString.call(v) === '[object Array]'
class Addmore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataArr: props.value
        ? props.value.map((v, i) => ({
          _key: 'item-' + i,
          ...v
        }))
        : []
    }
  }
  componentWillReceiveProps(np) {
    if (isArr(np.value) && !isEqual(np.value, this.props.value)) {
      this.setState({
        dataArr: np.value.map((v, i) => ({
          _key: 'item-' + i,
          ...v
        }))
      })
    }
  }
  render() {
    const { onChange, Item, children, remover } = this.props
    const dataArr = this.state.dataArr
    const triggerChange = arr => {
      this.setState({ dataArr: arr })
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
      <div>
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
}

export default Addmore
