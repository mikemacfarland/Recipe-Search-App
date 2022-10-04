import { createContext,useState,useEffect} from "react";

import {getAuth,createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,onAuthStateChanged} 
    from 'firebase/auth'

    //import auth from firebase config file where auth is defined and
    // exported
    import {auth} from '../firebase_config'


const RecipeContext = createContext()
const url = 'https://api.spoonacular.com/recipes/random?number=2&apiKey=033797df84694890b040b816a119b147'
// const url = 'https://randomuser.me/api/?results=2'

export const RecipeProvider = ({children}) =>{


    // USERS

    //@TODO maybe use email for all 3 forms?
    const [email,setEmail] = useState('')
    //@TODO maybe use password for both forms?
    const [password,setPassword] = useState('')
    const auth = getAuth();

    const signUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }

    const login = async ()=>{
        // signInWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         // Signed in 
        //         const user = userCredential.user;
        //         // ...
        //     })
        //     .catch((error) => {
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //     });
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

    //return provider with children
    // this is a functional component with children passed into it
    return <RecipeContext.Provider value={{
        recipes,
        setRecipes,
        setPassword,
        setEmail,
        signUp,
        login,
        lostPassword
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext