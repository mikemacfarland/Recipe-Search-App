import { createContext,useState,useEffect,useLayoutEffect} from "react";
import { useNavigate } from "react-router-dom";

// FIREBASE AUTH
import {
    getAuth,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile,
    signOut,
    deleteUser,
    onAuthStateChanged
} from 'firebase/auth'
import {auth} from '../firebase_config'

// FIREBASE DATABASE
import { 
    getDatabase,
    ref,
    set,
    onValue
} from "firebase/database";
import {database} from '../firebase_config'


// CONTEXT
const RecipeContext = createContext()
export const RecipeProvider = ({children}) =>{
    
    //@TODO STORE API KEY ELSEWHWERE
    const navigate = useNavigate()
    // USER STATES
    
    
    const [alert,setAlert] = useState('')
    const [userName,setUserName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [signedIn,setSignedIn] = useState(false)
    const [recipes,setRecipes] = useState([])
    const auth = getAuth()
    const alertEl = document.querySelector('.alert')

    // USER STORAGE
    const [currentUser,setCurrentUser] = useState('')
    const [userFavorites,setUserFavorites] = useState('')

    // URL/RECIPE STATES

    // RANDOM NUM
    const randomNum = ()=>{return Math.floor((Math.random() * 2000))}
    const [offset,setOffset] = useState(randomNum())
    const [searchTerm,setSearchTerm] = useState('')
    const [recipeType,setRecipeType] = useState('')
    const [diet,setDiet] = useState('')
    const [cuisine,setCuisine] = useState('')
    const [intolorances,setIntolorances] = useState('')
    const [noOfResults,setNoOfResults] = useState(2)
    const [url,setUrl] = useState(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=${noOfResults}&offset=${offset}&cuisine=${cuisine}&diet=${diet}&intolorances=${intolorances}&type=${recipeType}&apiKey=033797df84694890b040b816a119b147`)

    // WRITE DATA
    //@TODO useeffect when user data state is changed, call this to update database
    const writeUserData = (userId,favorites)=>{
        const db = getDatabase()
        set(ref(db, 'users/' + userId), {
            favorites: favorites
        });
    }

    const handleWriteUserData = ()=>{
        writeUserData(currentUser.uid,userFavorites)
    }

    const getUserData = (user)=>{
            const db = getDatabase();
            const favoritesRef = ref(db, 'users/' + user.uid);
            onValue(favoritesRef, (snapshot) => {
            const data = snapshot.val();
            //snapshot.val returns data from database attatched to user.
            //data.favorites = favorites array that was set from writeUserData()
            setUserFavorites(data.favorites);
        });
    }

    const handleGetUserData = ()=>{
        getUserData(currentUser)
    }

    //RECIPES

    //ON LOAD
    //@TODO fix exhaustive dependencies
    //@TODO refactor these callbacks
    //on page load api call for recipes
    useEffect(()=>{
        handleGetRecipes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
     
    //this is for search and offset
    useEffect(()=>{
        handleSetUrl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[offset])

    //recipes api call on url update (search and offset update)
    useEffect(()=>{
        handleGetRecipes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[url])

    //retrieve users favorites
    useEffect(()=>{
        handleGetUserData()
        console.log('getcurentuserdata')
    },[currentUser])

    // useEffect(()=>{
    //     handleWriteUserData()
    // },[userFavorites])

    //setUrl callback
    const handleSetUrl=()=>{
        setUrl(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=${noOfResults}&offset=${offset}&cuisine=${cuisine}&diet=${diet}&intolorances=${intolorances}&type=${recipeType}&apiKey=033797df84694890b040b816a119b147`)    
    }
    
    // getRecipes callback
    const handleGetRecipes = ()=>{
        getRecipes(url)
    }

    async function getRecipes(url){
        const response = await fetch(url)
        const data = await response.json()
        setRecipes(data.results)
    }



    //SIGNUP & LOGIN
    const signUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            login(auth,email,password)
            handleUpdate(userName)
            setCurrentUser(user)
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
                setCurrentUser(user)
                getUserData(user.uid)
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
            setCurrentUser(user)
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
    //reauthenticate?
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
            setCurrentUser('')
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

    //HELPER FUNCTIONS
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
        offset,
        currentUser,
        userFavorites,
        //setters
        setSearchTerm,
        setRecipeType,
        setDiet,
        setCuisine,
        setIntolorances,
        setOffset,
        setUserName,
        setAlert,
        setRecipes,
        setPassword,
        setEmail,
        setUserFavorites,
        //callback functions
        handleWriteUserData,
        handleSetUrl,
        getUserData,
        getRecipes,
        handleDeleteUser,
        handleUpdate,
        login,
        logOut,
        lostPassword,
        //helper functions
        showAlert,
        signUp,
        checkEmail,
        checkPw,
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext