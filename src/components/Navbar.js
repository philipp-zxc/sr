import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = (props) => {
  return (
    <div className='navbar'>
      <nav className='light-green darken-1'>
        <div className='container'>
          <div className='nav-wrapper'>
            <ul id='nav-mobile' className='left hide-on-med-and-down'>
              <li>
                <NavLink to='/1' href='sass.html'>
                  ПР 1
                </NavLink>
              </li>
              <li>
                <NavLink to='/2' href='sass.html'>
                  ПР 2
                </NavLink>
              </li>
              <li>
                <NavLink to='/3' href='sass.html'>
                  ПР 3
                </NavLink>
              </li>
              <li>
                <NavLink to='/4' href='sass.html'>
                  ПР 4
                </NavLink>
              </li>
              <li>
                <NavLink to='/5' href='sass.html'>
                  ПР 5
                </NavLink>
              </li>
              <li>
                <NavLink to='/6' href='sass.html'>
                  ПР 6
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
