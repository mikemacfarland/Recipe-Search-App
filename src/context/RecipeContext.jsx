import { createContext,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
    getAuth,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
    // onAuthStateChanged
    // MAY NEED ONAUTHSTATECHANGED IN FUTURE FOR USER  MANAGEMENT
} from 'firebase/auth'

    //import auth from firebase config file where auth is defined and
    // exported
    import {auth} from '../firebase_config'


const RecipeContext = createContext()
const url = 'https://api.spoonacular.com/recipes/random?number=2&apiKey=033797df84694890b040b816a119b147'
// const url = 'https://randomuser.me/api/?results=2'

export const RecipeProvider = ({children}) =>{
    const navigate = useNavigate()
    const [alert,setAlert] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [signedIn,setSignedIn] = useState(false)
    const [currentUser,setCurrentUser] = useState('')
    const auth = getAuth()
    const alertEl = document.querySelector('.alert')
    
    //SIGNUP & LOGIN
    const signUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            login(auth,email,password)
          })
          // Handle Error
          .catch((error) => {
            const errorCode = error.code;
            //@TODO work on error message handling
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
                setSignedIn(true)
                setCurrentUser(user)
                navigate('/')
            })
            // Handle Error
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                //@TODO work on error message handling
                errorCode === 'auth/user-not-found' ? setAlert('User not found, invalid Email') :
                errorCode === 'auth/internal-error' ? setAlert('Invalid email/password') :
                errorCode === 'auth/wrong-password' ? setAlert('Invalid Password') : setAlert('')
                console.log(errorCode)
                console.log(errorMessage)
                showAlert()
            });
    }

    //LOGOUT
    const logOut = ()=>{
        signOut(auth).then(() => {
            setSignedIn(false)
        }).catch((error) => {
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
            //@TODO modify this message
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

    //@TODO change initial api call for more results.
    useEffect(()=>{
        getRecipes(url)
    },[])


    //HELPER FUNCTIONS

    //@TODO set this funciton to pass weather error or message. to display properly for messages
    const showAlert = ()=>{
        const alertTimeout = ()=>setTimeout(()=>{
            alertEl.classList.remove('--error')
        },4000)
        if(alertEl.classList.contains('--error')){
            clearTimeout(alertTimeout)
        }
        else{
            alertEl.classList.add('--error')
            alertTimeout()
        }
    }

    // CHECK EMAIL FOR SIGNUP, LOGIN & LOST PW
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

    // CHECK PW FOR SIGNUP
    const checkPw = (e)=>{
        const password = e.target.value
        if(password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[!@#$%^&*?]/.test(password) && /[0-9]/.test(password)){
            setPassword(password)
        }
        else{
            setAlert('weak password. required length: 8 characters and at least 1 special character')
            showAlert()
        }
    }

    return <RecipeContext.Provider value={{
        recipes,
        alert,
        signedIn,
        currentUser,
        setRecipes,
        setPassword,
        setEmail,
        signUp,
        login,
        logOut,
        lostPassword,
        checkEmail,
        checkPw
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext