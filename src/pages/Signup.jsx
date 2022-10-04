import { useContext } from 'react'
import { Link } from 'react-router-dom'
import RecipeContext from '../context/RecipeContext'

function Signup() {

  const {setEmail,setPassword,signUp} = useContext(RecipeContext)

  const checkEmail = (e)=>{
    const email = e.target.value
    //@TODO use funciton to check if real email (make sure @ symbol make sure . is present)
    setEmail(email)
  }

  const checkPw = (e)=>{
    const password = e.target.value
    //@TODO use function to validate password requirements (8characters, one capital one special)
    setPassword(password)
  }

  const signup = (e)=>{
    e.preventDefault()
    signUp()
  }

  return (
    <div className='login'>
      <form onSubmit={signup} className='login__form' action="signIn">
        <fieldset>
          <legend>SIGNUP</legend>
          <label htmlFor="email">Email</label>
          <input onBlur={checkEmail} id='email' type="text" />
          <label htmlFor="password">Password</label>
          <input onBlur={checkPw} id='password' type="text" />
          <button>Signup</button>
          <p>Already have an account?&nbsp;<Link to='/Login'>Login</Link></p>
        </fieldset>
      </form>
    </div>
  )
}

export default Signup