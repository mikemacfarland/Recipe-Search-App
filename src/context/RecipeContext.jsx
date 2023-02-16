// @TODO REFACTOR CONTEXT
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

    // RANDOM NUM FOR INIT OFFSET
    const randomNum = ()=>{return Math.floor((Math.random() * 900))}

    // URL STATES
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
    const [url,setUrl] = useState('')

    // HANDLE SET URL CALLBACK W/URL CONSTRUCTOR
    const handleSetUrl = useCallback(()=>{
        // creating new url object
        const url = new URL('https://api.spoonacular.com/recipes/complexSearch')
        // setting a single query
        url.searchParams.append('apiKey','033797df84694890b040b816a119b147')
        // array of queries
        const urlQueries = [
            {name:'query',value:urlEndpoints.searchTerm},
            {name:'number',value:urlEndpoints.noOfResults},
            {name:'offset',value:urlEndpoints.offset},
            {name:'cuisine',value:urlEndpoints.cuisine},
            {name:'diet',value:urlEndpoints.diet},
            {name:'intolerances',value:urlEndpoints.intolorances},
            {name:'type',value:urlEndpoints.recipeType},
        ]
        // loop over queries and set each one if they are changed - (urlEndpoints in dependency array)
        urlQueries.forEach((query)=>url.searchParams.append(query.name,query.value))
        setUrl(url)
    },[urlEndpoints])

    // GET RECIPES
    const getRecipes = useCallback( async ()=>{
         await (fetch(url))
        .then((res) => {
            if(res.ok){
                return res.json()
            }
            // this calls catch in the event that there is a bad response
            return Promise.reject(res)
            })
        .then((data)=>{ 
            
            return setRecipes(data.results)
        })
        
        .catch(err => console.log('Failed to fetch',err))
    },[url])

    // GET USER DATA (FAVORITES)
    const getUserData = useCallback(()=>{
        const db = getDatabase();
        const favoritesRef = ref(db, 'users/' + currentUser.uid);
        onValue(favoritesRef, (snapshot) => {
        const data = snapshot.val();
        data ? setUserFavorites(data.favorites) : setUserFavorites(null)
        })
    },[currentUser.uid])

    // WRITE USER DATA (FAVORITES)
    const writeUserData = useCallback(()=>{
        const db = getDatabase();
        if (currentUser && signedIn && userFavorites !== null){
            set(ref(db, 'users/' + currentUser.uid), {
                favorites: userFavorites
            })
        }
    },[currentUser,signedIn,userFavorites])

    // USEEFFECT HOOKS
    useEffect(()=>{
        getRecipes()
    },[getRecipes])
    
    useEffect(()=>{
        handleSetUrl()
    },[urlEndpoints.offset,handleSetUrl])

    useEffect(()=>{
        getUserData()
    },[getUserData])
    
    useEffect(()=>{
        writeUserData()
    },[writeUserData,userFavorites])

    // SIGNUP
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

    // LOGIN
    const login = async ()=>{
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setSignedIn(true)
                navigate('/')
                setCurrentUser(user)
                setEmail('')
                setPassword('')
                getUserData()
            })
            // Handle Additional Errors
            .catch((error) => {
                const errorCode = error.code;
                errorCode === 'auth/user-not-found' ? showAlert('error','User not found/invalid Email') :
                errorCode === 'auth/internal-error' ? showAlert('error','Invalid email/password') :
                errorCode === 'auth/wrong-password' ? showAlert('error','Invalid Password') : setAlert('')
            });
    }

    // UPDATE USER PROFILE
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
            errorCode === 'auth/invalid-email' ? showAlert('error','Invalid-Email') :
            errorCode === 'auth/wrong-password' ? showAlert('error','Wrong Password') :
            errorCode === 'auth/user-mismatch' ? showAlert('error','Invalid Email') : 
            errorCode === 'auth/internal-error' ? showAlert('error','Invalid Email or Password') :
            showAlert('error','Unknown Error')
        });
    }

    // DELETE USER - REQUIRES REAUTHENTICATION
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

    // LOGOUT
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

    // LOST PW EMAIL REQUEST
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

    // HELPER FUNCTIONS
    // @TODO fix alerts not showing up, or showing up very briefly and dissapearing
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
        urlEndpoints,
        currentUser,
        userFavorites,
        currentRecipe,
        // SETTERS
        setCurrentRecipe,
        setUserName,
        setAlert,
        setRecipes,
        setPassword,
        setEmail,
        setUrl,
        setUrlEndpoints,
        setUserFavorites,
        // CALLBACKS
        handleSetUrl,
        handleReauthenicate,
        getUserData,
        getRecipes,
        handleDeleteUser,
        handleUpdate,
        signUp,
        login,
        logOut,
        lostPassword,
        // HELPER FUNCTIONS
        showAlert,
        checkEmail,
        checkPw,
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext