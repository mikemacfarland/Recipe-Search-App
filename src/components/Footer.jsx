import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='footer'>
      <Link className='nav__ul__li__link' to='/about'>About</Link>
      <small>Copyright © <strong>Mike Macfarland</strong> 2022</small>
    </footer>
  )
}

export default Footer