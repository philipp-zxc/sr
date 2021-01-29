import React, { useState } from 'react'
import { Z } from '../scripts/3/1'
import { Haffman } from '../scripts/3/2'

const a = new Z()

const initForm = {
  total: '',
  buckets: '',
}

export const Page3 = (prop) => {
  const [form, setForm] = useState({ ...initForm })
  const [result, setResult] = useState('')
  const [str, setStr] = useState('')
  const [hashResult, setHashResult] = useState('')
  const onFormChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const onCalcButtonClick = (e) => {
    const buckets = form.buckets.split(' ').map((item) => +item)
    a.setV(+form.total)
    a.setBucketsV(...buckets)
    let res = ''
    for (const tuple of a.calc().entries()) {
      res += `${tuple[0]} => ${tuple[1]}   `
    }
    setResult(res)
  }
  const onStrChange = (e) => {
    setStr(e.target.value)
  }
  const onHashButtonClick = (e) => {
    const frequencyTable = Haffman.makeFrequencyTable(str)
    const treeRoot = Haffman.makeTree(frequencyTable)
    const codeTable = Haffman.makeCodeTable(treeRoot)
    const encoded = Haffman.encode(str, codeTable)
    let frequencyTableStr = 'Результат кодирования: ' + encoded + '\n'
    frequencyTableStr += '\n\nТаблица частот:\n'
    for (const item of frequencyTable) {
      frequencyTableStr += item.letter + ' => ' + item.entries + '\n'
    }
    frequencyTableStr += '\n\n Таблица кодов: \n'
    for (const item of codeTable.entries()) {
      frequencyTableStr += item[0] + ' => ' + item[1] + '\n'
    }
    const { decoded, decodeTable } = Haffman.decode(codeTable, encoded)
    frequencyTableStr += '\n\nТаблица декодирования: \n'
    for (const item of decodeTable.entries()) {
      frequencyTableStr += item[0] + ' => ' + item[1] + '\n'
    }
    frequencyTableStr += '\n\nРезультат декодирования: ' + decoded
    setHashResult(frequencyTableStr)
  }
  return (
    <div>
      Общий объем
      <input
        value={form.total}
        name='total'
        onChange={onFormChangeHandler}
        autoComplete='off'
      />
      Объем ведер
      <input
        value={form.buckets}
        name='buckets'
        onChange={onFormChangeHandler}
        placeholder='v1 v2 v3...'
        autoComplete='off'
      />
      <input type='button' value='Вычислить' onClick={onCalcButtonClick} />
      {result ? '   Результат: ' + result : null}
      <br />
      <br />
      Введите строку:{' '}
      <input autoComplete='off' value={str} onChange={onStrChange} />
      <input type='button' onClick={onHashButtonClick} value='Вычислить' />
      <pre>{hashResult}</pre>
    </div>
  )
}
