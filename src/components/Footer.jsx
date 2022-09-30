import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className='footer'>
      <Link className='footer__link' to='/about'>About</Link>
      <Link className='footer__link' to='/'>Home</Link>
      <small>Copyright © <strong>Mike Macfarland</strong> 2022</small>
    </footer>
  )
}

export default Footer