import { Link } from 'react-router-dom'


function Signup() {
  return (
    <div className='login'>
      <form className='login__form' action="signIn">
        <fieldset>
          <legend>SIGNUP</legend>
          <label htmlFor="email">Email</label>
          <input id='email' type="text" />
          <label htmlFor="password">Password</label>
          <input id='password' type="text" />
          <button>Signup</button>
          <p>Already have an account?&nbsp;<Link to='/Login'>Login</Link></p>
        </fieldset>
      </form>
    </div>
  )
}

export default Signup