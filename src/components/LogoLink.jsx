import {ReactComponent as SpoonFork} from '../assets/icons/spoonfork.svg'

function LogoLink() {
  return (
    <div>
        <p className='logo__text'>THE</p>
        <SpoonFork className='logo__img'/>
        <p className='logo__text'>SAUCE</p>
    </div>
  )
}

export default LogoLink