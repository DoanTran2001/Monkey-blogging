import useHover from 'hooks/useHover'
import React, { useState } from 'react'
import { createPortal } from 'react-dom';

function Tooltip({children, text, className}) {
  const { hover, nodeRef } = useHover();
  // console.log(hover, nodeRef);
  const [coords, setCoords] = useState({})
  // console.log(coords);
  const handleHover = (e) => {
    setCoords(e.target.getBoundingClientRect());
  }
  return (
    <div  className='mx-auto max-w-xs rounded-xl'>
      <p ref={nodeRef} onMouseEnter={handleHover} className={className} >{text}</p>
      {hover && <TooltipContent coords={coords}>{children}</TooltipContent>}
    </div>
  )
}

function TooltipContent({children, coords}) {
  return createPortal((
    <div className='p-2 max-w-[300px] bg-slate-50 inline-block rounded-lg font-normal text-black absolute -translate-x-2/4 -translate-y-full border-2 border-green-500 z-10 text-sm' style={{
      top: coords.top - coords.height + window.scrollY,
      left: coords.left + coords.width / 2
    }}>
      <div className='absolute w-2 h-2 bg-white border-2 border-green-500 z-0 top-full left-2/4 -translate-y-1/2 rotate-45'></div>
      {children}
    </div>
  ), document.querySelector('body'));
}

export default Tooltip
