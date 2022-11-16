import React from 'react'
import { useDropdown } from './dropdown-context'

function Search({ placeholder, ...props}) {

  const { onChange } = useDropdown();
  
  return (
    <div>
      <div className="p-2">
        <input type="text" placeholder={placeholder} className="p-4 outline-none border border-gray-200 rounded" onChange={onChange} {...props} />
      </div>
    </div>
  )
}

export default Search;

