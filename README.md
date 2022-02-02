# rotate-react

## Introduction
A react hook of rotating specified element 

![Version](https://img.shields.io/npm/v/doodle-rotate-react)
![License](https://img.shields.io/npm/l/doodle-rotate-react)
## Install
Install rotate-react by using
``` 
  npm i doodle-rotate-react
```
or
```
  yarn add doodle-rotate-react
```
## Usage 

```javascript
import useRotate from 'doodle-rotate-react'
....
const {target}  = useRotate()
return (
  <>
    ...
    <div ref= {target} className='specified'>
    </div>
    ...
  <>
)
```