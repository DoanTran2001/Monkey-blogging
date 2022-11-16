import React from 'react'
import { useController } from 'react-hook-form'

// Custom radio 

function Radio({ checked, children, control, name, ...rest}) {
  const { field } = useController({
    control,
    name,
    defaultValue: ""
  })
  return (
    <label>
      <input type="radio"  checked={checked} className="hidden-input" {...field} {...rest} />
      <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        <div className={`w-7 h-7 rounded-full p-1 ${checked ? " border-2 border-green-500 bg-white" : "bg-gray-200"}`}>
          {checked && (<div className="w-full h-full bg-green-500 rounded-full"></div>)}
        </div>
        <span>{children}</span>
      </div>
    </label>
  )
}

export default Radio
