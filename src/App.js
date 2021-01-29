import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Page1 } from './components/Page1'
import { Page2 } from './components/Page2'
import { Page3 } from './components/Page3'
import { Page4 } from './components/Page4'
import { Page5 } from './components/Page5'
import { Page6 } from './components/Page6'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div className='container'>
        <Switch>
          <Route path='/1' component={Page1} />
          <Route path='/2' component={Page2} />
          <Route path='/3' component={Page3} />
          <Route path='/4' component={Page4} />
          <Route path='/5' component={Page5} />
          <Route path='/6' component={Page6} />
          <Redirect to='/1' />
        </Switch>
      </div>
    </div>
  )
}

export default App
