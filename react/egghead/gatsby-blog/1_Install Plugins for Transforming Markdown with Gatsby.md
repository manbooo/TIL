# 1_Install Plugins for Transforming Markdown with Gatsby

### Install plugins

```bash
$ npm install --save gatsby-source-filesystem@next gatsby-transformer-remark@next
$ yarn add --save gatsby-source-filesystem@next gatsby-transformer-remark@next
```



### Configuration for Gatsby

- make config file : `touch gatsby-config.js`

- gatsby-config.js

  ```js
  module.exports = {
    siteMetadata: {
      title: 'My Blog',
      description: 'This is my cool blog.'
    },
    plugins: [
      `gatsby-transformer-remark`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `pages`,
          path: `${__dirname}/src/pages`
        }
      }
    ]
  }
  ```