import * as React from "react";
import { hot } from "react-hot-loader";
import {useRotate} from '../../../dist';
const reactLogo = require("./../assets/img/react_logo.svg");
import "./../assets/scss/App.scss";
import { RotateWrap } from "../../../dist";
const FC:React.FC<any> = () => {
  return (
    <>
      <RotateWrap rotateAngle={40}>
        <img src={reactLogo.default} height="480" draggable={false}/>
      </RotateWrap>
    </>
  )
}
class App extends React.Component<Record<string, unknown>, undefined> {
  public render() {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <p>Foo to the barz</p>
        <FC/>
      </div>
    );
  }
}

declare let module: Record<string, unknown>;

export default hot(module)(App);
