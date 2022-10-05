import RecipeContext from "../context/RecipeContext"
import { useContext } from "react"
import { Link } from "react-router-dom"

function ForgotPassword() {

  const {lostPassword,checkEmail} = useContext(RecipeContext)

  const handleLostPassword = (e)=>{
    e.preventDefault()
    lostPassword()
  }


  return (
    <div className='login'>
      <form onSubmit={handleLostPassword} className='login__form' action="signIn">
        <fieldset >
          <legend>LOST PASSWORD</legend>
          <label htmlFor="email">Email</label>
          <input onBlur={checkEmail} id='email' type="text" />
          <button>Send Password Reset</button>
          <p>Remembered your password?&nbsp;<Link to='/Login'>Login</Link></p>
          <p>Dont have an account?&nbsp;<Link to='/Signup'>Signup</Link></p>
        </fieldset>
      </form>
    </div>
  )
}

export default ForgotPassword