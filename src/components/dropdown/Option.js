import React from 'react'
import { useDropdown } from './dropdown-context'

// Item trong dropdown 
function Option(props) {
  const { onClick } = props; // Lấy click từ props
  const { setShow } = useDropdown(); // Lấy show từ dropdown context
  const handleClick = () => {
    onClick && onClick(); // Nếu có click thì thực hiện function click đó
    setShow(false); // click xong rồi thì ẩn option đi
  }
  return (
    <div className='px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100' onClick={ handleClick }>
      {props.children}
    </div>
  )
}

export default Option;

