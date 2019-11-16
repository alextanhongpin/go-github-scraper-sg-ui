# github-scraper-sg

[![Netlify Status](https://api.netlify.com/api/v1/badges/689835f3-fd9c-4dfb-811a-93e28a2252f9/deploy-status)](https://app.netlify.com/sites/upbeat-williams-20c757/deploys)

UI for the Github Scraper. The backend is available [here](https://github.com/alextanhongpin/go-github-scraper-sg)

V2:
![preview](./assets/preview_v2.png)

V3:
![preview](./assets/preview_v3.png)

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your end-to-end tests
```
yarn run test:e2e
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Todo

- Add last indexed timestamp
- Add roles developer
- Add clustering by software engineering roles
- Add storytelling: There are x users found in Singapore. The highest number of users are created in year 2017.
- Add versioning and commit correctly
- Update naming for components
- Add google analytics
- Add loading state
- Add about page
- Flip page animation for about!
- Show ranking even if you do not appear in the list
- Change all numbers to locale with comma 

### Done

- Change db to postgres
- Add topic tags for language
- Add query string params when user search
- Add matching by companies
- Show users from the same companies during recommendation
- Add language topic tags for searching
- Add topic tags for companies
- Update search input on click
- Add top companies
- Todo: search language
- reset horizontal scroll and vertical scroll when clicking on links
- Change color 818181 to rgba(0, 0, 0, .56)
- Add footer
- Links should redirect to within application, except when explicitly mentioned (and scroll to top)
- Pagination for users, companies etc
- Move helpers to models

