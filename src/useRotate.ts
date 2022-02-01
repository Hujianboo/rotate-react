import { useCallback, useEffect, useRef } from "react"
type useRotateType = <T extends HTMLElement>() => {
  target: React.RefObject<T>
}
const useRotate: useRotateType = <T extends HTMLElement>() => {
  const rotateCenter = useRef([0,0])
  const downPoint = useRef([0,0])
  const rotating = useRef(false)
  const currentDeg = useRef(0)
  const target = useRef<T>(null) as any
  const normalize = useCallback((deg:number) => {
    if(deg > 180){
      deg = deg - 360
    }else if(deg < -180){
      deg = 360 + deg
    }
    return deg
  },[])
  const getDeg = useCallback((vector:[number,number]) => {
    //添加负数改为顺时针的角度
    let startDeg = -Math.atan2(-downPoint.current[1] + rotateCenter.current[1],
      downPoint.current[0] - rotateCenter.current[0]) * (180/Math.PI)
    //添加负数改为顺时针角度
    let newDeg = -Math.atan2(-vector[1] + rotateCenter.current[1],
      vector[0] - rotateCenter.current[0]) * (180/Math.PI)
    let delta = newDeg - startDeg
    return normalize(delta)
  },[normalize])
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
      console.log('down',downPoint);
      console.log('rotate',rotateCenter);
    }
  },[])
  const handleMouseMove = useCallback((e:MouseEvent) => {
    if(rotating.current){
      setTransform(normalize(currentDeg.current + getDeg([e.clientX,e.clientY])))           
    }
  },[getDeg, normalize, setTransform])
  const handleMouseStop = useCallback((e:MouseEvent) => {
    rotating.current = false
    currentDeg.current = (normalize(currentDeg.current + getDeg([e.clientX,e.clientY])))
  },[getDeg, normalize])
  useEffect(() => {
    const dom = target.current
    if(dom){
      dom.addEventListener('mousedown',handleMouseDown)
      document.addEventListener('mousemove',handleMouseMove)
      document.addEventListener('mouseup',handleMouseStop)
    }
  },[handleMouseDown, handleMouseMove, handleMouseStop])
  return {
    target
  }
  
}
export default useRotate