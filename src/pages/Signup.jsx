import { useContext } from 'react'
import { Link } from 'react-router-dom'
import RecipeContext from '../context/RecipeContext'

function Signup() {

  const {signUp,
      setAlert,
      checkEmail,
      checkPw,
      setUserName,
      setPassword,
      setEmail,
  } = useContext(RecipeContext)

  const handleSignUp = (e)=>{
    e.preventDefault()
    if(!checkPw() && !checkEmail()){
      setAlert({type:'--error',value:'invalid password or email'})
    }
    if(!checkPw() && checkEmail()){
      setAlert({type:'--error',value:'password must be 8 characters long with 1 uppercase letter, 1 number and 1 special character'})
    }
    if(!checkEmail() && checkPw()){
      setAlert({type:'--error',value:'invalid email'})
    }
    else if(checkEmail() && checkPw()){
      signUp()
    }
  }

  const handleSetPw = (e)=> setPassword(e.target.value)
  
  const handleSetEmail = (e) => setEmail(e.target.value)

  const handleSetUserName = (e)=> setUserName(e.target.value)

  return (
    <div className='login'>
      <form onSubmit={handleSignUp} className='login__form' action="signIn">
        <fieldset>
          <legend>SIGNUP</legend>
          <label htmlFor="userName">UserName</label>
          <input onBlur={handleSetUserName} id='userName' type="text" />
          <label htmlFor="email">Email</label>
          <input onBlur={handleSetEmail} id='email' type="text" />
          <label htmlFor="password">Password</label>
          <input onBlur={handleSetPw} id='password' type="text" />
          <button>Signup</button>
          <p>Already have an account?&nbsp;<Link to='/Login'>Login</Link></p>
        </fieldset>
      </form>
    </div>
  )
}

export default Signup