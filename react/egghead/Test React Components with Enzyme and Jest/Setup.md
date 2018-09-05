## Setup



### Install Enzyme and Configure Jest in mac

```bash
npm install --save-dev jest babel-jest babel-core babel-preset-env babel-preset-react
npm install --save-dev enzyme
```



### Setup react project

#### create react project

```bash
create-react-app react-enzyme-jest
```



#### apply jest and test tools

##### .babelrc

```
{
  "presets": ["env", "react"]
}
```



##### package.json

```json
{
  "name": "react-enzyme-jest",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-scripts": "1.1.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "jest",
    "eject": "react-scripts eject",
    "precommit": "lint-staged",
  },
  "devDependencies": {
    "enzyme": "^3.6.0"
  }
}
```





### install and apply enzyme-adapter

#### install

```bash
npm install --save-dev enzyme-adapter-react-[your react version]
```



#### add dependency

##### package.json

````json
{
  "name": "react-enzyme-jest",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-scripts": "1.1.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "jest",
    "eject": "react-scripts eject",
    "precommit": "lint-staged",
  },
  "devDependencies": {
    "enzyme": "^3.6.0",
    "enzyme-adapter-react-16": "^1.4.0"
  }
}
````





### apply React app

##### App.test.js

```react
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter()})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

```

