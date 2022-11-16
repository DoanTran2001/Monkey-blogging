import { useEffect, useRef, useState } from 'react'

function useHover() {
  const [hover, setHover] = useState(false);
  const nodeRef = useRef(null);
  const handleMouseOver = () => {
    setHover(true);
  }
  const handleMouseOut = () => {
    setHover(false);
  }
  useEffect(() => {
    if(nodeRef.current) {
      nodeRef.current.addEventListener("mouseover", handleMouseOver);
      nodeRef.current.addEventListener("mouseout", handleMouseOut);
    }
    return () => {
      nodeRef.current.removeEventListener("mouseover", handleMouseOver);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      nodeRef.current.removeEventListener("mouseout", handleMouseOut);
    }
  }, []);
  return {
    hover, setHover, nodeRef
  }
}

export default useHover;