# Pipebook

This repository is, in fact, an answer to the question initially raised by [Pipedrive](https://www.pipedrive.com).

## Demo

A working demo can be found [here](https://bijanmoudi.github.io/pipebook).

## Features

- Implementing the solution as a single page of a bigger project
- Supporting common keyboard shortcuts (like `Escape` for closing a modal and `Enter` for submitting a form)
- Following almost all the best practices of accessibility
- Preventing extra requests wherever possible (like person information modal in `People's List` page)
- Pixel-perfect, responsive, and UX-aware UI development
- Implementing all bonus challenges (like pagination, search, ordering, creating a new user, and deleting a user)

## How to

**Running the development server**

    $ npm install && npm start

**Running the test runner**

    $ npm test

**Building the application for production**

    $ npm run build

## Todos

1.  Implementing translation middleware (i18n)
2.  Ejecting and optimizing Webpack (adding revision to favicons, generating sprites, ...)
3.  Creating SVG sprite for icons
4.  Using a grid system
5.  Using Service Workers to queue and handle offline requests
6.  Adding more comments to make the code more readable
7.  Using flow as the type checker
8.  Implementing a central link generating function (including both path and hash)
9.  Replacing low-performance components with React Memo (of course after doing performance monitoring)
10. Implementing a Form component to handle multiple inputs at the same time
11. Adding more fields to `Add New Person` modal
12. Writing complementary Snapshot (regression) tests
13. Writing end-to-end tests
14. Writing unit tests
15. Writing visual regression tests
16. Support server-side rendering
17. Improving prioritization algorithm

## Confession

- I am not a TDD expert but I would like to be

## Credits

- [Pipedrive API](https://developers.pipedrive.com/docs/api/v1/#!/Persons)
- [Create React App](https://github.com/facebook/create-react-app) starter kit
- [react-router-dom](https://github.com/ReactTraining/react-router) for handling routing
- [redux](https://github.com/reduxjs/redux), [react-redux](https://github.com/reduxjs/react-redux), [redux-thunk](https://github.com/reduxjs/redux-thunk) for handling global states
- [prop-types](https://github.com/facebook/prop-types) for runtime type checking
- [react-sortable-hoc](https://github.com/clauderic/react-sortable-hoc) and [array-move](https://github.com/sindresorhus/array-move) for supporting cross-platform drag & drop
- [react-string-replace](https://github.com/iansinnott/react-string-replace) for highlighting search results
- [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for extracting URL parameters
- [axios](https://github.com/axios/axios) for handling HTTP requests
- [react-sticky](https://github.com/captivationsoftware/react-sticky) for high performance fixing of the elements in all platforms
- [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) for handling Snapshot(regression) tests
- [classnames](https://github.com/JedWatson/classnames) for handling conditional classes more elegantly
- [node-sass](https://github.com/sass/node-sass) and [sass-mq](https://github.com/sass-mq/sass-mq) for making the styling as easy as a breath
- [spa-github-pages](https://github.com/rafrex/spa-github-pages) for enabling hard reloading of the application from GitHub pages
- Avatar images of unknown people (I hope they don't get sad because of using their photos without permission)
