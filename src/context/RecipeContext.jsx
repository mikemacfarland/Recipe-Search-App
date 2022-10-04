import { createContext,useState,useEffect} from "react";

import {
    getAuth,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
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

    const [alert,setAlert] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const auth = getAuth();
    const alertEl = document.querySelector('.alert')
    
    // SIGNUP
    const signUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
          })
          // Handle Error
          .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            console.log(errorCode)
            errorCode === 'auth/email-already-in-use' ? setAlert('User already exists') : 
            errorCode === 'auth/internal-error' ? setAlert('Password required') : 

            showAlert()
          });
    }

    //LOGIN
    const login = async ()=>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
            })
            // Handle Error
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                //set error according to response
                errorCode === 'auth/user-not-found' ? setAlert('User not found, invalid Email') :
                errorCode === 'auth/internal-error' ? setAlert('Invalid email/password') :
                errorCode === 'auth/wrong-password' ? setAlert('Invalid Password') : setAlert('')
                console.log(errorCode)
                console.log(errorMessage)
                showAlert()
            });
    }

    //LOST PW
    const lostPassword = async ()=>{
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setAlert(`email sent to ${email}`)
            showAlert()
        })
        .catch((error) => {
            const errorCode = error.code;
            // const errorMessage = error.message;
            errorCode === 'auth/user-not-found' ? setAlert('User not found') : setAlert('')
            showAlert()
        });
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

    //show alert
    const showAlert = ()=>{
        alertEl.classList.toggle('--error')
                setTimeout(()=>{
                    alertEl.classList.toggle('--error')
                },3000)
    }

    //check email
    //@TODO put the checking in the function to call
    const checkEmail = (e)=>{
        const email = e.target.value
        if(email.length > 3 && email.includes('@') && email.includes('.')){
          setEmail(email)
        }
        else{
          setAlert('Please enter a valid Email')
          showAlert()
        }    
      }

    // check password - signup, login components
    // @TODO put the checking in the function to call 
    const checkPw = (e)=>{
        const password = e.target.value
        
        //use regex to check password 
        //@TODO conditional filtering should only be used for signup
        if(password.length >= 8 && password.includes('!','@','#','$','%','^','&','*'))
        setPassword(password)
        else{
            setAlert('weak password. required length: 8 characters and at least 1 special character')
            showAlert()
        }
    }


    //return provider with children
    // this is a functional component with children passed into it
    return <RecipeContext.Provider value={{
        recipes,
        alert,
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