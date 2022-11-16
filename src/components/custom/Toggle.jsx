import React from 'react'
import PropTypes from 'prop-types'

// custom toggle

function Toggle({on, onClick, ...rest}) {
  return (
    <label>
      <input type="checkbox" checked={on} className="hidden-input" onChange={() => {}} onClick={onClick} />
      <div className={`inline-block w-[100px] h-[40px] relative cursor-pointer rounded-full p-1 transition-all ${on ? 'bg-green-500' : "bg-gray-300"}`} {...rest}>
        <span className={`transition-all w-8 h-8 bg-white rounded-full inline-block ${on ? "translate-x-[60px]" : "" }`}></span>
      </div>
    </label>
  )
}

Toggle.propTypes = {
  on: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
}

export default Toggle
