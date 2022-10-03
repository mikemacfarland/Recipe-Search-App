import { Link } from 'react-router-dom'
import {ReactComponent as SpoonFork} from '../assets/icons/spoonfork.svg'

function LogoLink() {
  return (
    <Link className='logo' to='/'>
        <p className='logo__text'>THE</p>
        <SpoonFork className='logo__img'/>
        <p className='logo__text'>SAUCE</p>
    </Link>
  )
}

export default LogoLink