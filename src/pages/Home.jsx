import Search from '../components/Search'
import Filter from '../components/Filter'

import React from 'react'

function Home() {
  return (
    <div className="content">
        <Search/>
        <Filter/>
        <div className="content">
        content
        </div>
    </div>
  )
}

export default Home

