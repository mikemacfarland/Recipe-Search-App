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
    // MAY NEED ONAUTHSTATECHANGED IN FUTURE FOR USER  MANAGEMENT
} from 'firebase/auth'

    // import auth from firebase config file where auth is defined and
    // exported
    import {auth} from '../firebase_config'


const RecipeContext = createContext()
const url = 'https://api.spoonacular.com/recipes/random?number=2&apiKey=033797df84694890b040b816a119b147'
// const url = 'https://randomuser.me/api/?results=2'

export const RecipeProvider = ({children}) =>{
    
    const navigate = useNavigate()
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
            console.log(user)
            login(auth,email,password)
            handleUpdate(userName)
          })
          // Handle Additional errors
          .catch((error) => {
            const errorCode = error.code;
            console.log(errorCode)
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
                console.log(errorCode)
                console.log(errorMessage)
                showAlert('error')
            });
    }

    //UPDATE PROFILE
    const handleUpdate = (name)=>{
        updateProfile(auth.currentUser, {
                displayName: name
                // this area for setting values only
                // , photoURL: "https://example.com/jane-q-user/profile.jpg"
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
    const handleDeleteUser = (user)=>{
        deleteUser(user).then(() => {
        // User deleted.
        }).catch((error) => {
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
            //@TODO modify this message
            console.log(errorCode)
            errorCode === 'auth/invalid-email' ? setAlert('Invalid email') :
            errorCode === 'auth/user-not-found' ? setAlert('User not found') : 
            errorCode === 'auth/too-many-requests' ? setAlert('Too many requests, Try again later') : setAlert('')
            showAlert('error')
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
        //setters
        setUserName,
        setAlert,
        setRecipes,
        setPassword,
        setEmail,
        //functions
        handleUpdate,
        showAlert,
        signUp,
        login,
        logOut,
        lostPassword,
        checkEmail,
        checkPw,
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext