import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import RecipeContext from '../context/RecipeContext'
import { Link,} from 'react-router-dom'
import { getUserData } from '../utilities/database'
import { login } from '../utilities/user'
import { checkEmail,checkPw } from '../utilities/helpers'

function Login() {
  const {
    setAlert,
    setEmail,
    setPassword,
    setCurrentUser,
    currentUser,
    setUserFavorites,
    setSignedIn,
    email,
    password,
    auth} = useContext(RecipeContext)
    
  const navigate = useNavigate()

  const handleSignIn = (e)=>{
    (!checkEmail(email) && checkPw(password)) ? setAlert({type:'--error',value:'Invalid Email adress'}) :
    (checkEmail(email) && !checkPw(password)) ? setAlert({type:'--error',value:'Invalid Password'}) :
    (!checkEmail(email) && !checkPw(password)) ? setAlert({type:'--error',value:'Invalid Email or Password'}) :
    login(auth,email,password,setAlert,setCurrentUser,setSignedIn,setEmail,setPassword,setUserFavorites)
    e.preventDefault()
    
    navigate('/')
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