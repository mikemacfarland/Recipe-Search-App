
function SearchFilterList({title,filter,setType}) {
    
    
    //@TODO add search functionality for api endpoints based on selections within this function, use a state to manage this
    //@TODO refactor for loop in this function

    const checkCheck = (e)=>{
        const labels = document.querySelectorAll('label')
        let forLabel = ''
        for(let i = 0; i < labels.length; i++){
            if(labels[i].htmlFor === e.target.id)
            labels[i].classList.toggle('--checked')
        }
        const inputs = e.target.parentNode.parentNode.querySelectorAll('.--checked')
        const inputTypes = []
        inputs.forEach(input=>{
            inputTypes.push(input.innerText)
        })
        setType(inputTypes)
    }

    //@TODO refactor for loop in this function
    const openList = (e)=>{
        const filterLists = document.querySelectorAll('.search__filters__item__list')
        for(let i = 0; i < filterLists.length; i++){
            if(!e.target.nextSibling.classList.contains('--active') && filterLists[i].previousSibling === e.target){
                filterLists[i].classList.add('--active')
            }
            else{
                filterLists[i].classList.remove('--active')
            }
        }
    }

    //@TODO UI if selections are made, indicate in the parent element to user
  return (<div className="search__filters__item">
            <h4 onClick={(e)=>openList(e)}>{title}</h4>
            <ul className="search__filters__item__list">
            {filter.map(filter=>{
                return(
                    <li className='search__filters__item__list__li'  key={filter}>
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