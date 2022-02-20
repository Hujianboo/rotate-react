import React from 'react';
import './style.scss';
import { useCallback, useEffect, useRef } from 'react';
import { useRotate } from '../useRotate';
interface RotateWrapType {
  rotateAngle?: number;
}
const RotateSvg = (): React.ReactElement => {
  return (
    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.536 3.464A5 5 0 1 0 11 10l1.424 1.425a7 7 0 1 1-.475-9.374L13.659.34A.2.2 0 0 1 14 .483V5.5a.5.5 0 0 1-.5.5H8.483a.2.2 0 0 1-.142-.341l2.195-2.195z"
        fill="#fab648"
        fillRule="nonzero"
      />
    </svg>
  );
};
export const RotateWrap: React.FC<RotateWrapType> = (props) => {
  const { rotateAngle, children } = props;
  const { target, handler } = useRotate<HTMLDivElement>({ initAngle: rotateAngle });

  return (
    <div
      className="rotate-wrap"
      style={{
        'transform': `rotate(${rotateAngle}deg)`,
      }}
      ref={target}
    >
      <div className="rotate-svg" ref={handler}>
        <RotateSvg />
      </div>
      {children}
    </div>
  );
};
