## Cypress

### Testing My app

- https://docs.cypress.io/guides/getting-started/testing-your-app.html#Step-3-Configure-Cypress



#### 1) Start Server



#### 2) Make Test code

```bash
touch cypress/intergration/home_page_spec.js
```



#### 3) Visit Server

##### cypress/intergration/home_page_spec.js

```bash
describe('The Home Page', function() {
  it('successfully loads', function() {
    cy.visit('http://localhost:8888') // change URL to match your dev URL
  })
})
```



#### 4) Configure Cypress

##### cypress.json

```json
{
  "baseUrl": "http://localhost:8888"
}
```



##### cypress/intergration/home_page_spec.js

```js
describe('The Hame Page', () => {
    it('sucessfully loads', () => {
        // cy.visit('http://localhost:8888') // change URL to match your dev URL

        // set baseUrl
        cy.visit('/')
    })
})
```

