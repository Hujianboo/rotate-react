import React, { Ref, useCallback, useEffect, useRef } from 'react';
import { getAngle } from './utils';

type useRotatePropType = {
  initAngle?: number;
  ref: React.RefObject<HTMLElement>;
  handler: React.RefObject<HTMLElement>;
};
type useRotateType = (props: useRotatePropType) => {};
export const useRotate: useRotateType = (props: useRotatePropType) => {
  const { ref, handler } = props;
  const rotateCenter = useRef([0, 0]);
  const downPoint = useRef([0, 0]);
  const xyPoint = useRef([0, 0]);
  const rotating = useRef(false);
  const currentDeg = useRef(props?.initAngle || 0);
  const getDeg = useCallback(getAngle, []);
  const setTransform = useCallback((deg: number) => {
    ref.current.style.transform = `translate(${xyPoint.current[0]}px, ${xyPoint.current[1]}px) rotate(${deg}deg)`;
  }, []);
  const handleMouseDown = useCallback((e: MouseEvent) => {
    rotating.current = true;
    const dom = ref.current;
    if (dom) {
      let matchRes = ref.current?.style.transform.match(/translate\((\d+)px, (\d+)px\)/);
      xyPoint.current[0] = matchRes?.[1] || 0;
      xyPoint.current[1] = matchRes?.[2] || 0;
      const { width, height, left, top } = dom.getBoundingClientRect();
      downPoint.current = [e.clientX, e.clientY];
      rotateCenter.current = [left + width / 2, top + height / 2];
    }
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseStop);
  }, []);
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      console.log('move');
      e.stopImmediatePropagation();
      if (rotating.current) {
        setTransform(
          currentDeg.current +
            getDeg(
              [downPoint.current[0] - rotateCenter.current[0], downPoint.current[1] - rotateCenter.current[1]],
              [e.clientX - rotateCenter.current[0], e.clientY - rotateCenter.current[1]],
            ),
        );
      }
    },
    [getDeg, setTransform],
  );
  const handleMouseStop = useCallback(
    (e: MouseEvent) => {
      rotating.current = false;
      currentDeg.current =
        currentDeg.current +
        getDeg(
          [downPoint.current[0] - rotateCenter.current[0], downPoint.current[1] - rotateCenter.current[1]],
          [e.clientX - rotateCenter.current[0], e.clientY - rotateCenter.current[1]],
        );
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseStop);
    },
    [getDeg, handleMouseMove],
  );
  useEffect(() => {
    const dom = handler.current;
    if (dom) {
      dom.addEventListener('mousedown', handleMouseDown);
    }

    return () => {
      dom.removeEventListener('mousedown', handleMouseDown);
    };
  }, [handleMouseDown]);

  return {
    handler,
  };
};
