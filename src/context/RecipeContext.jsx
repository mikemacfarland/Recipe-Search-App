//@TODO REFACTOR CONTEXT
import { createContext,useState,useEffect,useCallback} from "react";
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
    EmailAuthProvider,
    onAuthStateChanged
} from 'firebase/auth'

// FIREBASE DATABASE
import { 
    getDatabase,
    ref,
    set,
    onValue
} from "firebase/database"

// APP CONTEXT
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
    const [userFavorites,setUserFavorites] = useState(null)

    // URL/RECIPE STATES

    // RANDOM NUM
    const randomNum = ()=>{return Math.floor((Math.random() * 900))}
    // can put noOfResults in state in future when feature is added to change # of results in search
    const noOfResults = 8
    const [offset,setOffset] = useState(randomNum)
    const [searchTerm,setSearchTerm] = useState('')
    const [recipeType,setRecipeType] = useState('')
    const [diet,setDiet] = useState('')
    const [cuisine,setCuisine] = useState('')
    const [intolorances,setIntolorances] = useState('')
    const [currentRecipe,setCurrentRecipe] = useState('')
    const [url,setUrl] = useState(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=${noOfResults}&offset=${offset}&cuisine=${cuisine}&diet=${diet}&intolorances=${intolorances}&type=${recipeType}&apiKey=033797df84694890b040b816a119b147`)

    const log = (string)=>{
        console.log(string)
    }

    const writeUserData = (userId,favorites)=>{
        const db = getDatabase()
        set(ref(db, 'users/' + userId), {
            favorites: favorites
        });
    }

    const getUserData = (user)=>{
            log('get user data')
            const db = getDatabase();
            const favoritesRef = ref(db, 'users/' + user.uid);
            onValue(favoritesRef, (snapshot) => {
            const data = snapshot.val();
            data ? setUserFavorites(data.favorites) : setUserFavorites(null)
        })
    }

    // on refresh, data does not show up on favorites page
    const handleWriteUserData = useCallback(()=>{
        console.log('write user data')
        if(currentUser && signedIn) writeUserData(currentUser.uid,userFavorites)
        // getUserData(currentUser)
    },[userFavorites,signedIn,currentUser])

    const handleGetUserData = ()=>{
        getUserData(currentUser)
    }
    

    useEffect(()=>{
        handleWriteUserData()
    },[userFavorites,handleWriteUserData])
    //RECIPES
    //@TODO fix exhaustive dependencies
    //@TODO refactor callbacks
    //ON LOAD
    useEffect(()=>{
        handleGetRecipes()
        // console.log('getrecipes on load')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
     
    //this is for search and offset
    useEffect(()=>{
        handleSetUrl()
        // console.log('set url from offset')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[offset])

    //recipes api call on url update (search and offset update)
    useEffect(()=>{
        handleGetRecipes()
        // console.log('getrecipes on url change')
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[url])

    //setUrl callback
    const handleSetUrl=()=>{
        setUrl(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=${noOfResults}&offset=${offset}&cuisine=${cuisine}&diet=${diet}&intolorances=${intolorances}&type=${recipeType}&apiKey=033797df84694890b040b816a119b147`)    
    }
    
    // getRecipes callback
    const handleGetRecipes = ()=>{
        // console.log('fetch from ',url)
        getRecipes(url)
    }

    async function getRecipes(url){
        const response = await fetch(url)
        const data = await response.json()
        // console.log(data.results)
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
            errorCode === 'auth/email-already-in-use' ? showAlert('error','User already exists') : setAlert('')
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
                setEmail('')
                setPassword('')
                // console.log(user)
                getUserData(user)
            })
            // Handle Additional Errors
            .catch((error) => {
                const errorCode = error.code;
                errorCode === 'auth/user-not-found' ? showAlert('error','User not found/invalid Email') :
                errorCode === 'auth/internal-error' ? showAlert('error','Invalid email/password') :
                errorCode === 'auth/wrong-password' ? showAlert('error','Invalid Password') : setAlert('')
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
        // const credential = signInWithEmailAndPassword(auth, email, password)
        const credential = EmailAuthProvider.credential(email,password)
        reauthenticateWithCredential(user,credential).then(() => {
        // User re-authenticated.
        }).catch((error) => {
            const errorCode = error.code
            errorCode === 'auth/invalid-email' ? showAlert('error','Invalid-Email') :
            errorCode === 'auth/wrong-password' ? showAlert('error','Wrong Password') :
            errorCode === 'auth/user-mismatch' ? showAlert('error','Invalid Email') : 
            errorCode === 'auth/internal-error' ? showAlert('error','Invalid Email or Password') :
            showAlert('error','Unknown Error')
        });
    }

    // DELETE USER
    const handleDeleteUser = (user)=>{
        handleReauthenicate()
        deleteUser(user).then(() => {
            showAlert('message','User Deleted')
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

    //LOGOUT
    const logOut = ()=>{
        signOut(auth).then(() => {
            setSignedIn(false)
            setCurrentUser('')
            setUserFavorites('')
            setPassword('')
            setEmail('')
            navigate('/')
            
            showAlert('message','User Logged Out')
        }).catch((error) => {
        });
    }

    //LOST PW
    const lostPassword = async ()=>{
        sendPasswordResetEmail(auth, email)
        .then(() => {
            showAlert('message',`email sent to ${email}`)
        })
        .catch((error) => {
            const errorCode = error.code;
            errorCode === 'auth/invalid-email' ? showAlert('error','Invalid email') :
            errorCode === 'auth/user-not-found' ? showAlert('error','User not found') : 
            errorCode === 'auth/too-many-requests' ? showAlert('error','Too many requests, Try again later') : setAlert('')
        });
    }

    //HELPER FUNCTIONS
    const showAlert =(type,alert)=> {
        setAlert(alert)
        const alertTimeout = () => setTimeout(() => {
            alertEl.classList.remove(`--${type}`);
            setAlert('')
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
        handleGetUserData,
        handleSetUrl,
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