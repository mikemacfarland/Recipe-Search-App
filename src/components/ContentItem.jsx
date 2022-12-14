import { useEffect } from "react"
import { useContext,useState} from "react"
import { useNavigate } from "react-router-dom"
import { ReactComponent as Heart} from '../assets/icons/heart.svg'
import RecipeContext from "../context/RecipeContext"

function ContentItem({recipe}) {

    const navigate = useNavigate()
    const {userFavorites,setUserFavorites,signedIn,setCurrentRecipe,} = useContext(RecipeContext)

    const [liked,setLiked] = useState(false)

    const handleLike =()=>{

        const ids = userFavorites ? userFavorites.map(recipe=>{return recipe.id}) : []
        const favorites = userFavorites ? userFavorites.filter(item=>item.id !== recipe.id) : []

        if(userFavorites && ids.includes(recipe.id)){
            const favorites = userFavorites ? userFavorites.filter(item=>item.id !== recipe.id) : []
            setUserFavorites(favorites)
            setLiked(false)
        }
        else if(userFavorites && !userFavorites.includes(recipe)){
            favorites.push(recipe)
            setUserFavorites(favorites)
            setLiked(true)
        }
        else if(userFavorites === null || userFavorites.length === 0){
            favorites.push(recipe)
            setUserFavorites(favorites)
            setLiked(true)
        }
    }

    const checkLiked = ()=>{
        const ids = userFavorites ? userFavorites.map(recipe=>{return recipe.id}) : []
        ids.includes(recipe.id) ? setLiked(true) : setLiked(false)
    }

    useEffect(()=> checkLiked())

    const handleOpenRecipe = async(recipe)=>{
        //@TODO STORE API KEY ELSEWHERE
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipe}/information?apiKey=033797df84694890b040b816a119b147`)
        const data = await response.json()
        setCurrentRecipe(data)
        console.log(data)
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