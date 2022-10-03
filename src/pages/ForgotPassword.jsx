import { Link } from "react-router-dom"

function ForgotPassword() {
  return (
    <div className='login'>
      <form className='login__form' action="signIn">
        <fieldset>
          <legend>LOST PASSWORD</legend>
          <label htmlFor="email">Email</label>
          <input id='email' type="text" />
          <button>Send Password Reset</button>
          <p>Already have an account?&nbsp;<Link to='/Login'>Login</Link></p>
          <p>Dont have an account?&nbsp;<Link to='/Signup'>Signup</Link></p>
        </fieldset>
      </form>
    </div>
  )
}

export default ForgotPassword