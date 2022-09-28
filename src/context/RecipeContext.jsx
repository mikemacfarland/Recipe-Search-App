import { createContext,useState } from "react";
import React from 'react'

const RecipeContext = createContext()

export const RecipeProvider = ({children}) =>{

    const [randomRecipes,setRandomRecipes] = useState(['recipe1'])

    //return provider with children
    // this is a functional component with children passed into it
    return <RecipeContext.Provider value={{
        randomRecipes,
        setRandomRecipes
        }}>
        {children}
    </RecipeContext.Provider>
}

export default RecipeContext