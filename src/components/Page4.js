import React, { useState } from 'react'
import { substr } from '../scripts/4/1'
import { calc } from '../scripts/4/2'

const initial = [
  [0, 3.22, 3.57, 4.12, 4, 4.85],
  [0, 3.33, 4.87, 5.26, 7.34, 9.49],
  [0, 4.27, 7.64, 10.25, 15.93, 16.12],
]

export const Page4 = (props) => {
  const [str, setStr] = useState('')
  const [result, setResult] = useState('')
  const [values, setValues] = useState(initial)
  const [result2, setResult2] = useState('')
  const onCalcButtonClick = (e) => {
    setResult(substr(str))
  }
  const onValueChange = (e) => {
    const [i, j] = e.target.name.split('-')
    setValues((values) => {
      const arr = values.slice()
      arr[i][j] = +e.target.value
      return arr
    })
  }
  const inputs = values.map((factory, id) => {
    const els = factory.map((_, index) => {
      return (
        <input
          key={index}
          className={'col s1 ' + (index === 0 ? 'offset-s1' : '')}
          name={id + '-' + index}
          autoComplete='off'
          value={values[id][index]}
          onChange={onValueChange}
        />
      )
    })
    return (
      <div className='row' key={id}>
        <div className='col' key={id}>
          Предприятие {id + 1}
        </div>
        {els}
      </div>
    )
  })
  const onCalcTableButtonClick = (e) => {
    const res = calc(values)
    const resStr =
      'Лучшая стратегия инвестирования:\n1ое предприятие: ' +
      res[0] +
      '\n2ое предприятие: ' +
      res[1] +
      '\n3е предприятие: ' +
      res[2] +
      '\nОбщий результат: ' +
      res[3]
    setResult2(resStr)
  }
  return (
    <div>
      Введите посдовательность чисел:
      <input
        value={str}
        onChange={(e) => setStr(e.target.value)}
        autoComplete='off'
      />
      <input type='button' onClick={onCalcButtonClick} value='Вычислить' />
      <div>{result}</div>
      <br />
      <br />
      {inputs}
      <input type='button' onClick={onCalcTableButtonClick} value='Вычислить' />
      <pre>{result2}</pre>
    </div>
  )
}
