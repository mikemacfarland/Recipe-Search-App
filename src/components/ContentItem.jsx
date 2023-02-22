import { useEffect } from "react"
import { useContext,useState} from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Heart} from '../assets/icons/heart.svg'
import RecipeContext from "../context/RecipeContext"
import { getData } from "../services/index.js"
import { writeUserData } from "../utilities/database"

function ContentItem({recipe}) {

    const navigate = useNavigate()
    const {userFavorites,setUserFavorites,signedIn,setCurrentRecipe,currentUser} = useContext(RecipeContext)

    const [liked,setLiked] = useState(false)

    const handleLike =()=>{
        let favorites = []
        if(userFavorites && userFavorites.length){
            if(userFavorites.includes(recipe)){
                favorites = userFavorites.filter((item)=> item !== recipe)
                setLiked(false)
            }
            else{
                favorites = userFavorites
                favorites.push(recipe)
                setLiked(true)
            }
        }
        else{
            favorites = [recipe]
            setLiked(true)
        }
        setUserFavorites(favorites)
        writeUserData(currentUser,signedIn,userFavorites)
    }

    const checkLiked = ()=>{
        userFavorites && userFavorites.includes(recipe) ? setLiked(true) : setLiked(false)
    }

    useEffect(()=> checkLiked())

    const handleOpenRecipe = (recipe)=>{
        // see utilities/index.js for this getData function
        getData(setCurrentRecipe,`recipes/${recipe}/information`,undefined)
        navigate('/recipe')
    }

  return (
    <div  className="home__content__item">
        <div className='home__content__item__banner'>
            <h3>{recipe.title}</h3>
            {signedIn ? 
            <div onClick={(()=>handleLike(recipe))}className='like'>
                 <Heart className={`'heart' ${liked ? '--liked' : ''}`}/>
            </div>
            :''}
        </div>
        <img onClick={((e)=>handleOpenRecipe(recipe.id))} src={recipe.image} alt="" />
    </div>
  )
}

export default ContentItem