
function SearchFilterList({title,filter,setType}) {
    
    //@TODO refactor for loop in this function
    const checkCheck = (e)=>{
        const labels = document.querySelectorAll('label')
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

    const openList = (e)=>{
        const filterLists = document.querySelectorAll('.search__filters__item__list')
        for(let i = 0; i < filterLists.length; i++){
                window.addEventListener('click',(e)=>{
                    e.target === filterLists[i].previousSibling && filterLists[i].classList.contains('--active') ? filterLists[i].classList.remove('--active') :
                    e.target === filterLists[i].previousSibling || filterLists[i].contains(e.target) ? filterLists[i].classList.add('--active') :
                    filterLists[i].classList.remove('--active')
                })
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