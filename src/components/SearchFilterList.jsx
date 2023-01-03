import { useState,useContext } from "react"
import RecipeContext from "../context/RecipeContext"

function SearchFilterList({title,filter,type}) {

    const [active,setActive] = useState(false)
    const [selected,setSelected] = useState(false)

    const {urlEndpoints,setUrlEndpoints} = useContext(RecipeContext)
    
    const handleSetUrlEndpoints = (arr)=>{setUrlEndpoints({...urlEndpoints,[type]:arr,offset:0})}

    const checkCheck = (e)=>{
        const labels = document.querySelectorAll('label')
        for(let i = 0; i < labels.length; i++){
            if(labels[i].htmlFor === e.target.id)
            labels[i].classList.toggle('--checked')
        }
        const inputs = e.target.parentNode.parentNode.querySelectorAll('.--checked')
        inputs.length > 0 ? setSelected(true) : setSelected(false)
        const inputTypes = []
        inputs.forEach(input=>{
            inputTypes.push(input.innerText)
        })
        handleSetUrlEndpoints(inputTypes)
    }

    window.addEventListener('click',(e)=>{
        const lists = document.querySelectorAll('.--active')
        lists.forEach(list=>{
            if(!list.contains(e.target) && e.target !== list.previousSibling) setActive(false)
        })
    })
    
    //@TODO UI if selections are made, indicate in the parent element to user
  return (
    <div className="search__filters__item">
        <h4 onClick={(()=>setActive(active ? false : true))} 
        className={`${selected ? '--selected' : ''}`} 
        >{title}</h4>
        {/* if this ul contains an element that is selected : turn the h4 a different color */}
        <ul className={`search__filters__item__list ${active ? '--active' : ''}`}>
            {filter.map(filter=>{
                return(
                    <li className='search__filters__item__list__li' key={filter}>
                        <label htmlFor={filter}>{filter}</label>
                        <input onChange={(e)=>checkCheck(e)} id={filter} type="checkbox" />
                    </li>
                )
            })}
        </ul>
    </div>
  )
}

export default SearchFilterList