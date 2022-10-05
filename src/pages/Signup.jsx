import { useContext } from 'react'
import { Link } from 'react-router-dom'
import RecipeContext from '../context/RecipeContext'

function Signup() {

  const {signUp,checkEmail,checkPw} = useContext(RecipeContext)

  const handleSignUp = (e)=>{
    //@TODO check to see if user is signed in after signup
    e.preventDefault()
    signUp()
  }

  return (
    <div className='login'>
      <form onSubmit={handleSignUp} className='login__form' action="signIn">
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