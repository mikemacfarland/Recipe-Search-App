// @TODO REFACTOR CONTEXT
import { createContext,useState,useEffect,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import { getData } from "../services/index.js"
import { randomNum } from "../utilities/helpers.js";
import { getUserData } from "../utilities/database.js";

// FIREBASE AUTH
import {
    getAuth,
    sendPasswordResetEmail,
    reauthenticateWithCredential,
    signOut,
    deleteUser,
    EmailAuthProvider,
    onAuthStateChanged
} from 'firebase/auth'

// APP CONTEXT
const RecipeContext = createContext()
    export const RecipeProvider = ({children}) =>{
    const navigate = useNavigate()

    // USER STATES
    const [alert,setAlert] = useState({type:'',value:'',show:false})
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [signedIn,setSignedIn] = useState(false)
    const [recipes,setRecipes] = useState([])
    const auth = getAuth()
    // const alertEl = document.querySelector('.alert')

    // USER STORAGE
    const [currentUser,setCurrentUser] = useState('')
    const [userFavorites,setUserFavorites] = useState(null)

    // URL AND CURRENT RECIPE STATES
    const [urlEndpoints,setUrlEndpoints] = useState({
        searchTerm: '',
        noOfResults: 8,
        offset: randomNum(),
        cuisine: '',
        diet: '',
        intolorances: '',
        recipeType: '',
    })
    const [currentRecipe,setCurrentRecipe] = useState('')

    // GET RECIPES
    const getRecipes = useCallback(()=>{
        getData(setRecipes,'recipes/complexSearch',urlEndpoints)
    },[urlEndpoints])

    // USEEFFECTS
    useEffect(()=>{
        getRecipes()
    },[getRecipes])

    // ON USER AUTH UPDATE/SIGNOUT/SIGNIN
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            // const uid = user.uid;
            setCurrentUser(user)
            setSignedIn(true)
            // ...
        } else {
            // User is signed out
            // ...
        }
        });
    })

    // REAUTHENTICATE USER FOR RE-AUTH REQUIRED ACTIONS
    const handleReauthenicate = ()=>{
        const user = auth.currentUser;
        // why this isnt documented in firebase docs is a mystery
        // const credential = signInWithEmailAndPassword(auth, email, password)
        const credential = EmailAuthProvider.credential(email,password)
        reauthenticateWithCredential(user,credential).then(() => {
        // User re-authenticated.
        }).catch((error) => {
            const errorCode = error.code
            errorCode === 'auth/invalid-email' ? setAlert({type:'--error',value:'Invalid-Email'}) :
            errorCode === 'auth/wrong-password' ? setAlert({type:'--error',value:'Wrong Password'}) :
            errorCode === 'auth/user-mismatch' ? setAlert({type:'--error',value:'Invalid Email'}) : 
            errorCode === 'auth/internal-error' ? setAlert({type:'--error',value:'Invalid Email or Password'}) :
            setAlert('--error','Unknown Error',setAlert)
        });
    }

    // DELETE USER - REQUIRES REAUTHENTICATION
    const handleDeleteUser = (user)=>{
        handleReauthenicate()
        deleteUser(user).then(() => {
            setAlert({type:'--message',value:'User Deleted'})
            // logOut()
            navigate('/')
            console.log('userdeleted')
            ('userDELETE')
            // User deleted.
        }).catch((error) => {
            console.log('userdeleted error')
            console.log(error)
            console.log(error.code)
        });
    }

    // LOGOUT
    const logOut = ()=>{
        signOut(auth).then(() => {
            setSignedIn(false)
            setCurrentUser('')
            setUserFavorites('')
            setPassword('')
            setEmail('')
            navigate('/')
            
            setAlert({type:'--message',value:'User Logged Out'})
        }).catch((error) => {
        });
    }

    // LOST PW EMAIL REQUEST
    const lostPassword = async ()=>{
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setAlert({type:'--message',value:`email sent to ${email}`})
        })
        .catch((error) => {
            const errorCode = error.code;
            errorCode === 'auth/invalid-email' ? setAlert({type:'--error',value:'Invalid email'}) :
            errorCode === 'auth/user-not-found' ? setAlert({type:'--error',value:'User not found'}) : 
            errorCode === 'auth/too-many-requests' ? setAlert({type:'--error',value:'Too many requests, Try again later'}) : setAlert({type:'',value:''})
        });
    }

    return <RecipeContext.Provider value={{
        auth,
        recipes,
        alert,
        signedIn,
        userName,
        urlEndpoints,
        currentUser,
        userFavorites,
        currentRecipe,
        email,
        password,
        // SETTERS
        setCurrentRecipe,
        setUserName,
        setAlert,
        setRecipes,
        setPassword,
        setEmail,
        setSignedIn,
        setUrlEndpoints,
        setUserFavorites,
        setCurrentUser,
        // CALLBACKS
        handleReauthenicate,
        getRecipes,
        handleDeleteUser,
        logOut,
        lostPassword,
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext