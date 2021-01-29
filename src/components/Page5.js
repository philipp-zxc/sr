import React, { useState } from 'react'
import { calc } from '../scripts/5/1'
import { Graph } from '../scripts/5/2'

const initialMatrix = [
  [0, 7, 9, 0, 0, 14],
  [7, 0, 10, 15, 0, 0],
  [9, 10, 0, 11, 0, 2],
  [0, 15, 11, 0, 6, 0],
  [0, 0, 0, 6, 0, 9],
  [14, 0, 2, 0, 9, 0],
]

const g1 = new Graph(5)

export const Page5 = (props) => {
  const [range, setRange] = useState(11)
  const [matrix, setMatrix] = useState(initialMatrix)
  const [result, setResult] = useState('')
  const [verter, setVertex] = useState(0)
  const [result2, setResult2] = useState('')
  const [adj, setAdj] = useState('1 0, 0 2, 2 1, 0 3, 3 4')
  const onMatrixInputChange = (e) => {
    const [i, j] = e.target.name.split('-')
    setMatrix((matrix) => {
      const newMatrix = matrix.slice()
      newMatrix[i][j] = +e.target.value
      return newMatrix
    })
  }
  const onRangeChange = (e) => {
    setRange(+e.target.value)
  }
  const onCalcClick = (e) => {
    setResult(calc(matrix.slice(), 0, range))
  }
  const onVertexChange = (e) => {
    setVertex(+e.target.value)
  }
  const onCalc2Click = (e) => {
    const adjs = adj.split(',')
    for (const _adj of adjs) {
      const [v1, v2] = _adj.trim().split(' ')
      g1.addEdge(+v1, +v2)
    }
    setResult2('Список смежных вершин:\n' + g1.printSCC())
  }
  const inputs = matrix.map((row, i) => {
    const curRow = row.map((item, j) => {
      return (
        <input
          value={item}
          autoComplete='off'
          onChange={onMatrixInputChange}
          name={`${i}-${j}`}
          className='col s2'
          key={j}
        />
      )
    })
    return (
      <div className='row' key={i}>
        {curRow}
      </div>
    )
  })
  return (
    <div>
      <div className='row'>
        <div className='row col s6'>{inputs}</div>
        <div className='row col s6'>
          Введите вершину:
          <input value={verter} onChange={onVertexChange} autoComplete='off' />
          Введите расстояние:
          <input value={range} onChange={onRangeChange} autoComplete='off' />
          <input type='button' value='Вычислить' onClick={onCalcClick} />
          <pre>{result}</pre>
        </div>
      </div>
      <div className='row'>Введите список смежных вершин (5):</div>
      <input
        value={adj}
        onChange={(e) => setAdj(e.target.value)}
        autoComplete='off'
        placeholder='v1 v2, v1 v3, v3 v2 ...'
      />
      <input type='button' value='Вычислить' onClick={onCalc2Click} />
      <pre>{result2}</pre>
    </div>
  )
}
