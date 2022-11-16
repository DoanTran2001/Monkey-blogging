import React from 'react'
import { useController } from 'react-hook-form'

// Custom checkbox

function Checkbox({ checked, children, control, name, ...rest}) {
  const { field } = useController({
    control,
    name,
    defaultValue: ""
  })
  
  return (
    <label>
      <input type="checkbox" onChange={() => {}} checked={checked} className="hidden-input" {...field} {...rest} />
      <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        <div className={`w-7 h-7 rounded flex items-center justify-center ${checked ? "bg-green-400 text-white" : "bg-gray-200 text-transparent"}`}>
          
        </div>
        <span>{children}</span>
      </div>
    </label>
  )
}

export default Checkbox
