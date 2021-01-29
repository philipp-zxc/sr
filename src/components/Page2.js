import React, { useState } from 'react'
import { Students } from '../scripts/1/script'
import { Tree } from '../scripts/2/1'

const students = new Tree()

const initialForm = {
  number: '',
  fio: '',
  group: '',
  avg: '',
}

export const Page2 = (props) => {
  const [form, setForm] = useState({ ...initialForm })
  const [numberToDelete, setNumberToDelete] = useState('')
  const onInputChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const onAddStudentHandler = (e) => {
    students.insert(form.number, form.fio, form.group, form.avg)
    setForm({ ...initialForm })
  }
  const studentsArr = []
  students.traverse((item) => {
    const el = (
      <div key={item.number}>
        {item.number}. {item.fio}, {item.group}, {item.avg}
      </div>
    )
    studentsArr.push(el)
  })
  const onDeleteStudentHandler = (e) => {
    students.remove(numberToDelete)
    students.traverse(console.log)
    setNumberToDelete('')
  }
  return (
    <div>
      <div>
        Номер:{' '}
        <input
          name='number'
          value={form.number}
          onChange={onInputChangeHandler}
          autoComplete='off'
        />
        ФИО:{' '}
        <input
          name='fio'
          value={form.fio}
          onChange={onInputChangeHandler}
          autoComplete='off'
        />
        Группа:{' '}
        <input
          name='group'
          value={form.group}
          onChange={onInputChangeHandler}
        />
        Средний балл:{' '}
        <input
          name='avg'
          value={form.avg}
          onChange={onInputChangeHandler}
          autoComplete='off'
        />
      </div>
      <input type='button' value='Добавить' onClick={onAddStudentHandler} />
      <input
        value={numberToDelete}
        onChange={(e) => setNumberToDelete(e.target.value)}
      />
      <input type='button' value='Удалить' onClick={onDeleteStudentHandler} />
      {studentsArr}
      <div>
        {studentsArr.length
          ? 'Худший средний балл: ' +
            students.worst().avg +
            ' у студента ' +
            students.worst().fio
          : null}
        <br />
        {studentsArr.length
          ? 'Лучший средний балл: ' +
            students.best().avg +
            ' у студента ' +
            students.best().fio
          : null}
      </div>
    </div>
  )
}
