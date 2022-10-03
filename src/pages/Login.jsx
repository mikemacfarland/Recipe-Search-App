import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='login'>
      <form className='login__form' action="signIn">
        <fieldset>
          <legend>LOGIN</legend>
          <label htmlFor="email">Email</label>
          <input id='email' type="text" />
          <label htmlFor="password">Password</label>
          <input id='password' type="text" />
          <Link to='/ForgotPassword'>Forgot Password?</Link>
          <button>Login</button>
          <p>Dont have an account?&nbsp;<Link to='/Signup'>Signup</Link></p>
        </fieldset>
      </form>
    </div>
  )
}

export default Login