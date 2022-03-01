import React, { useEffect, useRef, useCallback } from 'react';
type useDraggableType = (props: useDragPropType) => {};
type useDragPropType = {
  ref: React.RefObject<HTMLElement>;
  handler?: React.RefObject<HTMLElement>;
};
export const useDraggable: useDraggableType = (props: useDragPropType) => {
  const { ref } = props;
  const dragging = useRef<Boolean>(false);
  const startPos = useRef([0, 0]);
  const diffVector = useRef([0, 0]);
  const initalAngle = useRef('0');
  const setTransform = useCallback((nums: [number, number]) => {
    ref.current.style.transform = `translate(${nums[0]}px,${nums[1]}px) rotate(${initalAngle.current}deg)`;
  }, []);
  const handleStart = useCallback((e: MouseEvent) => {
    let [diffX, diffY] = diffVector.current;
    startPos.current = [e.clientX - diffX, e.clientY - diffY];
    dragging.current = true;

    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
  }, []);
  const handleMove = useCallback((e: MouseEvent) => {
    if (dragging.current) {
      let matchRes = ref.current?.style.transform.match(/rotate\((\S*)deg\)/);
      initalAngle.current = matchRes?.[1] || '0';
      diffVector.current = [e.clientX - startPos.current[0], e.clientY - startPos.current[1]];
      setTransform([diffVector.current[0], diffVector.current[1]]);
    } else {
      return;
    }
  }, []);
  const handleEnd = useCallback((e: MouseEvent) => {
    dragging.current = false;
    document.removeEventListener('mousemove', handleMove);
    document.removeEventListener('mouseup', handleEnd);
  }, []);
  useEffect(() => {
    const dom = ref.current;
    if (dom) {
      dom.addEventListener('mousedown', handleStart);
    }

    return () => {
      dom?.removeEventListener('mousedown', handleStart);
    };
  }, []);

  return {};
};
