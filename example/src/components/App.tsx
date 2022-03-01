import * as React from "react";
import { hot } from "react-hot-loader";
import {useRotate} from '../../../dist';
const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
import { ShapeWrap } from "../../../dist";
const FC:React.FC<any> = () => {
  return (
    <>
      <ShapeWrap rotateAngle={0}>
        <img src={reactLogo.default} height="100" draggable={false}/>
      </ShapeWrap>
    </>
  )
}
class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <FC/>
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
