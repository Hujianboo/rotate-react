import { useCallback, useEffect, useRef } from "react"
import { getAngle,degNormalize } from "./utils"

type useRotatePropType = {
  initAngle?:number
}
type useRotateType = <T extends HTMLElement>(props:useRotatePropType) => {
  target: React.RefObject<T>,
  handler: React.RefObject<T>
}
export const useRotate: useRotateType = <T extends HTMLElement,R extends HTMLElement>(props:useRotatePropType) => {
  const rotateCenter = useRef([0,0])
  const downPoint = useRef([0,0])
  const rotating = useRef(false)
  const currentDeg = useRef(props?.initAngle || 0)
  const target = useRef<T>(null) as any
  const handler = useRef<R>(null) as any
  const getDeg = useCallback(getAngle,[])
  const normalize = useCallback(degNormalize,[])
  const setTransform = useCallback((deg:number) => {
    target.current.style.transform = `rotate(${deg}deg)`
  },[])
  const handleMouseDown = useCallback((e:MouseEvent) => {
    rotating.current = true
    const dom = target.current
    if(dom){
      const {width,height,left,top} = dom.getBoundingClientRect()
      downPoint.current = [e.clientX,e.clientY]
      rotateCenter.current = [left + width/2,top + height/2]      
    }
  },[])
  const handleMouseMove = useCallback((e:MouseEvent) => {
    if(rotating.current){
      setTransform(normalize(currentDeg.current 
        + getDeg([downPoint.current[0] - rotateCenter.current[0],downPoint.current[1] - rotateCenter.current[1]]
          ,[e.clientX - rotateCenter.current[0] ,e.clientY - rotateCenter.current[1]])))           
    }
  },[getDeg, normalize, setTransform])
  const handleMouseStop = useCallback((e:MouseEvent) => {
    rotating.current = false
    currentDeg.current = (normalize(currentDeg.current 
      + getDeg([downPoint.current[0] - rotateCenter.current[0],downPoint.current[1] - rotateCenter.current[1]]
        ,[e.clientX - rotateCenter.current[0] ,e.clientY - rotateCenter.current[1]])))
  },[getDeg, normalize])
  useEffect(() => {
    const dom = handler.current
    if(dom){
      dom.addEventListener('mousedown',handleMouseDown)
      document.addEventListener('mousemove',handleMouseMove)
      document.addEventListener('mouseup',handleMouseStop)
    }
    return () => {
      dom.removeEventListener('mousedown',handleMouseDown)
      document.removeEventListener('mousemove',handleMouseMove)
      document.removeEventListener('mouseup',handleMouseStop)
    }
  },[handleMouseDown, handleMouseMove, handleMouseStop])
  return {
    target,
    handler
  }
}