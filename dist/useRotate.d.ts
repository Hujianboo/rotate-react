/// <reference types="react" />
declare type useRotateType = <T extends HTMLElement>() => {
    target: React.RefObject<T>;
};
declare const useRotate: useRotateType;
export default useRotate;
