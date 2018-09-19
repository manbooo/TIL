## Create & Deploy a Universal React App using Zeit Next

- 빈 디렉토리를 만들어서 진행

---

### Setup

#### Make empty directory

```bash
mkdir next_demo
```



#### Init project

```bash
npm init -y
```



#### Install nextjs

```bash
npm i -s next
```



#### set package script

##### package.json

```json
...

"scripts": {
    "dev": "next",
    "start": "next start",
    "build": "next build"
},

...
```



#### make pages

```
mkdir pages
```

---

### Setup React

#### Install React

```bash
npm i -s react react-dom
```



#### Create React Component

##### pages/index.js

```react
import React from 'react'

export default () => (
    <div>
        <h1>Welcom to next</h1>
    </div>
)
```

---

### Contact

#### Contact page

##### pages/contact.js

```react
import React , { Component } from 'react'

export default class extends Component {
    static getInitialProps({req}) {
        const renderLocation = req ? 'Server' : 'Client'

        return {
            renderLocation
        }
    }

    render() {
        return (
            <div>
                <h1>Contact Page</h1>
                <p>
                    This page was rendered
                    on the {this.props.renderLocation}
                </p>
            </div>
        )
    }
}
```

- url을 통해 들어가면 `renderLocation`이 Server로 뜬다

#### Add Link

##### pages/index.js

```react
import React from 'react'
import Link from 'next/link'

export default () => (
    <div>
        <h1>Welcom to next</h1>
        <Link href="/contact">Contact Page</Link>
    </div>
)
```

- Link를 통해서 들어가면 `renderLocation`이 Client로 뜬다



#### Nav

##### components/Nav.js

```react
import React from 'react'
import Link from 'next/link'

export default () => (
    <div>
        <Link href="/"> Home </Link>
        {'  '}
        <Link href="/contact"> Contact </Link>
    </div>
)
```



#### Add Nav

##### pages/index.js

```react
import React from 'react'
import Nav from '../components/Nav'

export default () => (
    <div>
        <h1>Welcom to next</h1>
        <Nav />
    </div>
)
```

---

### .npmignore

#### Create .npmignore

##### .npmignore

```file
.next
```



#### Deploy

```bash
now
```

- Deploy시 에러.. 
  - https://zeit.co/now#get-started