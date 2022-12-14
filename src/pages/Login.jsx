import {useContext} from 'react'
import RecipeContext from '../context/RecipeContext'
import { Link,} from 'react-router-dom'

function Login() {
  const {checkEmail,checkPw,login,showAlert,setEmail,setPassword} = useContext(RecipeContext)

  const handleSignIn = (e)=>{
    (!checkEmail() && checkPw()) ? showAlert('error','Invalid Email adress') :
    (checkEmail() && !checkPw()) ? showAlert('error','Invalid Password') :
    (!checkEmail() && !checkPw()) ? showAlert('error','Invalid Email or Password') :
    login()
    e.preventDefault()
  }

  const handleSetEmail =(e)=> setEmail(e.target.value)

  const handleSetPassword = (e)=> setPassword(e.target.value)

  return (
    <div className='login'>
      <form onSubmit={handleSignIn} className='login__form'>
        <fieldset>
          <legend>LOGIN</legend>
          <label htmlFor="email">Email</label>
          <input onBlur={handleSetEmail} id='email' type="text" />
          <label htmlFor="password">Password</label>
          <input onBlur={handleSetPassword} id='password' type="text" />
          <Link to='/ForgotPassword'>Forgot Password?</Link>
          <button>Login</button>
          <p>Dont have an account?&nbsp;<Link to='/Signup'>Signup</Link></p>
        </fieldset>
      </form>
    </div>
  )
}

export default Login