import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser'
import compression from 'compression'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import jwt from 'express-jwt'

import { JWT_SECRET_KEY } from './config'
import schema from './data/schema'

const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(compression())
app.use(morgan(isProduction ? 'combined' : 'dev'))

const authMiddleware = jwt({
  credentialsRequired: false,
  secret: JWT_SECRET_KEY
})

app.use(authMiddleware)

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: { user: req.user },
    formatError(err) {
      return {
        message: err.message,
        code: err.originalError && err.originalError.code,
        locations: err.locations,
        path: err.path
      }
    }
  }))
)

if (!isProduction) {
  app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
}

app.listen(port, console.info(`GraphQL Server running on port ${port}`)) // eslint-disable-line no-console
