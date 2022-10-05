import {useContext} from 'react'
import RecipeContext from '../context/RecipeContext'
import { Link,} from 'react-router-dom'

function Login() {
  //@TODO take to home page after signup
    //@TODO check to see if user is signed in after signup
    //@TODO make button unclickable if credentials dont meet checks
  const {checkEmail,checkPw,login} = useContext(RecipeContext)

  const handleSignIn = (e)=>{
    e.preventDefault()
    login()
    
  }

  return (
    <div className='login'>
      <form onSubmit={handleSignIn} className='login__form' action="signIn">
        <fieldset>
          <legend>LOGIN</legend>
          <label htmlFor="email">Email</label>
          <input onBlur={checkEmail} id='email' type="text" />
          <label htmlFor="password">Password</label>
          <input onBlur={checkPw} id='password' type="text" />
          <Link to='/ForgotPassword'>Forgot Password?</Link>
          <button>Login</button>
          <p>Dont have an account?&nbsp;<Link to='/Signup'>Signup</Link></p>
        </fieldset>
      </form>
    </div>
  )
}

export default Login