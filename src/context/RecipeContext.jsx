import { createContext,useState,useEffect} from "react";

import {
    getAuth,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

    //import auth from firebase config file where auth is defined and
    // exported
    import {auth} from '../firebase_config'


const RecipeContext = createContext()
const url = 'https://api.spoonacular.com/recipes/random?number=2&apiKey=033797df84694890b040b816a119b147'
// const url = 'https://randomuser.me/api/?results=2'

export const RecipeProvider = ({children}) =>{


    // USERS

    //@TODO maybe use email for all 3 forms?
    const [error,setError] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const auth = getAuth();

    // SIGNUP WITH ERROR HANDLE
    const signUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
          })
          // Handle Error
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            errorCode === 'auth/email-already-in-use' ? setError('User already exists') : setError('')
            if(!error === ''){
                const errEl = document.querySelector('.error')
                errEl.classList.add('--active')
                setTimeout(()=>{
                errEl.classList.remove('--active')
                },3000) 
            }
          });
    }

    // LOGIN WITH ERROR HANDLE
    const login = async ()=>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                
            });
        console.log('login')
    }

    const lostPassword = async ()=>{
        console.log('lost password',email)
    }


    // RECIPES
    const [recipes,setRecipes] = useState([])

    const getRecipes = async (url)=>{
        const response = await fetch(url)
        const data = await response.json()
        setRecipes(data.recipes)
    }

    useEffect(()=>{
        getRecipes(url)
    },[])

    //HELPER FUNCTIONS

    //check email
    const checkEmail = (e)=>{
        const email = e.target.value
        if(email.length > 3 && email.includes('@') && email.includes('.')){
          setEmail(email)
        }
        else{
          console.log('please enter valid email')
        }    
      }

    // check password - signup, login
    const checkPw = (e)=>{
        const password = e.target.value
        
        //use regex to check password 
        if(password.length >= 8 && password.includes('!','@','#','$','%','^','&','*'))
        console.log(password)
        setPassword(password)
    }


    //return provider with children
    // this is a functional component with children passed into it
    return <RecipeContext.Provider value={{
        recipes,
        error,
        setRecipes,
        setPassword,
        setEmail,
        signUp,
        login,
        lostPassword,
        checkEmail,
        checkPw
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext