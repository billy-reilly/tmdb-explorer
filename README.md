# tmdb-explorer
React app for exploring The Movie Database (https://www.themoviedb.org/)

You can view the application at this link: http://tmdb-explorer.s3-website.eu-west-2.amazonaws.com/

## How to run app locally

1. clone this repo to your local machine
```
$ git clone git@github.com:billy-reilly/tmdb-explorer.git
```

2. install npm dependencies
```
$ npm install
```

3. Request an API token from TMDb by following these instructions: https://developers.themoviedb.org/3/getting-started/introduction

4. Create a .env file in the root of this project and add your API key with the following variable:
```
TMDB_API_KEY=<your-api-key-here>
```

5. Spin up the parcel dev server
```
$ npm run dev
```
...and a new tab should have opened with the application running 🤞

## Next steps

Here are some things I'd like to work on:

### Improvements on existing functionality
- Improve cross browser compatibility with CSS - eg current flexbox grid approach in header will be buggy on IE
- Style the search page

### New functionality
- Display movies with more meta data and the movie poster in a responsive grid
- Introduce tv show and people data models / components to be able to consume the [multi search endpoint](https://developers.themoviedb.org/3/getting-started/images)
- Create a "detailed" display when a user clicks on a specific movie / item

### Technical improvements
- Introduce Cypress to write functional tests
- SSR the application
