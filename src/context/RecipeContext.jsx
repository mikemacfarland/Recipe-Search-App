import { createContext,useState,useEffect} from "react";
// import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'


const RecipeContext = createContext()
const url = 'https://api.spoonacular.com/recipes/random?number=2&apiKey=033797df84694890b040b816a119b147'
// const url = 'https://randomuser.me/api/?results=2'

export const RecipeProvider = ({children}) =>{

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
        setRecipes
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext