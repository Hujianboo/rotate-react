import { useEffect, useRef } from "react"
type useRotateType = <T extends HTMLElement>() => {
  target: React.RefObject<T>
}
const useRotate: useRotateType = <T extends HTMLElement>() => {
  const rotateCenter = useRef([0,0])
  const target = useRef<T>(null)
  const mouseDown = () => {

  }
  const mouseMove = () => {

  }
  const mouseUp = () => {

  }
  useEffect(() => {
    const dom = target.current
  },[])
  return {
    target
  }
  
}
export default useRotate