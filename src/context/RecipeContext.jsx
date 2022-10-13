import { createContext,useState,useEffect,useLayoutEffect} from "react";
import { useNavigate } from "react-router-dom";

// FIREBASE AUTH
import {
    getAuth,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    reauthenticateWithCredential,
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
    const [offset,setOffset] = useState(randomNum)
    const [searchTerm,setSearchTerm] = useState('')
    const [recipeType,setRecipeType] = useState('')
    const [diet,setDiet] = useState('')
    const [cuisine,setCuisine] = useState('')
    const [intolorances,setIntolorances] = useState('')
    const [noOfResults,setNoOfResults] = useState(8)
    const [currentRecipe,setCurrentRecipe] = useState('')
    const [url,setUrl] = useState(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=${noOfResults}&offset=${offset}&cuisine=${cuisine}&diet=${diet}&intolorances=${intolorances}&type=${recipeType}&apiKey=033797df84694890b040b816a119b147`)

    // WRITE DATA
    //@TODO useeffect when user data state is changed, call this to update database
    const writeUserData = (userId,favorites)=>{
        const db = getDatabase()
        set(ref(db, 'users/' + userId), {
            favorites: favorites
        });
    }

    const getUserData = (user)=>{
            const db = getDatabase();
            const favoritesRef = ref(db, 'users/' + user.uid);
            onValue(favoritesRef, (snapshot) => {
            const data = snapshot.val();
            //snapshot.val returns data from database attatched to user.
            //data.favorites = favorites array that was set from writeUserData()
            !data === null ? setUserFavorites(data.favorites) : setUserFavorites('');
        });
    }

    const handleWriteUserData = ()=>{
            writeUserData(currentUser.uid,userFavorites)
    }

    const handleGetUserData = ()=>{
            getUserData(currentUser)
    }

    // getuserData on currentuser change
    useEffect(()=>{
        //could use void() here
        signedIn && currentUser && handleGetUserData()
    },[currentUser])

    // writeuserdata on userfavorites change if user is signed in
    useEffect(()=>{
        //could use void() here
        signedIn && currentUser && handleWriteUserData()  
    },[userFavorites])

    //RECIPES

    //ON LOAD
    //@TODO fix exhaustive dependencies
    //@TODO refactor callbacks
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

    //REAUTHENTICATE USER
    const handleReauthenicate = ()=>{
        const user = auth.currentUser;
        // why this isnt documented in firebase docs is a mystery
        const credential = signInWithEmailAndPassword(auth, email, password)
        reauthenticateWithCredential(user,credential).then(() => {
            console.log('reauthenticated')
        // User re-authenticated.
        }).catch((error) => {
            console.log(error.message)
            console.log('reauthenticate error')
            // console.log(error.code)
        });
    }

    //DELETE USER
    const handleDeleteUser = (user)=>{
        handleReauthenicate(email,password)
        deleteUser(user).then(() => {
            setAlert('User Deleted')
            showAlert('message')
            logOut()
            navigate('/')
            console.log('userdeleted')
            ('userDELETE')
            // User deleted.
        }).catch((error) => {
            console.log('userdeleted error')
            // console.log(error)
            // console.log(error.code)
            // console.log(error.message)
        });
    }

    //LOGOUT
    const logOut = ()=>{
        signOut(auth).then(() => {
            setSignedIn(false)
            setCurrentUser('')
            setUserFavorites('')
            setPassword('')
            setEmail('')
            navigate('/')
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
        noOfResults,
        currentUser,
        userFavorites,
        currentRecipe,
        //setters
        setCurrentRecipe,
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
        handleReauthenicate,
        handleWriteUserData,
        handleSetUrl,
        getUserData,
        getRecipes,
        handleDeleteUser,
        handleUpdate,
        signUp,
        login,
        logOut,
        lostPassword,
        //helper functions
        showAlert,
        checkEmail,
        checkPw,
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext