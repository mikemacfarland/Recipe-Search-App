
function SearchFilterList({filter}) {
  return (<div>
            {filter.map(filter=>{
                return(
                    <li key={filter}>
                        <label htmlFor={filter}>{filter}</label>
                        <input id={filter} type="checkbox" />
                    </li>
                )
            })}
        </div>
  )
}

export default SearchFilterList