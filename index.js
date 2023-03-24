
const express = require('express');
const {graphqlHTTP} = require('express-graphql')
require('dotenv').config()
const schema = require('./schema/schema')
const PORT = process.env.PORT || 8000
const colors = require("colors")
const connect = require('./connect');
const app = express();

connect()

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})