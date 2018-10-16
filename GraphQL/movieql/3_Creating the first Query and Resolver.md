## 3_Creating the first Query and Resolver

### schema

- 사용자가 받거나 줄 정보에 대한 서술

- query : Database로 부터 정보를 얻는 것
- mutation : 정보를 바꾸는 작업



##### graphql/schema.graphql

```
type  Query {
    name: String!
}
```

- Query에 이름을 보내면 String을 보낸다



##### index.js

```js
import { GraphQLServer } from 'graphql-yoga'

const server = new GraphQLServer({
    typeDefs: "graphql/schema.graphql"
})

server.start(() => console.log("GraphQL Server Running"))
```



#####graphql/resolver.js 

- resolver는 쿼리를 해결하는 것
  - query는 DB에게 문제 같은 것 > 우리가 query를 어떤 방식으로 해결해야 함

```js
const resolvers = {
    Query: {
        name: () => "manbooo"
    }
}

export default resolvers
```



##### index.js

```js
import { GraphQLServer } from 'graphql-yoga'
import resolvers from "./graphql/resolver"

const server = new GraphQLServer({
    typeDefs: "./graphql/schema.graphql",
    resolvers
})

server.start(() => console.log("GraphQL Server Running"))
```



### GraphQL playground

```
http://localhost:4000/
```