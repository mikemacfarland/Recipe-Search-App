import { Link } from 'react-router-dom'
import LogoLink from './LogoLink'
import { useContext } from 'react'
import RecipeContext from '../context/RecipeContext'


//@TODO add favorites page
//@TODO add lists page with favorites?
function Nav() {

  const {signedIn} = useContext(RecipeContext)

  return (
    <nav className='nav'>
        <ul className='nav__ul'>
            <li className='nav__ul__li'>
                <LogoLink/>
            </li>
            <li className='nav__ul__li'>
              {
              signedIn ? <Link className='nav__ul__li__link' to='/Account'>Account</Link>
              : <Link className='nav__ul__li__link' to='/Login'>Login</Link>
              }
            </li>
            <li className='nav__ul__li'>
            {signedIn ? 
              <Link className='nav__ul__li__link' to='/Favorites' >Favorites</Link>
             : <Link className='nav__ul__li__link' to='/Signup' >Signup</Link>
            }
            </li>
        </ul>
    </nav>
  )
}

export default Nav