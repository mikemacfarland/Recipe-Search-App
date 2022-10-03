import React from 'react'
import { Link } from 'react-router-dom'
import LogoLink from './LogoLink'


//@TODO add favorites page
//@TODO move about link to bottom of page
//@TODO add lists page with favorites?
//@TODO add account page
//@TODO add login opt in with button
function Nav() {
  return (
    <nav className='nav'>
        <ul className='nav__ul'>
            <li className='nav__ul__li'>
                <LogoLink/>
            </li>
            <li className='nav__ul__li'>
              <Link className='nav__ul__li__link' to='/Login'>Login</Link>
            </li>
            <li className='nav__ul__li'>
              <Link className='nav__ul__li__link' to='/Favorites' >Favorites</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Nav