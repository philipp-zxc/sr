import React, { useState } from 'react'
import { Students, byMonth } from '../scripts/1/script'

const students = new Students()

export const Page1 = (props) => {
  const defaultForm = {
    fio: '',
    address: '',
    value: '',
    gender: '',
    day: '',
    month: '',
    year: '',
  }
  const [month, setMonth] = useState([])
  const [form, setForm] = useState({ ...defaultForm })
  //const [students, setStudents] = useState(new Students())
  const onFormChangeHandler = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }))
  }
  const onButtonClickHandler = (e) => {
    students.addTail(
      form.fio,
      form.address,
      form.value,
      form.gender,
      form.day,
      form.month - 1,
      form.year
    )
    setForm({ ...defaultForm })
  }
  const studentsArray = students.toArray()
  return (
    <div className=''>
      <div className=''>
        <div className='input-field'>
          <input
            placeholder='ФИО'
            id='first_name'
            type='text'
            className='validate'
            name='fio'
            value={form.fio}
            onChange={onFormChangeHandler}
            autoComplete='off'
          />
        </div>
        <div className='input-field'>
          <input
            placeholder='Адрес'
            id='first_name'
            type='text'
            className='validate'
            name='address'
            value={form.address}
            onChange={onFormChangeHandler}
            autoComplete='off'
          />
        </div>
        <div className='input-field'>
          <input
            placeholder='Средний балл'
            id='first_name'
            type='text'
            className='validate'
            name='value'
            value={form.value}
            onChange={onFormChangeHandler}
            autoComplete='off'
          />
        </div>
        <div className='input-field'>
          <input
            placeholder='Пол'
            id='first_name'
            type='text'
            className='validate'
            name='gender'
            value={form.gender}
            onChange={onFormChangeHandler}
            autoComplete='off'
          />
        </div>
        <div className='row'>
          <div className='input-field col s2'>
            <input
              placeholder='ДД'
              id='first_name'
              type='text'
              className='validate'
              name='day'
              value={form.day}
              onChange={onFormChangeHandler}
              autoComplete='off'
            />
          </div>
          <div className='input-field col s2'>
            <input
              placeholder='ММ'
              id='first_name'
              type='text'
              className='validate'
              name='month'
              value={form.month}
              onChange={onFormChangeHandler}
              autoComplete='off'
            />
          </div>
          <div className='input-field col s2'>
            <input
              placeholder='ГГГГ'
              id='first_name'
              type='text'
              className='validate'
              name='year'
              value={form.year}
              onChange={onFormChangeHandler}
              autoComplete='off'
            />
          </div>
        </div>
      </div>
      <div
        className='waves-effect waves-light btn-small'
        onClick={onButtonClickHandler}
      >
        Добавить
      </div>
      <br />
      {studentsArray.map((item, index) => {
        return (
          <div key={index}>
            name: {item.fio} address: {item.address} value: {item.value} gender:{' '}
            {item.gender} birthday:{item.birthday.toDateString()}
          </div>
        )
      })}
      <br />
      <div
        className='waves-effect waves-light btn-small'
        onClick={() => setMonth(byMonth(students))}
      >
        По месяцам
      </div>
      <div>
        {month.map((item, index) => {
          return item + ' '
        })}
      </div>
    </div>
  )
}
