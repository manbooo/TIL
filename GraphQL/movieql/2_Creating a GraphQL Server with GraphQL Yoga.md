## 2_Creating a GraphQL Server with GraphQL 


### nodemon
```bash
yarn global add nodemon
```



##### package.json

```json
"scripts": {
	"start" : "nodemon"
}
```


##### bash

```bash
yarn start
```



### babel-node

```bash
yarn add global babel-cli --ignore-engines 
yarn add babel-cli babel-preset-env babel-preset-stage-3 --dev
```



##### package.json

```json
"scripts": {
    "start": "nodemon --exec babel-node index.js"
}
```



##### index.js

```js
import { GraphQLServer } from 'graphql-yoga'
```



##### .babelrc

```json
{
  "presets": ["env", "stage-3"]
}
```



### GraphQL Server

##### index.js

```js
import { GraphQLServer } from 'graphql-yoga'

const server = new GraphQLServer({

})

server.start(() => console.log("GraphQL Server Running"))
```

