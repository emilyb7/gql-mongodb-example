Implements a simple graphql/express backend with a mongo db database.

To set up:

`npm install`

To fill the database with mock data stored in a google sheet:

`node tabletop.js`

To run:

`npm start`

And navigate to `http://localhost:4002/graphql`

Check the schema in `/graphql/schema.graphql` for queries

Examples

```graphql
{
  getLocations(distance: 2, postcode: "E2 0SY"){
    name, rating, distance
  }
}
```

This will return nearby places (radius 2km) from the database.

Things to improve:
- Error handling! (handle user inputs sensibly)
