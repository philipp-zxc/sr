import React, { useState } from 'react'
import { arbitrage } from '../scripts/6/1'
import { dijkstra, f, getData, path, _path } from './../scripts/6/2'

const initialRates = [
  [1, 0.23, 0.25, 16.43, 18.21, 4.94],
  [4.34, 1, 1.11, 71.4, 79.09, 21.44],
  [3.93, 0.9, 1, 64.52, 71.48, 19.37],
  [0.061, 0.014, 0.015, 1, 1.11, 0.3],
  [0.055, 0.013, 0.014, 0.9, 1, 0.27],
  [0.2, 0.047, 0.052, 3.33, 3.69, 1],
]

export const Page6 = (props) => {
  const [rates, setRates] = useState(initialRates)
  const [matrix, setMatrix] = useState(getData())
  const [matrix2, setMatrix2] = useState(getData())
  const [result1, setResult1] = useState('')
  const [result2, setResult2] = useState('')
  const [result3, setResult3] = useState('')
  const [start, setStart] = useState(0)
  const [start2, setStart2] = useState(0)
  const [end, setEnd] = useState(1)
  const [end2, setEnd2] = useState(1)
  const makeMatrix = (state, set) => {
    return state.map((row, i) => {
      const curRow = row.map((item, j) => {
        const onInpChange = (e) =>
          set((st) => {
            const newState = st.slice()
            newState[i][j] = +e.target.value
            return newState
          })
        return (
          <input
            value={state[i][j]}
            autoComplete='off'
            onChange={onInpChange}
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
  }
  const inputs = makeMatrix(rates, setRates)
  const calcArbitrage = (e) => {
    setResult1(arbitrage(rates))
  }
  const inputs2 = makeMatrix(matrix, setMatrix)
  const calcMatrix = (e) => {
    const { distances, prevs } = dijkstra(matrix, start)
    let res = distances.reduce(
      (res, item) => res + ' ' + item,
      'Дистанции до узлов: '
    )
    res = _path(prevs, end, start).reduce(
      (calc, item) => calc + item + ' ',
      res + '\nПуть из узла ' + start + ' до узла ' + end + ': '
    )
    setResult2(res)
  }

  const inputs3 = makeMatrix(matrix2, setMatrix2)
  const calcMatrix2 = (e) => {
    const m2Copy = matrix2.slice().map((item) => item.slice())
    const { matrix, path: __path } = f(m2Copy)
    let res = 'Расстояние до улов:\n'
    let k = 0
    for (const i of matrix) {
      res += `Узел ${k++}: `
      for (const j of i) {
        res += j + ' '
      }
      res += '\n'
    }
    res += `Путь из ${start2} в ${end2}:\n`
    const $path = path(__path, +start2, +end2)
    for (const item of $path) {
      res += item + ' '
    }
    setResult3(res)
  }
  return (
    <div>
      <div className='row'>
        <div className='col s6'>
          Список валют: PLN EUR USD RUB INR MXN
          {inputs}
        </div>
        <div className='col s6'>
          <input type='button' value='Вычислить' onClick={calcArbitrage} />
          {result1}
        </div>
      </div>
      <div className='row'>
        <div className='col s6'>{inputs2}</div>
        <div className='col s6'>
          Введите номер вершины:
          <input value={start} onChange={(e) => setStart(e.target.value)} />
          Введите номер вершины 2:
          <input value={end} onChange={(e) => setEnd(e.target.value)} />
          <input type='button' value='Вычислить' onClick={calcMatrix} />
          <br />
          <pre>{result2}</pre>
        </div>
      </div>
      <div className='row'>
        <div className='col s6'>{inputs3}</div>
        <div className='col s6'>
          Введите номер вершины:
          <input value={start2} onChange={(e) => setStart2(e.target.value)} />
          Введите номер вершины 2:
          <input value={end2} onChange={(e) => setEnd2(e.target.value)} />
          <input type='button' value='Вычислить' onClick={calcMatrix2} />
          <pre>{result3}</pre>
        </div>
      </div>
    </div>
  )
}
