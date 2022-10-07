import { createContext,useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {
    getAuth,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut,
    deleteUser,
    onAuthStateChanged
} from 'firebase/auth'

    // import auth from firebase config file where auth is defined and
    // exported
    import {auth} from '../firebase_config'


const RecipeContext = createContext()

export const RecipeProvider = ({children}) =>{
    const randomOffset = Math.floor((Math.random() * 2000))
    //@TODO STORE THIS API KEY ELSEWHWERE
    const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?number=2&offset=${randomOffset}&apiKey=033797df84694890b040b816a119b147`
    const navigate = useNavigate()
    const [url,setUrl] = useState(searchUrl)
    const [alert,setAlert] = useState('')
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [signedIn,setSignedIn] = useState(false)
    const auth = getAuth()
    const alertEl = document.querySelector('.alert')
    
    
    

    //SIGNUP & LOGIN
    const signUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            login(auth,email,password)
            handleUpdate(userName)
          })
          // Handle Additional errors
          .catch((error) => {
            const errorCode = error.code;
            errorCode === 'auth/email-already-in-use' ? setAlert('User already exists') : setAlert('')
            
            showAlert()
          });
    }

    //LOGIN
    const login = async ()=>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setSignedIn(true)
                navigate('/')
            })
            // Handle Additional Errors
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                errorCode === 'auth/user-not-found' ? setAlert('User not found/invalid Email') :
                errorCode === 'auth/internal-error' ? setAlert('Invalid email/password') :
                errorCode === 'auth/wrong-password' ? setAlert('Invalid Password') : setAlert('')
                (errorCode)
                (errorMessage)
                showAlert('error')
            });
    }

    //UPDATE PROFILE
    const handleUpdate = (name)=>{
        updateProfile(auth.currentUser, {
                displayName: name
            }).then(() => {
                //run code after values have been set
            }).catch((error) => {
                // An error occurred
                // ...
        });
    }

    //ON UPDATE
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // const uid = user.uid;
            setSignedIn(true)
            // ...
        } else {
            // User is signed out
            // ...
        }
        });
    })

    //DELETE USER
    //@TODO GET DELETE USER WORKING
    const handleDeleteUser = (user)=>{
        deleteUser(user).then(() => {
            // setSignedIn(false)
            // User deleted.
            ('userDELETE')
        }).catch((error) => {
            console.log(error)
            // An error ocurred
            // ...
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
            showAlert('message')
        })
        .catch((error) => {
            const errorCode = error.code;
            errorCode === 'auth/invalid-email' ? setAlert('Invalid email') :
            errorCode === 'auth/user-not-found' ? setAlert('User not found') : 
            errorCode === 'auth/too-many-requests' ? setAlert('Too many requests, Try again later') : setAlert('')
            showAlert('error')
        });
    }

    // RECIPES
    const [recipes,setRecipes] = useState([])

    async function getRecipes(url){
        const response = await fetch(url)
        const data = await response.json()
        setRecipes(data.results)
    }

    //@TODO fix this useeffect
    useEffect(()=>{
        getRecipes(url)
    },[])

    //HELPER FUNCTIONS

    //@TODO set this funciton to pass error or message. to display properly for messages
    const showAlert =(type)=> {
        const alertTimeout = () => setTimeout(() => {
            alertEl.classList.remove(`--${type}`);
        }, 4000);
        if (alertEl.classList.contains(`--${type}`)) {
            clearTimeout(alertTimeout);
        }
        else {
            alertEl.classList.add(`--${type}`);
            alertTimeout();
        }
    }

    // CHECK EMAIL FOR SIGNUP, LOGIN & LOST PW
    const checkEmail = ()=>{
        if(email.length > 5 && email.includes('@') && email.includes('.')){
          return true
        }
        else{
          return false
        }    
    }

    // CHECK PW FOR SIGNUP
    const checkPw = ()=>{
        if(password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[!@#$%^&*?]/.test(password) && /[0-9]/.test(password)){
            return true
        }
        else{
            return false
        }
    }

    //@TODO refactor, if one of these functions and setters is only used in one component
    return <RecipeContext.Provider value={{
        recipes,
        alert,
        signedIn,
        userName,
        url,
        //setters
        setUrl,
        setUserName,
        setAlert,
        setRecipes,
        setPassword,
        setEmail,
        //functions
        handleDeleteUser,
        handleUpdate,
        showAlert,
        signUp,
        login,
        logOut,
        lostPassword,
        checkEmail,
        checkPw,
        getRecipes
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext