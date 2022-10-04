import { useContext } from 'react'
import { Link } from 'react-router-dom'
import RecipeContext from '../context/RecipeContext'

function Signup() {

  const {setEmail,setPassword,signUp} = useContext(RecipeContext)

  const checkEmail = (e)=>{
    const email = e.target.value
    if(email.length > 3 && email.includes('@') && email.includes('.')){
      setEmail(email)
    }
    else{
      console.log('please enter valid email')
    }    
  }

  const checkPw = (e)=>{
    const password = e.target.value
    
    //use regex to check password 
    if(password.length >= 8 && password.includes('!','@','#','$','%','^','&','*'))
    console.log(password)
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