## 명령어 실행 순서.

- npm init

- npm i react react-dom

- npm i -D webpack webpack-cli

- npx webpack --mode=development

- npm i -D @babel/core

- npm i -D @babel/preset-env

- npm i -D @babel/preset-react

- npm i -D babel-loader

- npm i -D @babel/plugin-proposal-class-properties

- npm i -D react-refresh @pmmmwh/react-refresh-webpack-plugin

- npm i -D webpack-dev-server

## TIP
### 성능최적화
```
성능 최적화를 위해 바뀌는 부분경우에만 렌더링 함수를 호출해야 한다.
class 사용의 경우 shouldComponentUpdate를 사용하여 렌더링 시점을 조절할 수 있다.
PureComponent를 사용해도 되지만 복잡한 로직의 경우 잘 동작하지 않는다. 
hooks 사용의 경우 memo를 사용하면 된다.
``` 

- props는 변경할 수 없다. props는 부모의 상태값이기 때문에 useState로 변경 후 바꾼다.