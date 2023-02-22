import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import RecipeContext from '../context/RecipeContext'
import { checkEmail,checkPw } from '../utilities/helpers'
import { signUp } from '../utilities/user'

function Signup() {

  const navigate = useNavigate()

  const {
    auth,
    userName,
    setCurrentUser,
    password,
    email,
    setAlert,
    setUserName,
    setPassword,
    setEmail,
    setSignedIn,
    setUserFavorites
  } = useContext(RecipeContext)

  const handleSignUp = (e)=>{
    e.preventDefault()
    if(!checkPw(password) && !checkEmail(email)){
      setAlert({type:'--error',value:'invalid password or email'})
    }
    if(!checkPw(password) && checkEmail(email)){
      setAlert({type:'--error',value:'password must be 8 characters long with 1 uppercase letter, 1 number and 1 special character'})
    }
    if(!checkEmail(email) && checkPw(password)){
      setAlert({type:'--error',value:'invalid email'})
    }
    else if(checkEmail(email) && checkPw(password)){
      signUp(auth,email,password,userName,setCurrentUser,setAlert,setSignedIn,setEmail,setPassword,setUserFavorites)
      setEmail('')
      setPassword('')
      navigate('/')
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