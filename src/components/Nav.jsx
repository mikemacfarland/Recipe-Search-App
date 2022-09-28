import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav className='nav'>
        <ul className='nav__ul'>
            <li className='nav__ul__li'><Link className='nav__ul__li__link' to='/'>Home</Link></li>
            <li className='nav__ul__li'><Link className='nav__ul__li__link' to='/about'>About</Link></li>
        </ul>
    </nav>
  )
}

export default Nav